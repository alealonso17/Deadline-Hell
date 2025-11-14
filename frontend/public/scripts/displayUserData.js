import { getDaysLeft } from "./daysleft.js";
import { formatDate } from "./formatDate.js";
import { createStyles } from "./estilosContainers.js";
import { SecurityBoxes } from "./SecurityBoxes.js";


const userData = JSON.parse(localStorage.getItem("userData"));
console.log(userData);

const usernameWelcome = document.getElementById("usernameWelcome");
usernameWelcome.innerText = `${userData.user.username} !`;



//-Asignments 

const assesments = document.getElementById("assesments");
const assessmentsData = JSON.parse(localStorage.getItem("userData")).assessments;

if (assessmentsData.length === 0) {
    assesments.insertAdjacentHTML("beforeend",
        /*html*/`<p class="opacity-[50%]">No deadlines yet... enjoy the peace while it lasts! 🎉</p>`
    );
};

assessmentsData.forEach(assesment => {

    const title = assesment.title;
    const dueDate = assesment.due_date;
    const dueDateNormal = formatDate(dueDate); 
    const created_at = formatDate(assesment.created_at);
    const progress = assesment.progress;
    const daysLeft = getDaysLeft(dueDate);
    
    let daysLeftMsg = ''; 

    if(daysLeft < 0){
        daysLeftMsg = (`Due date passed   (${dueDateNormal}) `); 
    }else if(daysLeft == 0){
        daysLeftMsg = (`Due TODAY    (${dueDateNormal})`);
    }else if(daysLeft > 0){
        daysLeftMsg = (`${daysLeft} days left (${dueDateNormal})`); 
    }; 

    const style = createStyles(daysLeft);




    assesments.insertAdjacentHTML("beforeend",
        /*html*/`<div class="w-full p-6 rounded-3xl backdrop-blur-xl shadow-xl flex flex-col gap-4 ${style.container}">

    <!-- TITLE + EDIT + DELETE -->
    <div class="flex justify-between items-start">
        <h2 class="text-2xl font-semibold ${style.title}">
            ${title}
        </h2>

        <div class="flex items-center gap-3">
            <!-- Edit -->
            <button class="text-gray-300 hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.862 4.487l1.651-1.651a2.25 2.25 0 113.182 3.182l-9.546 9.546a4.5 4.5 0 01-1.897 1.128L6 18l1.208-4.252a4.5 4.5 0 011.128-1.897l8.526-8.526z" />
                </svg>
            </button>

            <!-- Delete -->
   <button class="deleteBtn text-red-400 hover:text-red-300 transition" data-title="${title}" data-id="${assesment.id}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6 7h12m-1 0l-.867 12.142A2 2 0 0114.138 21H9.862a2 2 0 01-1.995-1.858L7 7m5-4a3 3 0 00-3 3v1h6V6a3 3 0 00-3-3z" />
                </svg>
            </button>
        </div>
    </div>

    <!-- DATE + DAYS LEFT -->
    <div class="flex items-center gap-3 text-lg ${style.dateText}">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor" class="w-5 h-5 opacity-80">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M4.5 7.5h15m-13.5 4.5h3m3 0h3m-3 0v6m-6.75 6h15A2.25 2.25 0 0021 19.5V6A2.25 2.25 0 0018.75 3.75H5.25A2.25 2.25 0 003 6v13.5A2.25 2.25 0 005.25 21z" />
        </svg>

        <span>${created_at}</span>

        <span class="${style.dot}">•</span>

        <span>${daysLeftMsg}</span>
    </div>

    <!-- PROGRESS -->
    <p class="text-gray-300 text-lg">Progress</p>

    <div class="flex items-center gap-3">
        <!-- minus -->
        <button class="w-12 h-12 rounded-xl bg-white/5 border border-white/10
                       flex items-center justify-center text-2xl text-gray-300
                       hover:bg-white/10 hover:text-white transition">−</button>

        <!-- BAR -->
        <div class="relative flex-1 h-10 bg-white/5 border border-white/10 rounded-full overflow-hidden">
            <div class="absolute left-0 top-0 h-full bg-blue-500/40 rounded-full"
                 style="width: ${progress}%;">
            </div>
        </div>

        <!-- plus -->
        <button class="w-12 h-12 rounded-xl bg-white/5 border border-white/10
                       flex items-center justify-center text-2xl text-gray-300
                       hover:bg-white/10 hover:text-white transition">+</button>

        <span class="text-white text-lg ml-2">${progress}%</span>
    </div>

    <hr class="border-white/10">

    <!-- TASKS HEADER -->
    <div class="flex justify-between items-center">
        <h3 class="text-xl text-white">Tasks</h3>
        <button class="text-gray-300 hover:text-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.5" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
            </svg>
        </button>
    </div>

</div>`
    )
});


//For deleting 
const allDeleteBtns = document.querySelectorAll(".deleteBtn");

allDeleteBtns.forEach(btn => {
    btn.onclick = () => {
        const title = btn.dataset.title;
        const assesmentID = btn.dataset.id;

        SecurityBoxes.delete(title, assesmentID);
    };
});


