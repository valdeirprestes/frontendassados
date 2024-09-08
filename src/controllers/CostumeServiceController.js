import axios from "axios";
import axiosConfig from "../config/axiosConfig";
import ErrorsList from "../config/erroslistConfig";
class CostumerServiControllers{
    async index(req, res){
        try
        {
            const {movimentoid} = res.locals;
            if(!movimentoid)
            return res.status(200).render('telainformacao',{
                "telainformacao_tipo":"erro-tela",
                "telainformacao_msg":`Você precisa abrir um movimento para gerenciar pedidos`
            });
            const request = axios.create(axiosConfig.configcontroller(req, res));
            
            let listorder = await request.post("/pedido/todospedidosdetalhados",{
                "datamovimento":res.locals.movimento_dia_html,
                "mododeentrega":"SEMENTREGA",
                "estado":"NORMAL",
                "fase":"PENDENTE",
                "itens":{"estado":"NORMAL"}
            });
            let myfiltre;
            if(listorder)
                myfiltre = {"pedidossementrega":listorder.data};
            listorder = await request.post("/pedido/todospedidosdetalhados",{
                "datamovimento":res.locals.movimento_dia_html,
                "mododeentrega":"COMENTREGA",
                "fase":"PENDENTE",
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

    async index2(req, res){
        try
        {
            const {movimentoid} = res.locals;
            if(!movimentoid)
            return res.status(200).render('telainformacao',{
                "telainformacao_tipo":"erro-tela",
                "telainformacao_msg":`Você precisa abrir um movimento para gerenciar pedidos`
            });
            const request = axios.create(axiosConfig.configcontroller(req, res));
            let listorder = await request.post("/pedido/todospedidosdetalhados",{
                "datamovimento":res.locals.movimento_dia_html,
                "estado":"NORMAL",
                "fase":"PENDENTE",
                "itens":{"estado":"NORMAL"}
            });            
            return res.render("atendimento", 
            {
                "pedidos":listorder.data, 
                "movimento_dia_html": res.locals.movimento_dia_html
            });
        }  
        catch(e)
        {
            console.log(e);
            const response = e.response;
            if(response.data.errors ){
                if(response.data.errors.includes(ErrorsList.EXPIRETOKEN) || 
                    response.data.errors.includes(ErrorsList.NOLOGIN))
                    return res.redirect('/login');
            }
            return res.redirect('404');
        }
    }


}

export default new CostumerServiControllers();