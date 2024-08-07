import axios from "axios";
import axiosConfig from "../config/axiosConfig";
class HomeController{
    async index (req, res){
        try{
            const request = axios.create(axiosConfig.configcontroller(req, res));
            const listproducts = await request.get("/produto", { "estado":"NORMAL"});
            res.render('home', {"listproducts":listproducts.data});
        }
        catch(e){
            console.log(e);
            return res.redirect('404'); //Tem que criar um pagina de erro inesperados
        }
        
    }
}

export default new HomeController();