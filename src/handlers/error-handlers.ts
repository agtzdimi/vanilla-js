import { Request, Response, NextFunction } from 'express';
import path from 'node:path';

const NOT_FOUND_FILE = path.join(__dirname + '/../pages/not-found/not-found.html');
const SERVER_ERROR_FILE = path.join(
    __dirname + '/../pages/internal-server-error/internal-server-error.html'
);

export function notFound(req: Request, res: Response) {
    return res.status(404).sendFile(NOT_FOUND_FILE);
}

export function unhandledErrors(err: any, req: Request, res: Response) {
    return res.status(500).sendFile(SERVER_ERROR_FILE);
}
