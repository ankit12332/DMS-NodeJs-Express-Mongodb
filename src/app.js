require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const programRoutes = require('./routes/programRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Middlewares
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/modules', moduleRoutes);
app.use('/programs', programRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
