import { Router } from "express";
import validservicemiddleware from "../middlewares/validservicemiddleware";
import costumeServicecontroller from "../controllers/CostumeServiceController";

const route = new Router();
route.get("/", validservicemiddleware,   costumeServicecontroller.index);
route.get("/novo", validservicemiddleware,   costumeServicecontroller.index2);

export default route;