const swaggerAutogen = require('swagger-autogen')();

const doc = {
	info: {
		title: 'Desafio Bootcamp Helpper - Documentation API',
		description: 'Aplicação de Cadastro de Usuários e Autenticação com TDD',
		version: '1.0.0',
		contact: {
			email: 'raifreelas@gmail.com',
		},
	},
	host: 'localhost:3333',
	schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = [
	'./src/routes/UserRoute.js',
	'./src/routes/SessionRoute.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc);
