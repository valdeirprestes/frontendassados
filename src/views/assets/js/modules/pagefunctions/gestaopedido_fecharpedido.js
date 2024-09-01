import axios from "axios";
import criatelaDialogo from "../utils/criatelaDialogo";
const class_idpedido = "id_pedido";
const class_main  ="divflexvertical"
 async function gestaodepedido_fecharpedido(argfunc){
    try {
        let parametros ={};
    
        const idpedido = document.querySelector(`.${class_idpedido}`);
        if(!idpedido){
            console.log(`Não conseguiu localizar class ${class_idpedido}`);
            criatelaDialogo(class_main, "Erro, log no sistema", -1 );
            return;
        }
        let rota = `/pedido/${idpedido.innerText}/fecharpedido`;
        const response =await axios.post("/api", { data:{ rota, parametros}});
        console.log("mensage ", response.data);
        if(!response)
            new Error("");
        criatelaDialogo(class_main, `O pedido ${response.data.id} foi finalizado `, 1);
        document.location = `/pedido/${idpedido.innerText}`;
    } catch (e) {
        console.log(e);
        
        const {errors} = e.response.data;
        if(errors){
            errors.forEach(erro => {
                criatelaDialogo(class_main, erro, -1)        
            });
            return;
        }
        criatelaDialogo(class_main, "Erro no sistema na hora de finalizar o pedido. ", -1)
    }   

}

export default gestaodepedido_fecharpedido;