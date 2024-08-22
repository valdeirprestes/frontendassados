import axios from "axios";
import axiosConfig from "../config/axiosConfig";
class ApiController{
    async get(req, res){
        try {
            //console.log("func body:", req.body);
            //console.log("func query:", req.query);
            const {rota, parametros} = req.query.data;
            //console.log('rota', rota, 'parametros', parametros);
            const request = axios.create(axiosConfig.configcontroller(req, res));
            let resapi = await request.get(rota, parametros);
            return res.status(resapi.status).json(resapi.data);
        } catch (e) {
            if(e.response)
                return res.status(e.response.status).json(e.response.data);
            return res.status(501).json({errors:{ "msg": "Erro interno na aplicação"}});
            
        }
    }
    async post(req, res){
        try {
            //console.log("func post:", req.body);
            const {rota, parametros} = req.body.data;
            const request = axios.create(axiosConfig.configcontroller(req, res));
            let resapi = await request.post(rota, parametros);
            return res.status(resapi.status).json(resapi.data);
        } catch (e) {
            if(e.response)
                return res.status(e.response.status).json(e.response.data);
            return res.status(501).json({errors:{ "msg": "Erro interno na aplicação"}});
            
        }
    }
    async put(req, res){
        try {
            const {rota, parametros} = req.body.data;
            const request = axios.create(axiosConfig.configcontroller(req, res));
            let resapi = await request.put(rota, parametros);
            return res.status(resapi.status).json(resapi.data);
        } catch (e) {
            if(e.response)
                return res.status(e.response.status).json(e.response.data);
            return res.status(501).json({errors:{ "msg": "Erro interno na aplicação"}});
        }
    }
    async delete(req, res){
        try {
            const {rota, parametros} = req.body.data;
            const request = axios.create(axiosConfig.configcontroller(req, res));
            let resapi = await request.delete(rota, parametros);
            return res.status(resapi.status).json(resapi.data);
        } catch (e) {
            if(e.response)
                return res.status(e.response.status).json(e.response.data);
            return res.status(501).json({errors:{ "msg": "Erro interno na aplicação"}});
            
        }
    }

}

export default new ApiController();