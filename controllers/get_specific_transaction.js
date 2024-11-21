const db = require('../db');

const get_specific_transaction = async (req, res) => {
    const { transaction_id } = req.params;

    const getQuery = `SELECT id as transaction_id, amount, transaction_type, status, timestamp FROM transaction WHERE id = ?`;

    try {
        const results = await new Promise((resolve, reject) => {
            db.query(getQuery, [transaction_id], (err, results) => {
                if (err) {
                    reject(err); 
                } else {
                    resolve(results);
                }
            });
        });

        // If no results, return 404
        if (results.length === 0) {
            return res.status(404).send("Transaction not found");
        }

        // Return the transaction if found
        res.status(200).send(results);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: err.message });
    }
};

module.exports = { get_specific_transaction };
