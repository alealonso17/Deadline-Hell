import { json } from "body-parser";

const submitRegister = document.getElementById("submitRegister");

submitRegister.addEventListener('click', async (e) => {
    e.preventDefault();

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
        console.log(data.message); 
        return false
    }else{
        console.log(data.message); 
        return true; 
    }


});

