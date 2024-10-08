import { manterEntidade } from "../../../manterEntidade";
import configCriarPedido from "../../eventosManterentidade/criarpedido/configCriarPedido";
export default async function(myconfig){
    const labeldiv = 'selecionado'; 
    
    let inputoption = document.querySelector(`.${myconfig.classInputSelecionado}`);
    if(!inputoption){
        console.log(`Classe ${myconfig.classInputSelecionado} não foi localizada`)
        return;
    }
    let newdiv;
    let olddiv = document.querySelector(`.${labeldiv}`);
    if(olddiv)
        olddiv.remove();


    let clientecadastrado_campo = document.querySelector(`.clientecadastrado_campo`);
    if(!inputoption){
        console.log(`Classe ${clientecadastrado_campo} não foi localizada`)
        return;
    }
    clientecadastrado_campo.innerText = "SIM"
    
    let config = configCriarPedido;
    config.axios.rota_Ler=`/usuario/${inputoption.value}`;
    config.axios.metodo_Ler="get"
    new manterEntidade(config);
}