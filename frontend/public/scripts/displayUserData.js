const userData = JSON.parse(localStorage.getItem("userData"));
console.log(userData);

const usernameWelcome = document.getElementById("usernameWelcome"); 
usernameWelcome.innerText = `${userData.user.username} !`; 



//-Asignments 

const assesments = document.getElementById("assesments"); 

if(!userData.assesments){
    assesments.insertAdjacentHTML("beforeend",
        /*html*/`<p class="opacity-[50%]">No deadlines yet... enjoy the peace while it lasts! 🎉</p>`
    );
}; 


