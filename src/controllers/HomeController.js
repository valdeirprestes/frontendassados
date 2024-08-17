import axios from "axios";
import axiosConfig from "../config/axiosConfig";
class HomeController{
    async index (req, res){
        try{
            const request = axios.create(axiosConfig.configcontroller(req, res));
            const listproducts = await request.get("/produto", {data:{"estado":"NORMAL"}});
            res.render('home', {"listproducts":listproducts.data});
        }
        catch(e){
            console.log(e);
            return res.redirect('notfound404'); //Tem que criar um pagina de erro inesperados
        }
        
    }
    victor(req, res) {
        return res.send("victor");
    }
    victor2(req, res) {
        return res.redirect("/login");
    }
    victor3(req, res) {
        return res.render('victor', {"nomecompleto":"Victor Hugo Franciscon","idade":"25"}); 
    }
    async testeProduto(req, res) {
        try {
            const request = axios.create(axiosConfig.configcontroller(req, res));
            const produtos = await request.get("/produto", {data:{"nome":"Frango","estado":"NORMAL"}});
            console.log(produtos.data);
            return res.render('produtoteste', {"produtos":produtos.data});
        } 
        catch (error) {
            console.log(error);
        }
    }
}

export default new HomeController();
