import axios from "axios";
import axiosConfig from "../config/axiosConfig";
export default async (req, res, next) => {
    const request  = axios.create(axiosConfig.configcontroller(req, res));   
    const response = await request.post(`/movimento/todos`, {"operacao":"ABERTO"});
    const dia = ["", "Segunda-feira", "Terça-feira", "Quarta-feira","Quinta-feira", "Sexta-feira", "Sabado","Domingo"];
     
    if(response.data.length > 0){
        res.locals.datamovimento = response.data[0].data;
        const d = new Date(response.data[0].data);
        const d2 = new Date(response.data[0].data).toLocaleDateString('pt-BR', {timeZone: 'UTC'});;
        res.locals.movimento = d2//.toISOString().split('T')[0]//d.toLocaleDateString(); 
        res.locals.movimento_dia = dia[d.getDay()+1];
        res.locals.movimento_dia_html = d.toISOString().substring(0,10)
        let data_atual = new Date(new Date().toISOString().substring(0,10));
        res.locals.movimentoid = response.data[0].id
        //console.log("data_atual", data_atual);
        //console.log("d", d);
        data_atual = new Date().getTimezoneOffset();
        if(data_atual > d )
        {
            
            res.locals.classeavismo = "aviso_movimento"
        }
        else
        {
            
            res.locals.classeavismo= "";
        }
    }
    next();
}