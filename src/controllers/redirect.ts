import { Request, Response } from 'express';
import { pagePaths, PageTypes } from '../domain/pages-info';

export async function redirectAdmins(req: Request, res: Response) {
    const currentPage = req.query.page?.toString().toUpperCase() as PageTypes;
    const isAdmin = req.cookies?.admin;
    if (PageTypes[currentPage] && isAdmin === 'true') {
        res.status(200).sendFile(pagePaths[currentPage]);
    } else {
        res.status(200).redirect('/pricing');
    }
}
