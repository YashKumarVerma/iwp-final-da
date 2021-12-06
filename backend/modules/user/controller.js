// load database connection
const logger = require('winston');
const db = require('../../bin/database/connect');

// create user with email, password and name
exports.createUser = (req, res) => {
  const { email, password, name } = req.body;

  db.query(
    'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
    [email, password, name],
    (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else {
        logger.info(`[user] ${email} created`);
        res.status(201).json({email, name});
      }
    },
  );
};

// search for a user by email
exports.getUser = (req, res) => {
  const id = req.params.id;
  db.query(
    'SELECT * FROM users WHERE id = ?',
    [id],
    (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else {
        logger.info(`[user]  searched`);
        res.status(200).json(results);
      }
    },
  );
};

// get list of all users
exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).json(err);
    } else {
      logger.info(`[user]  searched for all user`);
      res.status(200).json(results);
    }
  });
};

// deleate a user by id
exports.deleteUser = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json(err);
    } else {
      logger.info(`[user]  deleted ${id}`);
      res.status(200).json(results);
    }
  });
};

// update a user by id
exports.updateUser = (req, res) => {
  const id = req.params.id;
  const { email, password, name } = req.body;
  db.query(
    'UPDATE users SET password = ?, name = ?, email = ? WHERE id = ?',
    [password, name, email, id],
    (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(results);
      }
    },
  );
};
