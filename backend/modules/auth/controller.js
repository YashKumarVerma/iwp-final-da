// load database connection
const logger = require('winston');
const db = require('../../bin/database/connect');
const {signToken}  = require("../../bin/auth")

// route to login using email and password
exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
    db.query(sql, async (err, result) => {
        if (err) {
        logger.error(err);
            return res.status(500).json({message: "Internal server error"});
        }
        if (result.length > 0) {
            const token = await signToken({id:result[0].id});
            return res.status(200).json({token});
        }
        return res.status(403).json({message:"invalid credentials"});
    });
    }


