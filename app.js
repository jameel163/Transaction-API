const express = require('express');
const bodyParser = require('body-parser');

const create_transaction=require('./router/create_Transaction_Route')
const get_all_transaction_of_specific_user=require('./router/get_all_transaction_of_specific_user_Route')
const update_transaction_status_Route=require('./router/update_transaction_status_Route')
const get_specific_transaction_Route=require('./router/get_specific_transaction_Route')

const register_new_user_route=require('./router/register_new_user_route')

const app = express();

app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
app.use(create_transaction)
app.use(get_all_transaction_of_specific_user)
app.use(update_transaction_status_Route)
app.use(get_specific_transaction_Route)

app.use(register_new_user_route)

const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server running on port ${PORT}`);
});
