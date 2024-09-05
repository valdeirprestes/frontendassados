import { Router } from "express";

import validservicemiddleware from "../middlewares/validservicemiddleware";
import ordercontroller from "../controllers/OrderController";
import movimentOpenedmiddleware from "../middlewares/movimentOpenedmiddleware";

const route = new Router();
route.get('/criar', validservicemiddleware, movimentOpenedmiddleware, ordercontroller.createorder);
route.get('/:id', validservicemiddleware , ordercontroller.pedido);

route.get('/detalhes', validservicemiddleware,   ordercontroller.detalhes);
route.get('/concluidos', validservicemiddleware,  ordercontroller.concluidos);
route.get('/cancelados',validservicemiddleware,   ordercontroller.cancelados);
route.get('/editar/', validservicemiddleware,   ordercontroller.editar);

route.get("/cancelar/:id", validservicemiddleware, ordercontroller.cancelarpedido);
route.get("/finalizar/:id", validservicemiddleware, ordercontroller.finalizarpedido);
export default route;