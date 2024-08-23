const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoute = require('./routes/userRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.send("This is home route");
})

app.use('/user', userRoute);

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGO_ATLAS_URL

app.listen(PORT, async () => {
    try {
        await connectDB(DB_URL);
        console.log("Database connected successfully!");
        console.log(`Server started on port http://localhost:${PORT}`)
    }catch (err) {
        console.log(err);
    }
})
