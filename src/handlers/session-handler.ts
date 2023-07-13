import * as fs from 'node:fs';
import { PageTypes } from '../domain/pages-info';
import path from 'node:path';

const SESSION_FILE_PATH = path.join(__dirname + '/../../sessions.json');

class SessionHandler {
    private static _instance: SessionHandler;
    private _data: { totalUsers: number };

    private constructor() {
        const fileExisted = fs.existsSync(SESSION_FILE_PATH);
        let data: string | undefined;
        if (fileExisted) {
            data = (fileExisted && fs.readFileSync(SESSION_FILE_PATH, 'utf8')) || undefined;
        }
        this._data = (data && JSON.parse(data)) || { totalUsers: 0 };
    }

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }

        console.log('Initialization of session handler');
        this._instance = new SessionHandler();
        return this._instance;
    }

    getVariation(): PageTypes {
        let returnedType: PageTypes;
        if (this._data.totalUsers % 2 === 0) {
            returnedType = PageTypes.CONTROL;
        } else {
            returnedType = PageTypes.VARIANT;
        }
        this._totalUsersInc();

        fs.writeFile(
            SESSION_FILE_PATH,
            JSON.stringify({ totalUsers: this._data.totalUsers }),
            err => {
                if (err) {
                    console.log(err);
                }
            }
        );

        return returnedType;
    }

    private _totalUsersInc() {
        if (this._data.totalUsers + 1 === Number.MAX_SAFE_INTEGER) {
            this._data.totalUsers = Number.MAX_SAFE_INTEGER % 2;
        } else {
            this._data.totalUsers++;
        }
    }
}

export default SessionHandler;
