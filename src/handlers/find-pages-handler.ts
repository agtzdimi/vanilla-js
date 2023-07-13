import path from 'node:path';
import * as fs from 'node:fs';
const results: string[] = [];
const DEFAULT_PATH = path.join(__dirname + '/../pages');
const TEMPLATE_NAME = 'index.html';

function findFilesInPages(directory: string = DEFAULT_PATH): string[] {
    const fileList = fs.readdirSync(directory);

    fileList.forEach(file => {
        file = directory + '/' + file;
        const stat = fs.statSync(file);

        // Recursive loop through the directories
        if (stat?.isDirectory()) {
            findFilesInPages(file);
        } else {
            if (path.basename(file) === TEMPLATE_NAME) {
                results.push(file);
            }
        }
    });
    return results;
}

export default findFilesInPages;
