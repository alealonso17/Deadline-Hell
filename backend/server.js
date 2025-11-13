import express from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta básica para probar
app.get("/", (req, res) => {
  res.send("🔥 Deadline Hell API is running!");
});

// Puerto (Railway usa process.env.PORT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});