const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (use your own MongoDB URI if on MongoDB Atlas)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});

// Define a schema and model for the contact form data
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// API endpoint to save contact form data
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Create a new instance of the Contact model
    const newContact = new Contact({ name, email, message });

    try {
        await newContact.save();  // Save data to the database
        res.status(201).send({ message: 'Form data saved successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error saving form data', error });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
