import axiosconfig from "../config/axiosConfig";
import Axios from "axios";
import urlConfig from "../config/urlConfig";
import { urlencoded } from "express";
class LoginController{
    formlogin(req, res){
        res.render('login', 
        {
            title:"login front-end assados", 
            msg:"Bem vindo ao Assados online"
        });
    }
    
    async dologin(req, res){
        try {
            const {email , senha } = req.body;
            //console.log("body", req.body);
            const axios = Axios.create(axiosconfig.configcontroller(req, res));
            const response = await axios.post('/token',{   
                "email":`${email}`, 
                "senha":`${senha}`
            });
            //console.log("data", response.data);
            req.session.user = response.data;
            req.session.save(()=>{
                return res.redirect(`/`);
            });            
        } catch (e) {
            console.log(e);
            res.render('login',{ 
                errorlogin:"usuário ou senha incorreta"
            });
        }
    }
    async logoff(req, res){
        req.session.user = null;
        req.session.save(()=>{
            return res.redirect(`/`);
        });
    }
}
export default new LoginController();

