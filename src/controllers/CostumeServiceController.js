import axios from "axios";
import axiosConfig from "../config/axiosConfig";
import ErrorsList from "../config/erroslistConfig";
class CostumerServiControllers{
    async index(req, res){
        try
        {
            const request = axios.create(axiosConfig.configcontroller(req, res));
            let listorder = await request.post("/pedido/todospedidosdetalhados",{
                "mododeentrega":"SEMENTREGA",
                "estado":"NORMAL",
                "itens":{"estado":"NORMAL"}
            });
            let myfiltre;
            if(listorder)
                myfiltre = {"pedidossementrega":listorder.data};
            listorder = await request.post("/pedido/todospedidosdetalhados",{
                "mododeentrega":"COMENTREGA",
                "estado":"NORMAL",
                "itens":{"estado":"NORMAL"}
            });
            if(listorder)
                myfiltre = {...myfiltre, "pedidoscomentrega":listorder.data};
            
            return res.render("costumerservice", myfiltre);
        }  
        catch(e)
        {
            console.log(e);
            const response = e.response;
            //console.log("response.data.errors", response.data.errors);
            if(response.data.errors ){
                if(response.data.errors.includes(ErrorsList.EXPIRETOKEN) || 
                    response.data.errors.includes(ErrorsList.NOLOGIN))
                    //return res.render('login',{errorlogin:'Efetue seu login'});
                    return res.redirect('/login');
            }
            return res.redirect('404');
        }
    }
}

export default new CostumerServiControllers();