document.addEventListener("DOMContentLoaded", function() {
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');
    const uploadButton = document.getElementById('upload-button');
    const uploadMessage = document.getElementById('upload-message');

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop area when dragging over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add('active'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove('active'), false);
    });

    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    // Handle file input change
    fileInput.addEventListener('change', () => {
        handleFiles(fileInput.files);
    });

    // Function to handle files
    function handleFiles(files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            addFileToList(file);
        }
        if (fileList.children.length > 0) {
            uploadButton.classList.remove('hidden');
        } else {
            uploadButton.classList.add('hidden');
        }
    }

    // Function to add file to the list
    function addFileToList(file) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        const fileInfo = document.createElement('span');
        fileInfo.textContent = `${file.name} - ${formatFileSize(file.size)}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'btn btn-danger btn-sm';
        removeButton.addEventListener('click', () => {
            fileInput.value = null;
            listItem.remove();
            if (fileList.children.length === 0) {
                uploadButton.classList.add('hidden');
            }
        });

        listItem.appendChild(fileInfo);
        listItem.appendChild(removeButton);
        fileList.appendChild(listItem);
    }

    // Function to format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Handle file upload (optional -  add your upload logic here)
    uploadButton.addEventListener('click', () => {
        const files = fileInput.files;
        if (files.length > 0) {
            // TODO parse pdf

        }
    });

    // Trigger file input click when drop area is clicked
    dropArea.addEventListener('click', () => {
        fileInput.click();
    });
});