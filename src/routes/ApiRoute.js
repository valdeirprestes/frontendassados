import { Router } from "express";
import apicontroller from "../controllers/ApiController";
const route = new Router();

route.get("/", apicontroller.get);
route.put("/", apicontroller.put);

export default route;