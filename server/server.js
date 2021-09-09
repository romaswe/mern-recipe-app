require('dotenv').config();
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cors = require('cors');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(compression()); //Compress all routes
app.use(helmet());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/private', require('./routes/private'));
app.use('/api/public', require('./routes/public'));
app.use('/api/admin', require('./routes/admin'));

// Error Handler (Last middleware that shuld be used)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
	console.log(`server is running on port ${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
	console.log(`Logged Error: ${err.message}`);
	server.close(() => process.exit(1));
});
