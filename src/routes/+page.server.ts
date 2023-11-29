import prisma from '$lib/prisma';
import { getSheetsClient } from '$lib/google';
import { SPREADSHEET_ID } from '$env/static/private';

export async function load() {
	const logs = await prisma.log.findMany();
    const sheets = getSheetsClient();
    if (!sheets) return { logs};

    try {
		const response = await sheets.spreadsheets.values.get({
			spreadsheetId: SPREADSHEET_ID,
			range: 'A2:B'
		});
		const rows = (response.data.values ?? []) as [string, string][];
		return { logs, rows };
	} catch (e) {
		console.log(e);
        return { logs };
	}
	return { logs };
}
