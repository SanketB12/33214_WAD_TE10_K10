// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://sanketbhamare77:zYE0TSgXUA28WzU1@cluster0.ac7epi5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.use(bodyParser.json());

app.use(cors());

app.use('/users', userRoutes);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});