import criatelaDialogo from "../utils/criatelaDialogo";
import axios from "axios";
const class_pedido_campo = "pedido_campo";

async function gestaopedido_cancelar(objparametros){
    let tagpedido = document.querySelector(`.${class_pedido_campo}`);
    if(!tagpedido){
        const erro = `Pedido não registrado no campo ${class_pedido_campo}`;
        console.log(erro);
        return
    }
    let pedidoval = parseInt(tagpedido.innerText) || -1
    if(pedidoval == -1)
    {
        criatelaDialogo("divflexvertical",` Pedido não registrado!`,-1);
        return
    }

    let response;
    try {
        
        let parametros={};
        response = await axios.post("/api",{data:{rota:`/pedido/${pedidoval}/cancelar`, parametros}});
        criatelaDialogo("divflexvertical",`O pedido ${pedidoval} foi cancelado`,1);
        document.location = `/pedido/${pedido.id}`;
        

    } catch (e) {
        console.log(e);
        let {errors} = e.response.data;
        if(errors)
        {
            errors.forEach(erro => {
                criatelaDialogo("divflexvertical",erro,-1);
            }); 
            return;
        }
        if(e)
            criatelaDialogo("divflexvertical",` Pedido não registrado!`,-1);
        return;
    }
}


export default gestaopedido_cancelar;