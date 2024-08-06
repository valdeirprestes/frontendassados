import Axios from "axios";
import axiosConfig from "../config/axiosConfig";
import ErrorsList from "../config/erroslistConfig";
class CostumerServiControllers{
    async index(req, res){
        try
        {
            const axios = Axios.create(axiosConfig.configcontroller(req, res));
            let listorder = await axios.post("/pedido/todospedidosdetalhados",{
                "mododeentrega":"SEMENTREGA"
            });
            let myfiltre;
            if(listorder)
                myfiltre = {"pedidossementrega":listorder.data};
            listorder = await axios.post("/pedido/todospedidosdetalhados",{
                "mododeentrega":"COMENTREGA"
            });
            if(listorder)
                myfiltre = {...myfiltre, "pedidoscomentrega":listorder.data};
            console.log('myfiltre', myfiltre);
            res.render("costumerservice", myfiltre);
        }  
        catch(e)
        {
            console.log(e.response);
            const response = e.response;
            console.log("response.data.errors", response.data.errors);
            if(response.data.errors ){
                if(response.data.errors.includes(ErrorsList.EXPIRETOKEN) || 
                    response.data.errors.includes(ErrorsList.NOLOGIN))
                    res.render('login',{errorlogin:'Efetue seu login'});
                if(response.data.errors.includes(ErrorsList.ROUTENOTFOUND))
                    res.status(400).render('404',{"title":'Errors interno',"msg":response.data.errors[0]});
            }
            res.status(400).render('404',{"title":'Errors interno',"msg":'Errors interno'});
        }
    }

}

export default new CostumerServiControllers();