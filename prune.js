#!/usr/bin/env node

const { UsernotesData } = require('toolbox-api');

const data = require('fs').readFileSync(process.argv[2], { encoding: 'utf-8' });
const oldSize = data.length;

const usernotes = new UsernotesData(data);

const years = parseInt(process.argv[4], 10);

const yearsAgo = Date.now() - 1000 * 60 * 60 * 24 * 365 * years;

let oldNotes = 0;
let totalNotes = 0;
let deletedUsers = 0;
for (const [user, { ns }] of Object.entries(usernotes.users)) {
	for (let i = ns.length - 1; i >= 0; i -= 1) {
		totalNotes += 1;
		const note = ns[i];
		const date = note.t * 1000;
		if (date < yearsAgo) {
			console.log('old note', user, new Date(date).toISOString());
			oldNotes += 1;
			ns.splice(i, 1);
		}
	}
	if (!ns.length) {
		delete usernotes.users[user];
		deletedUsers += 1;
	}
}
console.log(totalNotes, 'total notes processed');
console.log('after removing notes older than', years, 'years:');
console.log(oldNotes, 'old notes deleted,', deletedUsers, 'users that no longer have any notes');
const json = JSON.stringify(usernotes);
console.log('old filesize:', oldSize, 'new filesize:', json.length, '(max: 512000ish)');
require('fs').writeFileSync(process.argv[3], json);
