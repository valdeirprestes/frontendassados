import { Router } from "express";
import validadmidlleware from "../middlewares/validadmmiddleware";
import ordercontroller from "../controllers/OrderController";

const route = new Router();
route.get('/criar', ordercontroller.createorder);
route.get('/detalhes', ordercontroller.detalhes);
route.get('/concluidos', ordercontroller.concluidos);
route.get('/cancelados', ordercontroller.cancelados);
route.get('/editar', ordercontroller.editar);
export default route;