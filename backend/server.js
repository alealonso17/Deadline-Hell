import express from "express";
import cors from "cors";
import UserDataChecks from "./utils/UserDataChecks.js";
import connection from './db/connection.js'
import bcrypt from "bcrypt";


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta básica para probar
app.get("/", (req, res) => {
  res.send("🔥 Deadline Hell API is running!");
});


//----------------------------------------------------------
//----------------------------------------------------------
//REGISTER
//----------------------------------------------------------
//----------------------------------------------------------
app.post('/register', async (req, res) => {
  try {
    const { username, email, password, ConfirmPassword } = req.body;


    // =============================
    // VALIDACIONES
    // =============================

    // USERNAME
    const usernameCheck = UserDataChecks.username(username);
    if (!usernameCheck.valid) {
      return res.status(500).json({
        ok: false,
        field: "username",
        message: usernameCheck.message
      });
    }

    // EMAIL
    const emailCheck = UserDataChecks.email(email);
    if (!emailCheck.valid) {
      return res.status(500).json({
        ok: false,
        field: "email",
        message: emailCheck.message
      });
    }

    // PASSWORD
    const passwordCheck = UserDataChecks.password(password);
    if (!passwordCheck.valid) {
      return res.status(500).json({
        ok: false,
        field: "password",
        message: passwordCheck.message
      });
    }

    // CONFIRM PASSWORD
    if (password !== ConfirmPassword) {
      return res.status(500).json({
        ok: false,
        field: "ConfirmPassword",
        message: "Las contraseñas no coinciden."
      });
    }


    // =============================
    // SI TODO VA BIEN → CONTINÚA REGISTRO
    // =============================

    const hashedPass = await bcrypt.hash(password, 10); 

    await connection.execute(
      `INSERT INTO users (username, email, password_hash)
        VALUES (?, ?, ?)`,
      [username, email, hashedPass]
    );

    return res.status(200).json({ok:true, field:'',message: "Las contraseñas no coinciden." }); 

  } catch (err) {


  }
});

// Puerto (Railway usa process.env.PORT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});