const db = require('../db');

const update_transaction_status = async (req, res) => {
    const { transaction_id } = req.params;
    const { status } = req.body;

    // Validate that transaction_id is provided
    if (!status) {
        return res.status(400).send("Missing Status");
    }

    const updateQuery = `UPDATE transaction SET status = ? WHERE id = ?`;

    try {
        // Perform the update
        await new Promise((resolve, reject) => {
            db.query(updateQuery, [status, transaction_id], (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            });
        });

        const getQuery = `SELECT id as transaction_id, amount, transaction_type, status, timestamp FROM transaction WHERE id = ?`;

        // Fetch the updated transaction
        db.query(getQuery, [transaction_id], (err, results) => {
            if (err) {
                return res.status(500).send({ error: err.message }); 
            }

            if (results.length === 0) {
                return res.status(404).send("Transaction not found");
            }

            res.status(200).send(results[0]);
        });

    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

module.exports = { update_transaction_status };
