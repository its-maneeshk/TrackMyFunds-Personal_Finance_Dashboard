const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User"); // <-- Make sure this is imported

router.post("/register", register);
router.post("/login", login);

// ✅ Add this: Get current user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
