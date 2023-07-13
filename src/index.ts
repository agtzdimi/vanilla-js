import express from 'express';
import path from 'node:path';
const app = express();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import helmet from 'helmet';

import findFilesInPages from './handlers/find-pages-handler';
import staticRoutes from './routes/static-routes';
import routes from './routes/index';
import { notFound, unhandledErrors } from './handlers/error-handlers';

const PORT = 5000;

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(cookieParser());
app.use(helmet());

app.use(
    cors({
        origin: '*',
        methods: ['GET'],
        allowedHeaders: [
            'Access-Control-Allow-Headers',
            'Access-Control-Request-Method',
            'Access-Control-Request-Headers',
            'Origin',
            'content-type',
            'accept',
        ],
    })
);

app.use('/', routes);

// Add recursively all the routes inside the pages directory with an index.html file
findFilesInPages().forEach(name => app.use('/', staticRoutes(name)));

app.use(express.static(path.join(__dirname, 'public')));

app.use(notFound);

app.use(unhandledErrors);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
