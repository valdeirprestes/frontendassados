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
    configbroswer(){
        const user = JSON.parse(sessionStorage.getItem('user'));
        let axiosconf = {baseURL: `${this.getURLBack()}` };
        if(user){
            axiosconf = { headers: {
                'Authorization': `Bearer ${user.token}`
              }, ...axiosconf};
        }
        return axiosconf;
    }
    getURLBack(){
        return urlBackEnd;
    }
    
}

export default new ConfigAxios();