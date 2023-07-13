import { Request, Response } from 'express';
import { pagePaths, PageTypes } from '../domain/pages-info';
import SessionHandler from '../handlers/session-handler';

export async function balanceUsersAndRedirect(req: Request, res: Response) {
    const currentPage: PageTypes = req.cookies?.page;
    if (PageTypes[currentPage]) {
        res.status(200).sendFile(pagePaths[currentPage]);
    } else {
        const sessionHandler = SessionHandler.getInstance();
        const pageType = sessionHandler.getVariation();
        res.cookie('page', pageType);
        res.status(200).sendFile(pagePaths[pageType]);
    }
}
