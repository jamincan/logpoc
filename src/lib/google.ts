import { google, sheets_v4 } from 'googleapis';
import { GOOGLE_SHEETS_CLIENT_EMAIL, GOOGLE_SHEETS_PRIVATE_KEY } from '$env/static/private';

export function getSheetsClient(): sheets_v4.Sheets | undefined {
	try {
		const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
		const jwt = new google.auth.JWT(
			GOOGLE_SHEETS_CLIENT_EMAIL,
			undefined,
			GOOGLE_SHEETS_PRIVATE_KEY,
			scopes
		);

		return google.sheets({ version: 'v4', auth: jwt });
	} catch (e) {
		console.log(`Failed to initialize sheets client: ${e}`);
	}
}
