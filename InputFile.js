const filesExtensions = {
	jpg: 'image/jpeg',
	png: 'image/png',
	pdf: 'application/pdf',
};

class InputFile {
	constructor(selector, config) {
		this._selectorContainer = document.querySelector(`${selector} .input-file-dragzone`);
		this._btnAuxFile = document.querySelector(`${selector} #file-btn`);
		this._inputFile = document.querySelector(`${selector} #file-input`);
		this._listFilesToMatch = config.files;
		this.errors = [];
		this.validateFiles = [];

		this.init();
	}

	init() {
		this._selectorContainer.addEventListener('dragover', this._dragOverEvent.bind(this));
		this._selectorContainer.addEventListener('dragenter', this._dragEnterEvent.bind(this));
		this._selectorContainer.addEventListener('dragleave', this._dragLeaveEvent.bind(this));
		this._selectorContainer.addEventListener('drop', this._dragDropEvent.bind(this));
		this._btnAuxFile.addEventListener('click', this._clickBtnAuxEvent.bind(this));
	}

	_dragOverEvent(event) {
		event.preventDefault();
		event.stopPropagation();
	}

	_dragEnterEvent(event) {
		this._selectorContainer.classList.add('active');
	}

	_dragLeaveEvent(event) {
		this._selectorContainer.classList.remove('active');
	}

	_dragDropEvent(event) {
		event.preventDefault();

		this._resetErrors();
		const files = Array.from(event.dataTransfer.files);
		this._selectorContainer.classList.remove('active');

		this._checkFilesCorrect(files);

		console.log(this.errors);
	}

	_clickBtnAuxEvent() {
		this._inputFile.click();
	}

	_resetErrors() {
		this.errors = [];
	}

	_checkFilesCorrect(listOfFiles) {
		if (this._listFilesToMatch.lenght === 0) return true;

		this._listFilesToMatch.forEach((element) => {
			if (element.required) {
				const fileExists = listOfFiles.some((file) => {
					const fileName = file.name.split('.')[0];
					const fileType = file.type;

					return fileName === element.name && filesExtensions[element.type] === fileType;
				});

				if (!fileExists) {
					this.errors.push(`El archivo ${element.name} es requerido`);
				}
			}
		});
	}
}

export default InputFile;
