const logInForm = document.getElementById("logInForm");

logInForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim()

    const response = await fetch("https://deadline-hell-production.up.railway.app/logIn", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    }); 

    const data = await response.json(); 

    if(!data.isOk){
        console.log(data.msg); 
        return; 
    }

    console.log(data.msg); 



})