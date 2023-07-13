import { expect, test } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import findFilesInPages from '../../src/handlers/find-pages-handler';

const app = express();
import staticRoutes from '../../src/routes/static-routes';

findFilesInPages().forEach(name => app.use('/', staticRoutes(name)));

test('/blog - Assert that blog/index.html is served in /blog route', async () => {
    const res = await request(app).get(`/blog`);

    expect(res.statusCode).toBe(200);
    expect(res.text.includes('Hotjar Blog index page')).toEqual(true);
});

test('/blog - Assert nested folder blog/2-column/index.html is served in /blog/2-column route', async () => {
    const res = await request(app).get(`/blog/2-column`);

    expect(res.statusCode).toBe(200);
    expect(res.text.includes('Hotjar 2-Column Blog index page')).toEqual(true);
});
