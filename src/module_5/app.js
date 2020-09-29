import express from 'express';
import { PORT } from './config';
import { loaders } from './loaders';

const startServer = () => {
    const app = express();

    loaders(app);

    app.listen(PORT, () => {
        console.log(`listening port ${PORT}`);
    });
};

startServer();
