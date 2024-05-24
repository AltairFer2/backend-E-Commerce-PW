const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/db');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const auth = require('./middleware/auth');
const cors = require('cors');


require('dotenv').config();


dotenv.config();

connectDB();

const app = express();
app.use(cors());

const orderRoutes = require('./routes/orderRoutes');
app.use('/api', orderRoutes);


app.use(express.json());

app.use('/api/users', userRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes);

app.use('/api', cartRoutes);


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


app.use(express.json()); // Middleware para parsear JSON