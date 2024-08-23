//import dotenv from "dotenv";
//dotenv.config();
import axios from "axios";

import lodash from "lodash";



class ConfigAxios{
    configcontroller(req, res){
        let axiosconf = { 'baseURL': `${process.env.APP_PROTOCOL_DOMAIN_PORT}`};
        let usersession =  lodash.get(res,"locals.user",null);
        if(usersession){
            axiosconf = { headers: {
                'Authorization': `Bearer ${usersession.token}`
              }, ...axiosconf};
        }
        return axiosconf;
    }
}

export default new ConfigAxios();