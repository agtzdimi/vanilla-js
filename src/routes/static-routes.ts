import { Router } from 'express';
import { Request, Response } from 'express';
import path from 'node:path';

const router = Router();

const staticRoutes = (name: string) => {
    const routeName = name
        .replace(path.dirname(__dirname), '') // Remove our parent directory from the directory path
        .replace(/\/index\.html$/, '') // Remove index.html which is our convention that the pages directory will contain
        .replace(/^\/pages\//, ''); // Remove the initial prefix '/pages/' to get the final route name

    return router.get(`/${routeName}`, (req: Request, res: Response) => {
        res.status(200).sendFile(name);
    });
};

export default staticRoutes;
