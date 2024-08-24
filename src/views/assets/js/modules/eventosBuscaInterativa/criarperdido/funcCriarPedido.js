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
    newdiv= document.createElement("div");
    newdiv.classList.add(labeldiv);
    let mainDiv = document.querySelector(`.${myconfig.className}`);

    if(!mainDiv) return;
    
    mainDiv.appendChild(newdiv);
    
    let config = configCriarPedido;
    config.axios.rota_Ler=`/usuario/${inputoption.value}`;
    config.axios.metodo_Ler="get"
    new manterEntidade(config);
    
    //newdiv.innerHTML="<h1>" + inputoption.value + "</h1>";


}