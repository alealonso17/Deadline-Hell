import express from "express";
import cors from "cors";
import UserDataChecks from "./utils/UserDataChecks.js";
import connection from './db/connection.js';
import bcrypt from "bcrypt";
import { LogInCheck } from "./utils/LogInCheck.js";
import GetUserData from "./utils/GetUserData.js";


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta básica para probar
app.get("/", (req, res) => {
  res.send("🔥 Deadline Hell API is running!");
});

app.post('/register', async (req, res) => {
  try {
    const { username, email, password, ConfirmPassword } = req.body;

    // =============================
    // VALIDACIONES
    // =============================

    const usernameCheck = UserDataChecks.username(username);
    if (!usernameCheck.valid) {
      return res.status(400).json({
        ok: false,
        field: "username",
        message: usernameCheck.message
      });
    }

    const emailCheck = UserDataChecks.email(email);
    if (!emailCheck.valid) {
      return res.status(400).json({
        ok: false,
        field: "email",
        message: emailCheck.message
      });
    }

    const passwordCheck = UserDataChecks.password(password);
    if (!passwordCheck.valid) {
      return res.status(400).json({
        ok: false,
        field: "password",
        message: passwordCheck.message
      });
    }

    if (password !== ConfirmPassword) {
      return res.status(400).json({
        ok: false,
        field: "ConfirmPassword",
        message: "Las contraseñas no coinciden."
      });
    }

    // =============================
    // HASH + SAVE
    // =============================

    const hashedPass = await bcrypt.hash(password, 10);

    await connection.execute(
      `INSERT INTO users (username, email, password_hash)
        VALUES (?, ?, ?)`,
      [username, email, hashedPass]
    );

    return res.status(200).json({
      ok: true,
      message: "Usuario registrado correctamente"
    });

  } catch (err) {
    console.error("❌ ERROR REAL EN /register:", err);

    return res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
      error: err.message
    });
  }
});


//----------------------------------------------------------
//----------------------------------------------------------
//LOG IN 
//----------------------------------------------------------
//----------------------------------------------------------


app.post('/logIn', async (req, res) => {
  try {

    const { email, password } = req.body;
    const status = await LogInCheck.start(email, password);

    if (status.isOk) {
      console.log(status.msg);
      const userData = await GetUserData.getAll(email);
      return res.status(200).json({ isOk: true, msg: status.msg, userData });
    } else {
      console.log(status.msg);
      return res.status(500).json({ isOk: false, msg: status.msg });
    }

  } catch (err) {
    console.log("error en el login", err);
    return res.status(500).json({ isOk: false, msg: err });
  }

});



//----------------------------------------------------------
//----------------------------------------------------------
//FOR GETTING THE ASSESMENTS
//----------------------------------------------------------
//----------------------------------------------------------

app.post('/addAssesments', async (req, res) => {
  try {
    const { title, date, id, email } = req.body;

    await connection.execute(
      'INSERT INTO assessments (user_id, title, due_date) VALUES (?, ?, ?);',
      [id, title, date]
    );

    console.log("Assesment added correctly✅");
    const updatedUserData = await GetUserData.getAll(email);

    return res.status(200).json({ isOk: true, msg: "Assesment added correctly✅", updatedUserData });


  } catch (err) {
    console.log("Algo ocurrio mal pasando el assesment a mysql", err);
    return res.status(500).json({ isOk: false, msg: "fail" });
  }



});



//----------------------------------------------------------
//----------------------------------------------------------
//FOR deleting ASSESMENT
//----------------------------------------------------------
//----------------------------------------------------------

app.post("/deleteAssesment", async (req, res) => {
  try {

    const { assesmentID, email } = req.body;

    await connection.execute(
      'DELETE FROM assessments WHERE id = ?;',
      [assesmentID]
    );

    console.log("Assesment Deleted Sucessfully");
    const updatedUserData = await GetUserData.getAll(email);
    return res.status(200).json({ isOk: true, updatedUserData, msg: "Assesment Deleted Sucessfully" });


  } catch (err) {
    console.log("Assesment Deleted Sucessfully", err);
    return res.status(500).json({ isOk: false, msg: "fail" });
  }


});



//addprogress 


app.post("/addProgress", async (req, res) => {
  try {
    const { assesmentID, progress, userID } = req.body;

    // 1. UPDATE PROGRESS IN MYSQL
    await connection.execute(
      "UPDATE assessments SET progress = ? WHERE id = ? AND user_id = ?",
      [progress, assesmentID, userID]
    );

    // 2. GET UPDATED DATA
    const [updatedAssessments] = await connection.execute(
      "SELECT * FROM assessments WHERE user_id = ?",
      [userID]
    );

    const [userRows] = await connection.execute(
      "SELECT * FROM users WHERE id = ?",
      [userID]
    );

    const updatedUserData = {
      user: userRows[0],
      assessments: updatedAssessments
    };

    return res.json({ isOk: true, updatedUserData });

  } catch (err) {
    console.log(err);
    return res.json({ isOk: false, msg: "Error updating progress" });
  }
});
// Puerto (Railway usa process.env.PORT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});