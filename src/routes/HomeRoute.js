import { Router } from "express";
import homecontroller from "../controllers/HomeController.js";
const route = new Router();
route.get("/", homecontroller.index);
export default route;