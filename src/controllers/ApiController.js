import axios from "axios";
import axiosConfig from "../config/axiosConfig";
class ApiController{
    async get(req, res){
        try {
            const {rota, parametros} = req.body.data;
            const request = axios.create(axiosConfig.configcontroller(req, res));
            let resapi = await request.get(rota, parametros);
            return res.status(resapi.status).json(resapi.data);
        } catch (e) {
            return res.status(e.response.status).json(e.response.data);
            
        }
    }
    async post(req, res){
        try {
            const {rota, parametros} = req.body.data;
            const request = axios.create(axiosConfig.configcontroller(req, res));
            let resapi = await request.post(rota, parametros);
            return res.status(resapi.status).json(resapi.data);
        } catch (e) {
            return res.status(e.response.status).json(e.response.data);
            
        }
    }
    async put(req, res){
        try {
            const {rota, parametros} = req.body.data;
            const request = axios.create(axiosConfig.configcontroller(req, res));
            let resapi = await request.put(rota, parametros);
            return res.status(resapi.status).json(resapi.data);
        } catch (e) {
            return res.status(e.response.status).json(e.response.data);
            
        }
    }
    async delete(req, res){
        try {
            const {rota, parametros} = req.body.data;
            const request = axios.create(axiosConfig.configcontroller(req, res));
            let resapi = await request.delete(rota, parametros);
            return res.status(resapi.status).json(resapi.data);
        } catch (e) {
            return res.status(e.response.status).json(e.response.data);
            
        }
    }

}

export default new ApiController();