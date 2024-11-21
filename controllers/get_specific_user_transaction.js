const db = require('../db');


const get_all_transaction_of_specific_user = async (req, res) => {
    const { user_id } = req.query;
    
    // Check if user_id is provided
    if (!user_id) {
        return res.status(400).send({ error: "Missing User ID" });
    }

    const getQuery = 'SELECT id as transaction_id,amount,transaction_type,status,timestamp FROM transaction WHERE user_id = ?';

    try {
       
        const results = await new Promise((resolve, reject) => {
            db.query(getQuery, [user_id], (err, results) => {
                if (err) {
                    reject(err); 
                }
                resolve(results);  
            });
        });

        // If no results, send a message saying no transactions found
        if (results.length === 0) {
            return res.status(404).send({ message: "No transactions found for this user" });
        }
        

        // Send the results if found
        res.status(200).send({transactions:results});
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: err.message }); // Return error message
    }
};

module.exports = { get_all_transaction_of_specific_user };
