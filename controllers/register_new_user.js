//const bcrypt = require('bcrypt');
const db = require('../db');

const register_new_user = async (req, res) => {
    const { name="", phone_number="", password="" } = req.body;

    // Check if the required fields are provided
    if (name==="") {
        return res.status(400).send({ error: 'Enter your name' });
    }
    if (!phone_number) {
        return res.status(400).send({ error: 'Enter your phone number' });
    }
    if (!password) {
        return res.status(400).send({ error: 'Enter your password' });
    }

    try {
        // Hash the password before saving it to the database
        //const hashedPassword = await bcrypt.hash(password, 10);

        const insertQuery = `INSERT INTO user(name, phone_number, password, total_amount) VALUES(?, ?, ?, ?)`;
        
        db.query(insertQuery, [name, phone_number, password, 0.00], (err, results) => {
            if (err) {
                console.error('Database error:', err); 
                return res.status(500).send({ error: 'Failed to register user' });
            }

            res.status(201).send({ message: 'User registered successfully' });
        });
    } catch (err) {
        console.error('Error during password hashing:', err); 
        res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = { register_new_user };
