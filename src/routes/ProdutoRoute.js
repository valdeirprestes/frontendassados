import { Router } from "express";
import produtocontroller from "../controllers/ProdutoController";
import validadmmiddleware from "../middlewares/validadmmiddleware";
const route = new Router();
route.get("/criar", validadmmiddleware, produtocontroller.criar);
route.post("/efetuarcadastro", validadmmiddleware, produtocontroller.efetuarcadastro);
route.get("/:id/editar", validadmmiddleware, produtocontroller.editar);
export default route;
