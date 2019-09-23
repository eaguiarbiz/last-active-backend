import winston from 'winston';
import config from '../config.json';

const { File, Console } = winston.transports;
const logger = new winston.Logger({
	level: config.logging.logLevel,
	transports: [
		new File({
			filename: '../server.log',
			handleExceptions: true,
			json: false
		}),
		new Console({
			handleExceptions: true,
			json: false,
			silent: process.env.NODE_ENV === 'test'
		})
	]
});

module.exports = logger;