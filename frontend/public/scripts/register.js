

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("hola")

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const ConfirmPassword = document.getElementById("ConfirmPassword").value.trim();


    const response = await fetch("https://deadline-hell-production.up.railway.app/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            password,
            ConfirmPassword
        })
    });

    const data = await response.json() ; 
    if(!data.ok){
        const ConfirmPasswordElement = document.getElementById("ConfirmPassword") ; 
        ConfirmPasswordElement.insertAdjacentHTML("beforeend", `<h1 class="red">${data.message}</h1>`)
        return false
    }else{
        console.log(data.message); 
        return true; 
    }


});

