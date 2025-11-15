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
    window.location.reload();

});


//RELOAD BUTTON 
reload.onclick = () => {
    window.location.reload();
}


//FOR ADDIING PROGRESS//FOR ADDING PROGRESS (PLUS)
document.querySelectorAll(".plusBTN").forEach((btn) => {

    btn.addEventListener("click", async () => {

        const card = btn.closest(".assesmentCard");
        const assesmentID = card.dataset.id;

        const bar = card.querySelector(".progressBar");
        const text = card.querySelector(".progressText");

        let progress = parseInt(bar.style.width);

        if (progress < 100) {
            progress = Math.min(progress + 10, 100);
            bar.style.width = progress + "%";
            text.textContent = progress + "%";
        }

        // SEND TO BACKEND
        try {
            const userData = JSON.parse(localStorage.getItem("userData"));
            const userID = userData.user.id;

            const res = await fetch("https://deadline-hell-production.up.railway.app/addProgress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    assesmentID,
                    progress,
                    userID
                })
            });

            const data = await res.json();

            if (data.isOk) {
                localStorage.setItem("userData", JSON.stringify(data.updatedUserData));
            }

        } catch(err) {
            console.log("Network error saving progress", err);
        }

    });
});


//FOR SUBTRACTING PROGRESS (MINUS)
document.querySelectorAll(".minusBTN").forEach((btn) => {

    btn.addEventListener("click", async () => {

        const card = btn.closest(".assesmentCard");
        const assesmentID = card.dataset.id;

        const bar = card.querySelector(".progressBar");
        const text = card.querySelector(".progressText");

        let progress = parseInt(bar.style.width);

        if (progress > 0) {
            progress = Math.max(progress - 10, 0);
            bar.style.width = progress + "%";
            text.textContent = progress + "%";
        }

        // SEND TO BACKEND
        try {
            const userData = JSON.parse(localStorage.getItem("userData"));
            const userID = userData.user.id;

            const res = await fetch("https://deadline-hell-production.up.railway.app/addProgress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    assesmentID,
                    progress,
                    userID
                })
            });

            const data = await res.json();

            if (data.isOk) {
                localStorage.setItem("userData", JSON.stringify(data.updatedUserData));
            }

        } catch(err) {
            console.log("Network error saving progress", err);
        }

    });
});