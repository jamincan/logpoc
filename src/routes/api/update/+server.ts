import { json } from '@sveltejs/kit';
import { getSheetsClient } from '$lib/google';
import { SPREADSHEET_ID } from '$env/static/private';
import prisma from '$lib/prisma';

export async function POST({ request }) {
	const { date } = await request.json();
	if (typeof date !== 'string') {
		return json({ success: false, message: 'Invalid date' }, { status: 400 });
	}

	const sheets = getSheetsClient();
	if (!sheets)
		return json({ success: false, message: 'Unable to initialize Sheets client' }, { status: 500 });

	try {
		const response = await sheets.spreadsheets.values.get({
			spreadsheetId: SPREADSHEET_ID,
			range: 'A2:B'
		});
		const rows = (response.data.values ?? []) as [string, string][];
		const row = rows.find(([rowDate]) => rowDate === date);
		if (!row)
			return json(
				{ success: false, message: 'Error loading data from spreadsheet' },
				{ status: 500 }
			);
		const note = row[1];

		await prisma.log.upsert({
			where: { date },
			update: { note },
			create: { date, note }
		});
		return json({ success: true, message: 'DB updated' });
	} catch (e) {
		console.log(e);
		return json({ success: false, message: 'Unknown server error' }, { status: 500 });
	}
}
