const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerConfig = require('../swagger_output.json');

// Database
const database = require('./database');
// Routes
const routes = require('./routes');

require('dotenv').config();

class App {
	constructor() {
		this.server = express();

		if (process.env.NODE_ENV !== 'test') {
			database.createConnection();
		}

		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.server.use(express.json());
		this.server.use(express.urlencoded({ extended: true }));

		/* Caso queira deixar algum arquivo online na api: PDF,
		   Imagem ou Video => link_da_api/files/nome_do_arquivo.extensao
		*/
		this.server.use(
			'/files',
			express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
		);

		const allowedOrigins = ['http://localhost:3000'];

		this.server.use(
			cors({
				origin: function (origin, callback) {
					// allow requests with no origin
					// (like mobile apps or curl requests)
					if (!origin) return callback(null, true);

					if (allowedOrigins.indexOf(origin) === -1) {
						const msg =
							'The CORS policy for this site does not ' +
							'allow access from the specified Origin.';

						return callback(new Error(msg), false);
					}
					return callback(null, true);
				},
			})
		);
	}

	routes() {
		this.server.use(
			'/api-docs',
			swaggerUI.serve,
			swaggerUI.setup(swaggerConfig)
		);

		this.server.use(routes.SessionRoute);
		this.server.use(routes.UserRoute);
	}
}

module.exports = new App().server;
