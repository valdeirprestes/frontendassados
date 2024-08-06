import express from "express";
import session from "express-session";
import loginroutes from "./routes/LoginRoutes";
import homeroutes from "./routes/HomeRoutes";
import costumerserviceroutes from "./routes/CostumerServiceRoutes";
import controller404notfound from "../src/controllers/404Controller";
import path from "path";
import session from "express-session";
import cookiemiddlewares from "./middlewares/cookiemiddlewares";

class Api{
    constructor(){
        this.app = express();
        this.config();   
        this.middleware();
        this.routes();
    }
    config(){
        const sessionConfig={
            secret: 'asdfasdfasfd',
            resave: false,
            saveUninitialized: false,
            cookie: { httpOnly: true }
        };
        const sessionOptions = session(sessionConfig);
        this.app.use(sessionOptions);
        this.app.use(express.urlencoded({extended:true}));
        this.app.use("/public",express.static(path.resolve(__dirname, "..", "public")));
        this.app.set('views', path.resolve(__dirname,'views'));
        this.app.set('view engine', 'ejs');
        this.app.use(cookiemiddlewares);
    }
    routes(){
        this.app.use("/", homeroutes);
        this.app.use("/login", loginroutes);
        this.app.use("/atendimento", costumerserviceroutes)
        this.app.use("*",controller404notfound.page); // Default is 404 page not found!
    }
    middleware(){

    }

}

export default  new Api();