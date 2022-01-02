require('dotenv').config();
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

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
const modleUser = {
	required: ['username', 'email', 'password'],
	properties: {
		username: {
			type: 'string',
		},
		email: {
			type: 'string',
		},
		password: {
			type: 'string',
		},
		role: {
			type: 'string',
		},
	},
};
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Recipe API',
			version: '1.0.0',
		},
		tags: [
			{
				name: 'Admin',
				description: 'Admin routes',
			},
			{
				name: 'Auth',
				description: 'Auth routes',
			},
			{
				name: 'Private',
				description: 'Private routes',
			},
			{
				name: 'Public',
				description: 'Public routes',
			},
		],
		components: {
			schemas: {
				user: modleUser,
			},
		},
	},
	apis: ['./routes/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);
console.log(openapiSpecification);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

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
