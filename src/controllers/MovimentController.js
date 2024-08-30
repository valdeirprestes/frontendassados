import axios from "axios";
import axiosConfig from "../config/axiosConfig";

class MovimentController{
    closemovimentpage(req , res){
        const {movimentoid} = res.locals;
        if(!movimentoid)
            return res.status(200).render('telainformacao',{
                "telainformacao_tipo":"erro-tela",
                "telainformacao_msg":`Você não existe movimento aberto para fechar`
            });
        return res.status(200).render('movimento_fechar');
    }

    openmovimentpage(req , res){
        const {movimentoid} = res.locals;
            if(movimentoid)
            return res.status(200).render('telainformacao',{
                "telainformacao_tipo":"erro-tela",
                "telainformacao_msg":`Você já esta em um movimento aberto`
            });
        return res.status(200).render('movimento_abrir');
    }

    async closemovimentid(req, res){
        try {
            const {movimentoid} =  req.body;
            if(!movimentoid)
            return res.status(200).render('telainformacao',{
                "telainformacao_tipo":"erro-tela",
                "telainformacao_msg":`O movimento  id  não foi localizado`
            });
            const request = axios.create(axiosConfig.configcontroller(req, res));
            const response = await request.post(`/movimento/fechar`,{
                "idmov":movimentoid,
                "idusuario": res.locals.user.id
            });
            return res.status(200).render('telainformacao',{
                "telainformacao_tipo":"sucesso-tela",
                "telainformacao_msg":`O movimento do dia ${res.locals.movimento} foi fechado`
            });
        } catch (e) {
            console.log(e);
            return res.status(200).render('telainformacao',{
                "telainformacao_tipo":"erro-tela",
                "telainformacao_msg":`Não foi possivel fechar o movimento do dia ${res.locals.movimento}`
            });
        }
        

    }

    async openmovimentdata(req, res){
        try {
            const {movimento_data} =  req.body;
            if(!movimento_data)
                return res.status(200).render('telainformacao',{
                    "telainformacao_tipo":"erro-tela",
                    "telainformacao_msg":`Precisa entrar com uma data para abrir o movimento`
                });
            const request = axios.create(axiosConfig.configcontroller(req, res));
            const response = await request.post(`/movimento`,{
                "data":movimento_data,
                "idusuario": res.locals.user.id,
                "idusuarioalt": res.locals.user.id
            });
            return res.status(200).render('telainformacao',{
                "telainformacao_tipo":"sucesso-tela",
                "telainformacao_msg":`O movimento do dia ${movimento_data} foi aberto`
            });
        } catch (e) {
            console.log(e);
            return res.status(200).render('telainformacao',{
                "telainformacao_tipo":"erro-tela",
                "telainformacao_msg":`Não foi possivel fechar o movimento do dia ${movimento_data}`
            });
        }
        

    }
}

export default new MovimentController();