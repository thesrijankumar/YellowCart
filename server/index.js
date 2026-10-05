const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDb = require('./src/config/connectDb.js');
const userRoutes = require('./src/routes/user.routes.js')

const app = express();
app.use(express.json());
connectDb();

app.get('/health', (req, res) => {
    res.send("YellowCart is live !~");
})

app.use('/api/v1/auth', userRoutes);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`)
})