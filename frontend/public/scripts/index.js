window.addEventListener("DOMContentLoaded", () => {
    const data = localStorage.getItem("userData");
    console.log("LocalStorageUploaded", data);

    if (!data) {
        console.log("NO HAY USER -> REDIRECT AL LOGIN");
        window.location.href = "logIn.html";
    }
});