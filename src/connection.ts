import { google } from 'googleapis';
import env from './env';

// create an auth const for getting access to the google api

const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] })

// create a connection to the google sheets api
const sheets = google.sheets({ version: 'v4', auth });

export async function get(range: string) {
    const values = (await sheets.spreadsheets.values.get({
        spreadsheetId: env.SPREADSHEET_ID,
        range
    })).data.values || undefined;

    console.log(values?.length);
    return values;
}
