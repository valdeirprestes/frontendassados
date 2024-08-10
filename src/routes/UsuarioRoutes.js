import { Router } from "express";
import usuariocontroller from "../controllers/UsuarioController";
const route = new Router();
route.get("/cadastrar", usuariocontroller.cadastrar);
route.post("/efetuarlogin", usuariocontroller.efetuarlogin);
export default route;
