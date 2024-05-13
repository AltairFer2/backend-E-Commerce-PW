const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/db');
const userRoutes = require('./routes/userRoutes');


require('dotenv').config();


dotenv.config();

connectDB();

const app = express();

const orderRoutes = require('./routes/orderRoutes');
app.use('/api', orderRoutes);


app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
