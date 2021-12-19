const filesExtensions = {
	jpg: 'image/jpeg',
	png: 'image/png',
	pdf: 'application/pdf',
};

class InputFile {
	constructor(selector, config) {
		this._selector = selector;
		this._selectorContainer = document.querySelector(`${selector} .file-dragzone`);
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
		this._inputFile.addEventListener('change', this._inputFileEventChange.bind(this));
	}

	_dragOverEvent(event) {
		event.preventDefault();
		event.stopPropagation();
	}

	_dragEnterEvent(event) {
		event.preventDefault();
		this._selectorContainer.classList.add('active');
	}

	_dragLeaveEvent(event) {
		event.preventDefault();
		this._selectorContainer.classList.remove('active');
	}

	_dragDropEvent(event) {
		event.preventDefault();

		this._resetErrors();
		this._selectorContainer.classList.remove('active');

		const files = Array.from(event.dataTransfer.files);
		this._addFilesToList(files);

		//this._checkFilesCorrect(files);

		//console.log(this.errors);
	}

	_inputFileEventChange(event) {
		const files = Array.from(event.target.files);
		this._addFilesToList(files);
	}

	_addFilesToList(files) {
		const fileList = document.querySelector(`${this._selector} .file-list ul`);

		files.forEach((file, index) => {
			const id = Date.now() * Math.floor(Math.random() * 100 + 1);
			const li = this._generateHTMLFile(id, file);

			fileList.appendChild(li);
			this.validateFiles.push(file);
		});

		this._addListenersActions();
	}

	_addListenersActions() {
		const btnsSeeDocument = document.querySelectorAll(
			`${this._selector} .file-item-actions span[data-action="ver"]`
		);
		const btnsDeleteDocument = document.querySelectorAll(
			`${this._selector} .file-item-actions span[data-action="eliminar"]`
		);

		btnsDeleteDocument.forEach((btn) => {
			btn.addEventListener('click', this._deleteFileEvent.bind(this));
		});

		btnsSeeDocument.forEach((btn) => {
			btn.addEventListener('click', this._seeFileEvent.bind(this));
		});
	}

	_seeFileEvent(event) {
		const { target } = event;
		const { id } = target.closest('.file-item').dataset;

		console.log(id);
	}

	_deleteFileEvent(event) {
		const { target } = event;
		const li = target.closest('.file-item');
		const id = li.dataset.id;

		const filteredFiles = this.validateFiles.filter((file) => file.id !== id);
		li.remove();
		this.validateFiles = filteredFiles;
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

	_generateHTMLFile(id, file) {
		const { name, type } = file;
		const li = document.createElement('li');
		const imageToRender = this._getImageByType(type);

		li.classList.add('file-item');
		li.dataset.id = id;
		li.innerHTML = `<div class="file-item-info">
        <img src="${imageToRender}" alt="PDF file icon" />
        <p>${name}</p>
      </div>
      <div class="file-item-actions">
        <span data-action="ver">Ver</span>
        <span data-action="eliminar">Eliminar</button>
      </div>
    `;

		return li;
	}

	_getImageByType(type) {
		switch (type) {
			case 'image/jpeg':
				return './images/file.png';
			case 'image/png':
				return './images/file.png';
			case 'application/pdf':
				return './images/pdf.png';
			default:
				return './images/file.png';
		}
	}
}

export default InputFile;
