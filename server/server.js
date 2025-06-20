const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const goalRoutes = require("./routes/goalRoutes");


console.log("JWT_SECRET is:", process.env.JWT_SECRET);
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,               // <-- allow cookies, auth headers, etc.
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/goals", goalRoutes);
app.get("/", (req,res) => {
  res.send({
    activeStatus:true,
    error:false,
  })
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));
