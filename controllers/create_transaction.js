const db = require('../db');

//In this code I'm using beginTransaction, commit, RollBack 

// Utility function to execute queries
const executeQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Update the user's total amount in the user table
const updateAmountUserTable = async (finalAmount, userId) => {
  const updateQuery = `UPDATE user SET total_amount = ? WHERE id = ?;`;
  await executeQuery(updateQuery, [finalAmount, userId]);
};

// Create a new transaction, updating the user's balance accordingly
const createNewTransaction = async (req, res) => {
  const { user_id, amount, transaction_type } = req.body;

  try {
    // Fetch current user balance and validate transaction type in one query
    const userAmountResults = await executeQuery(
      `SELECT total_amount FROM user WHERE id = ?;`,
      [user_id]
    );
    console.log(userAmountResults)

    if (!userAmountResults.length) {
      return res.status(404).send({ error: "User not found" });
    }

    const currentAmount = parseFloat(userAmountResults[0].total_amount);
    const transactionAmount = parseFloat(amount);

    let finalAmount = currentAmount;
    let status = "FAILED";

    // Validate transaction type and calculate the final amount
    if (transaction_type === 'DEPOSIT') {
      finalAmount += transactionAmount;
      status = "COMPLETED";
    } else if (transaction_type === 'WITHDRAW') {
      if (currentAmount < transactionAmount) {
        return res.status(400).send({ error: "Insufficient Balance" });
      }
      finalAmount -= transactionAmount;
      status = "COMPLETED";
    } else {
      return res.status(400).send({ error: "Invalid transaction type" });
    }

    // Start a database transaction to ensure consistency
    await db.beginTransaction();

    try {
      // Update user balance in the user table
      await updateAmountUserTable(finalAmount, user_id);

      // Insert the transaction into the transaction table
      const insertTransactionQuery = `
        INSERT INTO transaction (amount, transaction_type, user_id, status)
        VALUES (?, ?, ?, ?);
      `;
      await executeQuery(insertTransactionQuery, [
        transactionAmount, transaction_type, user_id, status
      ]);

      // Commit the transaction
      await db.commit();

      // Fetch the last transaction to return its details
      const [lastTransaction] = await executeQuery(
        `SELECT id as transaction_id,amount ,transaction_type,status,user_id as user, timestamp   FROM transaction WHERE user_id = ? ORDER BY timestamp DESC LIMIT 1;`,
        [user_id]
      );

      

      // Send the transaction details in the response
      res.send(lastTransaction);

    } catch (err) {
      // Rollback in case of error
      await db.rollback();
      console.error("Error during transaction processing:", err);
      res.status(500).send({ error: "Internal Server Error" });
    }
  } catch (err) {
    console.error("Error fetching user balance:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = { createNewTransaction };
