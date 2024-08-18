import { Router } from "express";
import logincontroller from "../controllers/LoginController";
const router = new Router();
router.get("/", logincontroller.formlogin );
router.post("/dologin", logincontroller.dologin );
router.get("/logoff", logincontroller.logoff );
export default router;