import InputFile from './InputFile.js';

const inputFile = new InputFile('#input-file-alta', {
	files: [
		{ name: 'ACTA_NACIMIENTO', type: 'pdf', required: true },
		{ name: 'ACTA_MATRIMONIO', type: 'pdf', required: true },
	],
});
