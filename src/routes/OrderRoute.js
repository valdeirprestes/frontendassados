import { Router } from "express";
import validadmidlleware from "../middlewares/validadmmiddleware";
import ordercontroller from "../controllers/OrderController";

const route = new Router();
route.get('/criar', ordercontroller.createorder);
export default route;