require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const programRoutes = require('./routes/programRoutes');
const roleRoutes = require('./routes/roleRoutes');
const patientRoutes = require('./routes/patientRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Enable CORS Middleware
app.use(cors({
  origin: 'http://localhost:3001' // Replace with your frontend app's URL
}));


// Middlewares
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/modules', moduleRoutes);
app.use('/programs', programRoutes);
app.use('/roles', roleRoutes);
app.use('/patient', patientRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
