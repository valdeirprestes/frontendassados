import { Router } from "express";
import apicontroller from "../controllers/ApiController";
const route = new Router();

route.get("/", apicontroller.get);
route.put("/", apicontroller.put);
route.post("/", apicontroller.post);
route.delete("/", apicontroller.delete);

export default route;