import { Router } from "express";
import validadmidlleware from "../middlewares/validadmmiddleware";
import ordercontroller from "../controllers/OrderController";

const route = new Router();
route.get('/criar', validadmidlleware, ordercontroller.createorder);
route.get('/detalhes', validadmidlleware, ordercontroller.detalhes);
route.get('/concluidos', validadmidlleware, ordercontroller.concluidos);
route.get('/cancelados',validadmidlleware, ordercontroller.cancelados);
route.get('/editar', validadmidlleware, ordercontroller.editar);
export default route;