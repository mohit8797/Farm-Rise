const express = require("express");
const { registerUser, loginUser, verifyEmail, forgotPassword, resetPassword } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;