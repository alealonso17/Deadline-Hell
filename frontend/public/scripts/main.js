const addDeadlineBtn = document.getElementById("addDeadlineBtn");
const titleInput = document.getElementById("addAssignment"); // ID REAL
const dateInput = document.getElementById("due");             // ID REAL

function updateButtonState() {
    const title = titleInput.value.trim();
    const date = dateInput.value.trim();

    addDeadlineBtn.disabled = !(title && date);
}

// Escuchar cuando el usuario escribe / cambia
titleInput.addEventListener("input", updateButtonState);
dateInput.addEventListener("input", updateButtonState);

// Por si acaso, forzar estado inicial al cargar
updateButtonState();