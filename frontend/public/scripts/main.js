import { SecurityBoxes } from "./SecurityBoxes.js";
import { updateLocalStorage } from "./updateLocalStorage.js";

const assignmentForm = document.getElementById("assignmentForm");
const titleInput = document.getElementById("addAssignment");  // ID REAL
const dateInput = document.getElementById("due"); // ID REAL
const reload = document.getElementById("reload");
const deleteBTN = document.getElementById("delete") 

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


 
//For sending the assement
assignmentForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const title = titleInput.value.trim();
    const date = dateInput.value.trim();

    const userData = JSON.parse(localStorage.getItem("userData"));
    const id = userData.user.id;
    const email = userData.user.email;



    const response = await fetch("https://deadline-hell-production.up.railway.app/addAssesments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            date,
            id,
            email
        })

    });

    const data = await response.json();

    if (!data.isOk) {
        console.log("Algo ocurrio mal pasando el assesment a mysql");
        return;
    }
    updateLocalStorage(data.updatedUserData);
    console.log("updated local storage succesfully", localStorage.getItem("userData"));
    window.location.reload();

});


//RELOAD BUTTON 
reload.onclick = () => {
    window.location.reload();
}


