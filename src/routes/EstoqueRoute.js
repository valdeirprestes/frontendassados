import { Router } from "express";
import estoquecontroler from "../controllers/EstoqueController"
const router = new Router();
router.get("/", estoquecontroler.index);
router.get("/adicionar", estoquecontroler.adicionarestoque);
export default router;