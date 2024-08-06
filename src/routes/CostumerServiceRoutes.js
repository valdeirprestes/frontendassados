import { Router } from "express";
import costumeServicecontroller from "../controllers/CostumeServiceController";
const route = new Router();
route.get("/", costumeServicecontroller.index);

export default route;