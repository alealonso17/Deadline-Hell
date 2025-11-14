
const logInForm = document.getElementById("logInForm");
const labelEmail = document.getElementById("labelEmail");
let errorCount = 0;
localStorage.clear();   

logInForm.addEventListener('submit', async (e) => {

    e.preventDefault();
    console.log("hola")
    


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

    if (!data.isOk) {
        if (errorCount === 0)
            labelEmail.insertAdjacentHTML("beforeend", /*html*/`
                <h1 class="text-[red] text-sm"> Wrong Email Or password </h1> `
            );
        errorCount++;
        console.log(errorCount); 
        return; 

    }

    console.log(data.msg);
 

    localStorage.setItem("userData", JSON.stringify(data.userData));
    window.location.href = "home.html"; 

}




); 

