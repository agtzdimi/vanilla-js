import { expect, test } from '@jest/globals';
import path from 'node:path';
import findFilesInPages from '../../src/handlers/find-pages-handler';

test('findFilesInPages - Find all files with their nesting inside our src/pages directory', async () => {
    const results = findFilesInPages() || [];
    const dirname = path.dirname(__dirname).replace('/tests', '/src');
    const removeAbsolutPaths = results.map(route => {
        return route
            .replace(dirname, '') // Remove our parent directory from the directory path
            .replace(/\/index\.html$/, '') // Remove index.html which is our convention that the pages directory will contain
            .replace(/^\/pages\//, '');
    });
    const mockResults = [
        'admin',
        'blog/2-column',
        'blog/3-column',
        'blog',
        'guides',
        'select-page',
    ];

    expect(removeAbsolutPaths).toStrictEqual(mockResults);
});
