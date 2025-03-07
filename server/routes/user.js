import express from "express";
import { login, logout, register } from "../controllers/user.js";
const router = express.Router();

router.route("/register").post(register)
router.route("/login").post(login);
router.route("/logout").get(logout);
export default router;

// router.get("/", (req, res) => {
//     res.send("User Route");
// }
// router.post("/register", (req, res) => {
//     res.send("Register Route");
// }
