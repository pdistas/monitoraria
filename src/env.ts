import { config } from 'dotenv';

config();

export default {
    SPREADSHEET_ID: process.env.SPREADSHEET_ID!,
};
