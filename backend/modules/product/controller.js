// load database connection
const logger = require('winston');
const db = require('../../bin/database/connect');
const {generatePdf} = require('../../bin/pdf');
const {sendEmail} = require("../../bin/mailer")

exports.search = (req, res) => {
  const { keyword } = req.params;
  db.query(
    `SELECT * FROM products WHERE name LIKE '%${keyword}%' OR details LIKE '%${keyword}%'`,
    (err, results) => {
      if (err) {
        logger.error(err);
        return res.status(500).send(err);
      }
      return res.status(200).json(results);
    }
  );
};

exports.purchase = (req, res) => {
  const id  = parseInt(req.params.id);


  // get details of the product
  db.query(
    `SELECT * FROM products WHERE id = ${id}`,
    (err, productQuery) => {
      if (err) {
        logger.error(err);
        return res.status(500).send(err);
      }
      
      // now get details of the user
      const id = req.user_id.id
      
      db.query(
        `SELECT * FROM users WHERE id = ${id}`,
        (err, userQuery) => {
          if (err) {
            logger.error(err);
            return res.status(500).send(err);
          }
          
          // now generate a pdf invoice
          const { name, email, address } = userQuery[0];
          const {id, name: productName, price, details } = productQuery[0];

          generatePdf(name,email, id,productName, price, details);
        } 
      );
    }
  );
};

// userName,
// productID,
// productName,
// productPrice,
// productDescription,

// create product with email, password and name
exports.createProduct = (req, res) => {
  const { name, price, details  } = req.body;

  db.query(
    'INSERT INTO products (name, price, details) VALUES (?, ?, ?)',
    [name, price, details],
    (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else {
        logger.info(`[product] ${name} created`);
        res.status(201).json({name, price, details});
      }
    },
  );
};

// search for a product by email
exports.getProduct = (req, res) => {
  const id = req.params.id;
  db.query(
    'SELECT * FROM products WHERE id = ?',
    [id],
    (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else {
        logger.info(`[product]  searched`);
        res.status(200).json(results);
      }
    },
  );
};

// get list of all products
exports.getAllproducts = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      res.status(500).json(err);
    } else {
      logger.info(`[product]  searched for all product`);
      res.status(200).json(results);
    }
  });
};

// deleate a product by id
exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json(err);
    } else {
      logger.info(`[product]  deleted ${id}`);
      res.status(200).json(results);
    }
  });
};

// update a product by id
exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const { name, price, details } = req.body;
  db.query(
    'UPDATE products SET name = ?, price = ?, details = ? WHERE id = ?',
    [name, price, details, id],
    (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(results);
      }
    },
  );
};
