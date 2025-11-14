import { deleteAssesment } from "./main.js";
import { updateLocalStorage } from "./updateLocalStorage.js";

export class SecurityBoxes {

    static logOut() {

        // Remove any existing modal to avoid duplicates
        const oldModal = document.getElementById("logoutModal");
        if (oldModal) oldModal.remove();

        // Create modal container
        const modal = document.createElement("div");
        modal.id = "logoutModal";
        modal.className = `
            fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50
        `;

        // Modal content
        modal.innerHTML = `
            <div class="bg-[#1f1f24] p-8 rounded-2xl shadow-xl w-[90%] max-w-[380px] 
                        border border-white/10 text-gray-200 
                        transition-all scale-95 opacity-0 modal-animation">

                <h1 class="text-xl font-semibold text-center mb-4">
                    Are you sure you want to logout?
                </h1>

                <p class="text-center mb-6 text-gray-400">
                    You'll return to the login screen.
                </p>

                <div class="flex justify-between gap-4">

                    <button id="cancelLogout"
                        class="w-1/2 py-2 rounded-xl bg-white/10 hover:bg-white/20 
                               transition text-gray-300 font-medium">
                        Cancel
                    </button>

                    <button id="confirmLogout"
                        class="w-1/2 py-2 rounded-xl bg-red-500/80 hover:bg-red-600 
                               transition text-white font-semibold">
                        Logout
                    </button>

                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Animation effect
        setTimeout(() => {
            document.querySelector(".modal-animation").style.opacity = "1";
            document.querySelector(".modal-animation").style.scale = "1";
        }, 10);

        // ====== BUTTON LOGIC ======

        document.getElementById("cancelLogout").onclick = () => {
            modal.remove();
        };

        document.getElementById("confirmLogout").onclick = () => {
            localStorage.clear();
            window.location.href = "logIn.html";
        };
    };

    static delete(title, assesmentID) {

        // Remove any existing modal to avoid duplicates
        const oldModal = document.getElementById("logoutModal");
        if (oldModal) oldModal.remove();

        // Create modal container
        const modal = document.createElement("div");
        modal.id = "logoutModal";
        modal.className = `
            fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50
        `;

        // Modal content
        modal.innerHTML = /*html*/`
            <div class="bg-[#1f1f24] p-8 rounded-2xl shadow-xl w-[90%] max-w-[380px] 
                        border border-white/10 text-gray-200 
                        transition-all scale-95 opacity-0 modal-animation">

                <h1 class="text-xl font-semibold text-center mb-4">
                    Are you sure you want to delete '${title}'?
                </h1>

                <p class="text-center mb-6 text-gray-400">
                    
                </p>

                <div class="flex justify-between gap-4">

                    <button id="cancelDelete"
                        class="w-1/2 py-2 rounded-xl bg-white/10 hover:bg-white/20 
                               transition text-gray-300 font-medium">
                        Cancel
                    </button>

                    <button id="confirmDelete"
                        class="w-1/2 py-2 rounded-xl bg-red-500/80 hover:bg-red-600 
                               transition text-white font-semibold">
                        Logout
                    </button>

                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Animation effect
        setTimeout(() => {
            document.querySelector(".modal-animation").style.opacity = "1";
            document.querySelector(".modal-animation").style.scale = "1";
        }, 10);

        // ====== BUTTON LOGIC ======

        document.getElementById("cancelDelete").onclick = () => {
            modal.remove();
        };

        document.getElementById("confirmDelete").onclick =  () => {
            deleteAssesment(assesmentID, JSON.parse(localStorage.getItem("userData")).user.email); 
            window.location.reload();
        };
    }
}