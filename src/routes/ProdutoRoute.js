import { Router } from "express";
import produtocontroller from "../controllers/ProdutoController";
import validservicemiddleware from "../middlewares/validservicemiddleware";

const route = new Router();
route.get("/criar", validservicemiddleware, produtocontroller.criar);
route.post("/efetuarcadastro", validservicemiddleware, produtocontroller.efetuarcadastro);
route.get("/listar/:pagina", validservicemiddleware, produtocontroller.listar);
route.get("/:id/editar", validservicemiddleware, produtocontroller.editar);
route.get("/:id/desativar", validservicemiddleware, produtocontroller.desativar);
route.post('/pesquisar/:pagina', validservicemiddleware, produtocontroller.pesquisar);
export default route;
