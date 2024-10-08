import { Router } from "express";
import usuariocontroller from "../controllers/UsuarioController";
import validadmmiddleware from "../middlewares/validadmmiddleware";
const route = new Router();
route.get("/cadastrar", validadmmiddleware, usuariocontroller.cadastrar);
route.post("/redirecionar", usuariocontroller.redirecionar);
route.get("/listar/:pagina", validadmmiddleware, usuariocontroller.listar);
route.get("/:id/desativar", validadmmiddleware, usuariocontroller.desativar);
route.get("/:id/editar", validadmmiddleware, usuariocontroller.editar);
route.post('/pesquisar/:pagina', validadmmiddleware, usuariocontroller.pesquisar);
export default route;
