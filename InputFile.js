class InputFile {
	constructor(selector, config) {
		this.selectorContainer = document.querySelector(selector);
		this.btnAuxFile = document.querySelector(`${selector} #file-btn`);
		this.inputFile = document.querySelector(`${selector} #file-input`);

		this.init();
	}

	init() {
		console.log('😎');
		this.selectorContainer.addEventListener('dragover', this._dragOverEvent.bind(this));
		this.selectorContainer.addEventListener('dragenter', this._dragEnterEvent.bind(this));
		this.selectorContainer.addEventListener('dragleave', this._dragLeaveEvent.bind(this));
		this.selectorContainer.addEventListener('drop', this._dragDropEvent.bind(this));
		this.btnAuxFile.addEventListener('click', this._clickBtnAuxEvent.bind(this));
	}

	_dragOverEvent(event) {
		event.preventDefault();
		event.stopPropagation();
	}

	_dragEnterEvent(event) {
		this.selectorContainer.classList.add('active');
	}

	_dragLeaveEvent(event) {
		this.selectorContainer.classList.remove('active');
	}

	_dragDropEvent(event) {
		event.preventDefault();

		this.selectorContainer.classList.remove('active');
		console.log(event.dataTransfer);
	}

	_clickBtnAuxEvent() {
		this.inputFile.click();
	}
}

export default InputFile;
