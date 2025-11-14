import connection from "../db/connection.js";
import bcrypt from "bcrypt";


export class LogInCheck{

    static async start(email, password){
        
        const [passRows] = await connection.execute(
            'SELECT password_hash FROM users WHERE email = ?',
            [email] 
        ); 

        if(passRows.length === 0){
            console.log("El usurario no existe"); 
            return{msg : "no existe el usuario", isOk: false }; 
        }

        const hashedPass = passRows[0].password_hash; 

        const valid = await bcrypt.compare(password, hashedPass);   
        return valid
                ? {msg : "Usuario se ha logeado correctamente", isOk: true }  
                : {msg : "contra incorrecta", isOk: false };


    }


}