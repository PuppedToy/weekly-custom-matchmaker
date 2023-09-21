const authorize = require('@brooktec/google-authorize');
const { google } = require('googleapis');

const FORM_ID = '18hTQaAjQpEqY1dBlTIbFwaFviDDUsP1xv5memxuSujI';

async function download() {
    const auth = await authorize();

    // Create a Google Sheets API client
    const sheets = google.sheets({ version: 'v4', auth });

    try {
        // Use the Google Sheets API to get the data from the form responses sheet
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: FORM_ID,
            range: 'Form Responses 1', // Change this to the appropriate sheet name if needed
        });

        // Extract the data from the response
        const data = response.data.values;

        // You now have the form responses data in the 'data' variable
        return data;
    } catch (error) {
        console.error('Error downloading form data:', error);
        throw error;
    }
}

module.exports = download;
