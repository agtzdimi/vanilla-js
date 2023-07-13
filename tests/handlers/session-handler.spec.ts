import { expect, jest, test } from '@jest/globals';
import SessionHandler from '../../src/handlers/session-handler';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import { PageTypes } from '../../src/domain/pages-info';
let SESSION_FILE_PATH = path.join(__dirname + '/sessions.json');
if (__dirname.includes('handlers')) {
    SESSION_FILE_PATH = path.join(__dirname + '/../../sessions.json');
}

beforeEach(async () => {
    await fs.unlink(SESSION_FILE_PATH).catch(e => {
        console.log(e);
    });
});

test('SessionHandler - test singleton pattern', async () => {
    const logSpy = jest.spyOn(console, 'log');
    SessionHandler.getInstance();
    SessionHandler.getInstance();

    expect(logSpy).toBeCalledTimes(1);
});

test('SessionHandler - test variations retrieval to be accurate without file', async () => {
    const handler = SessionHandler.getInstance();
    const variation1 = handler.getVariation();
    const variation2 = handler.getVariation();
    const variation3 = handler.getVariation();
    const variation4 = handler.getVariation();
    const variation5 = handler.getVariation();

    expect(variation1).toBe(PageTypes.CONTROL);
    expect(variation2).toBe(PageTypes.VARIANT);
    expect(variation3).toBe(PageTypes.CONTROL);
    expect(variation4).toBe(PageTypes.VARIANT);
    expect(variation5).toBe(PageTypes.CONTROL);
});

test('SessionHandler - test variations retrieval to be accurate with file', async () => {
    await fs.writeFile(SESSION_FILE_PATH, JSON.stringify({ totalUsers: 1 }));
    const handler = SessionHandler.getInstance();
    const variation1 = handler.getVariation();
    const variation2 = handler.getVariation();
    const variation3 = handler.getVariation();
    const variation4 = handler.getVariation();
    const variation5 = handler.getVariation();

    expect(variation1).toBe(PageTypes.VARIANT);
    expect(variation2).toBe(PageTypes.CONTROL);
    expect(variation3).toBe(PageTypes.VARIANT);
    expect(variation4).toBe(PageTypes.CONTROL);
    expect(variation5).toBe(PageTypes.VARIANT);
});
