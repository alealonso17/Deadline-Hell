import { updateLocalStorage } from "./updateLocalStorage.js";

export async function deleteAssesment(assesmentID, email) {
    const response = await fetch("https://deadline-hell-production.up.railway.app/deleteAssesment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            assesmentID,
            email
        })
    });

    const data = await response.json() ; 

    if(!data.isOk){
        console.log(data.msg); 
        return; 
    };

    updateLocalStorage(data.updatedUserData);
    return true; 

}

