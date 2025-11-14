import { updateLocalStorage } from "./updateLocalStorage";

const addDeadlineBtn = document.getElementById("addDeadlineBtn");
const titleInput = document.getElementById("addAssignment");  // ID REAL
const dateInput = document.getElementById("due"); // ID REAL
const reload = document.getElementById("reload"); 

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
addDeadlineBtn.addEventListener('submit', async (e) => {

    e.preventDefault();

    const title = titleInput.value.trim();
    const date = dateInput.value.trim();

    const userData = JSON.parse(localStorage.getItem("userData"));
    const id = userData.user.id;
    const email = userData.user.email; 

    

    const response = fetch("https://deadline-hell-production.up.railway.app/addAssesments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            title,
            date,
            id,
            email
        }

    });

    const data = await response.json(); 

    if(!data.isOk){
        console.log("Algo ocurrio mal pasando el assesment a mysql"); 
        return; 
    }
    
    updateLocalStorage(data.updatedUserData); 
    console.log("updated local storage succesfully", localStorage.getItem("userData")); 


}); 


//RELOAD BUTTON 
reload.addEventListener('click', window.location.reload);  