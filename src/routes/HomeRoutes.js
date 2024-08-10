import { Router } from "express";
import homecontroller from "../controllers/HomeController";
const route = new Router();
route.get("/", homecontroller.index);
route.get("/victor", homecontroller.victor);
route.get("/victor2", homecontroller.victor2);
route.get("/victor3", homecontroller.victor3);
route.get("/testeproduto", homecontroller.testeProduto);
export default route;