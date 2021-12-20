import InputFile from './InputFile.js';

const inputFile = new InputFile('#input-file-alta', {
  files: [
    { name: 'ACTA_NACIMIENTO', type: 'pdf', required: false },
    { name: 'ACTA_MATRIMONIO', type: 'pdf', required: true },
    { name: 'ACTA_DEFUNCION', type: 'pdf', required: true },
    { name: 'FOTOGRAFIA_FRENTE', type: 'png', required: true },
  ],
});

const btnEnviar = document.querySelector('#btn-enviar');

btnEnviar.addEventListener('click', () => {
  console.log(inputFile.isValid);
  console.log(inputFile.files);
});
