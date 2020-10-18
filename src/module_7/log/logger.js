import { createLogger, format, transports, } from 'winston';

const { combine, timestamp, json, cli } = format;

const logger = createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        json(),
    ),
    transports: [
        new transports.File({ filename: 'src/module_6/log/logs/error.log', level: 'error' }),
        new transports.File({ filename: 'src/module_6/log/logs/info.log', level: 'info' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: cli(),
        }),
    );
}

module.exports = {
    logger: logger,
};