import express from "express";
import session from "express-session";
import loginroute from "./routes/LoginRoute";
import homeroute from "./routes/HomeRoute";
import costumerserviceroute from "./routes/CostumerServiceRoute";
import usuarioroute from "./routes/UsuarioRoute"
import controllernotfound404 from "./controllers/NotFound404Controller";
import movimentroute from "./routes/MovimentRoute";
import apiroute from "./routes/ApiRoute";
import orderroute from "./routes/OrderRoute";
import estoqueroute from "./routes/EstoqueRoute"
import produtoroute from "./routes/ProdutoRoute"
import categoriaroute from "./routes/CategoriaRoute"
import path from "path";
import session from "express-session";
import cookiemiddlewares from "./middlewares/cookiemiddleware";
import movimentOpenedmiddleware from "./middlewares/movimentOpenedmiddleware";


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
        this.app.use(express.json());
        this.app.use("/public",express.static(path.resolve(__dirname, "..", "public")));
        //this.app.set('views', path.resolve(__dirname,'views'));
        this.app.set('views', path.resolve(__dirname,"..","src",'views'));
        this.app.set('view engine', 'ejs');
        this.app.use(cookiemiddlewares);
        this.app.use(movimentOpenedmiddleware);
        
    }
    routes(){
        this.app.use("/", homeroute);
        this.app.use("/login", loginroute);
        this.app.use("/atendimento", costumerserviceroute);
        this.app.use("/usuario", usuarioroute);
        this.app.use("/pedido", orderroute);
        this.app.use("/estoque", estoqueroute);
        this.app.use("/produto", produtoroute);
        this.app.use("/categoria", categoriaroute);
        this.app.use("/api", apiroute);
        this.app.use("/movimento", movimentroute);
        this.app.use("*",controllernotfound404.page); // Default is 404 page not found!
    }
    middleware(){

    }

}

export default  new Api();
