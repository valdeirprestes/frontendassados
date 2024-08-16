import axios from "axios";
import axiosConfig from "../config/axiosConfig";
import { get } from "lodash";



export default async (req, res, next )=>{
    res.locals.user = req.session.user;

    if(res.locals.user)
    {   
        const request = axios.create(axiosConfig.configcontroller());
        const user = await request.get(`/usuario/${res.locals.user.id}`); 
        if(user){
            console.log('user',user);
            const {data} = user;
            if(data.perfil == "ATENDENTE" || data.perfil == "ADM")
            res.locals.permissaoatendente = 1;
        else
            res.locals.permissaoatendente = null;

        
        if(data.perfil == "ADM")
            res.locals.permissaoadm= 1;
        else
            res.locals.permissaoadm= null;
        }
    }
    else
    {
        res.locals.permissaoatendente = null;
        res.locals.permissaoadm= null;
    }
    next();

}