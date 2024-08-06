//import dotenv from "dotenv";
//dotenv.config();
import axios from "axios";
import urlBackEnd from "../urlBackEnd";

class ConfigAxios{
    configcontroller(req, res){
        let axiosconf = { 'baseURL': `${process.env.APP_PROTOCOL_DOMAIN_PORT}`};
        if(res.locals.user){
            axiosconf = { headers: {
                'Authorization': `Bearer ${res.locals.user.token}`
              }, ...axiosconf};
        }
        return axiosconf;
    }
    configbroswer(){
        const axiosconf = {baseURL: `${this.getURLBack()}` };
        return axiosconf;
    }
    getURLBack(){
        return urlBackEnd;
    }
    
}

export default new ConfigAxios();