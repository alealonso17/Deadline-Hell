

export function updateLocalStorage(userData){
    localStorage.clear(); 
    localStorage.setItem("userData", JSON.stringify(userData)); 
}