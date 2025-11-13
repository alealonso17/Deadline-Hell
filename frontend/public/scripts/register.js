import { json } from "body-parser";

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const ConfirmPassword = document.getElementById("ConfirmPassword");
const submitRegister = document.getElementById("submitRegister");

submitRegister.addEventListener('click', async (e) => {
    e.preventDefault();

    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const ConfirmPassword = document.getElementById("ConfirmPassword");


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

