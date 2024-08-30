import { Router } from "express";
import movimentcontroller from "../controllers/MovimentController";
const route = new Router();
route.get("/fechar", movimentcontroller.closemovimentpage );
route.post("/executarfechamento", movimentcontroller.closemovimentid );
route.get("/abrir", movimentcontroller.openmovimentpage);
route.post("/executarabertura", movimentcontroller.openmovimentdata);

export default route;