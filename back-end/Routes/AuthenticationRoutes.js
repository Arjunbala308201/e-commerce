import express from "express";
import { signup, login, logout } from "../controller/authenticaitonController.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);

export { authRouter };
