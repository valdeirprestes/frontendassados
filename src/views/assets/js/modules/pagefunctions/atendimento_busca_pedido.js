import axios from "axios";

const class_atendimento_paginacao_li = "js_atendimento_paginacao";
const class_atendimento_busca_input = "js_atendimento_campo_busca";
const class_atendimento_comentrega_input = 'js_atendimento_campo_comentrega';
const class_atendimento_sementrega_input = 'js_atendimento_campo_sementrega';
const class_atendimento_estadonormal_input = 'js_atendimento_campo_estadonormal';
const class_atendimento_estadocancelado_input = 'js_atendimento_campo_estadocancelado';
const class_atendimento_fase_concluidos = 'js_atendimento_campo_fase_concluido';
const class_atendimento_pagina_atual = 'atendimento_campo_pagina_atual';
const class_atendimento_pagina_quantidade = 'atendimento_campo_pagina_quantidade';
const class_atendimento_tabela_table  = 'js_atendimento_tabela_table';
const class_atendimento_tr = 'atendimento_tr';
const class_atendimento_movimento = 'atendimento_campo_movimento_filtro';


function limparTable(){
    const tagtr = document.getElementsByClassName(`${class_atendimento_tr}`);
    while( tagtr.length > 0)
    {
        tagtr[0].remove();
    }
}

async function atendimento_geraTr(){
    try {
        
        let parametros = {};
        const check_comentrega = document.querySelector(`.${class_atendimento_comentrega_input}`);
        const check_sementrega = document.querySelector(`.${class_atendimento_sementrega_input}`);
        const check_estado_normal = document.querySelector(`.${class_atendimento_estadonormal_input}`);
        const check_estado_cancelado = document.querySelector(`.${class_atendimento_estadocancelado_input}`);
        const input_busca = document.querySelector(`.${class_atendimento_busca_input}`);
        const check_concluidos = document.querySelector(`.${class_atendimento_fase_concluidos}`);
        const pagina = document.querySelector(`.${class_atendimento_pagina_atual}`);
        const quantidade_pagina = document.querySelector(`.${class_atendimento_pagina_quantidade}`);
        const span_movimento = document.querySelector(`.${class_atendimento_movimento}`);
        limparTable();
        if(!check_comentrega){
            console.log(`Não conseguiu acessar a classe ${class_atendimento_comentrega_input}`);
            return;
        }
        if(!check_sementrega){
            console.log(`Não conseguiu acessar a classe ${class_atendimento_sementrega_input}`);
            return;
        }
        if(!check_estado_normal){
            console.log(`Não conseguiu acessar a classe ${class_atendimento_estadonormal_input}`);
            return;
        }
        if(!check_estado_cancelado){
            console.log(`Não conseguiu acessar a classe ${class_atendimento_estadocancelado_input}`);
            return;
        }
        if(!pagina){
            console.log(`Não conseguiu acessar a classe ${class_atendimento_pagina_atual}`);
            return;
        }
        if(!quantidade_pagina){
            console.log(`Não conseguiu acessar a classe ${class_atendimento_pagina_quantidade}`);
            return;
        }
        if(!input_busca){
            console.log(`Não conseguiu acessar a classe ${class_atendimento_busca_input}`);
            return;
        }
        if(!check_concluidos){
            console.log(`Não conseguiu acessar a classe ${class_atendimento_fase_concluidos}`);
            return;
        }
        if(!span_movimento){
            console.log(`Não conseguiu acessar a classe ${class_atendimento_movimento}`);
            return;
        }
        

        if(!check_comentrega.checked  && check_sementrega.checked)
            parametros = {...parametros, "mododeentrega":"SEMENTREGA"};
        if( check_comentrega.checked  && !check_sementrega.checked)
            parametros = {...parametros, "mododeentrega":"COMENTREGA"};
        if( !check_comentrega.checked  && !check_sementrega.checked)
            parametros = {...parametros, "mododeentrega":"-"};

        if(!check_estado_normal.checked && check_estado_cancelado.checked)
            parametros = {...parametros,"estado":"CANCELADO"};
        if(check_estado_normal.checked && !check_estado_cancelado.checked)
            parametros = {...parametros,"estado":"NORMAL"};
        if(!check_estado_normal.checked && !check_estado_cancelado.checked)
            parametros = {...parametros,"estado":"-"};
        
        if(!check_concluidos.checked)
            parametros = {...parametros, "fase":"PENDENTE"};
        
            

        if(input_busca.value.length > 0)
        {
            parametros = {
                ...parametros,
                "nome": input_busca.value,
                "telefone": input_busca.value,
                "celular": input_busca.value,
                "email": input_busca.value
            }
        }
        parametros = { ...parametros, "datamovimento":span_movimento.innerText};
        
        

        let rota = "/pedido/quantidade";
        let args_api = {"data":{"rota":rota, "parametros":parametros}}
        console.log(args_api);
        
        let request = await axios.post("/api",args_api);

        parametros = {
            ...parametros, 
            pagina: parseInt(pagina.innerText), 
            qtdpagina:parseInt(quantidade_pagina.innerText)
        };
        rota = "/pedido/todospedidosdetalhados";
        args_api = {"data":{"rota":rota, "parametros":parametros}}
        
        request = await axios.post("/api",args_api);
        
        const {data} = request;
        if(!data || data.length < 1)
        {
            console.log("Não encontrou pedidos com os filtros informados");
            return;
        }
        let tagtable = document.querySelector(`.${class_atendimento_tabela_table}`);
        if(!tagtable){
            console.log(`Não conseguiu acessar a clase ${class_atendimento_tabela_table}`);
            return;
        }
        let tagtr;
        let tagtd;
        let taglink1, taglink2;
        
        console.log(data)
        data.forEach(pedido => {
            tagtr = document.createElement("tr");
            tagtr.classList.add(class_atendimento_tr);
            tagtd = document.createElement("td");
            tagtd.innerText = pedido.id;
            tagtr.appendChild(tagtd);

            tagtd = document.createElement("td");
            tagtd.innerText = pedido.cliente.nome;
            tagtr.appendChild(tagtd);

            tagtd = document.createElement("td");
            tagtd.innerText = pedido.cliente.telefone;
            tagtr.appendChild(tagtd);

            tagtd = document.createElement("td");
            tagtd.innerText = pedido.cliente.celular;
            tagtr.appendChild(tagtd);

            tagtd = document.createElement("td");
            tagtd.innerText = pedido.cliente.email;
            tagtr.appendChild(tagtd);

            tagtd = document.createElement("td");
            tagtd.innerText = pedido.mododeentrega;
            tagtr.appendChild(tagtd);

            tagtd = document.createElement("td");
            tagtd.innerText = pedido.estado;
            tagtr.appendChild(tagtd);

            tagtd = document.createElement("td");
            tagtd.innerText = pedido.fase;
            tagtr.appendChild(tagtd);

            tagtd = document.createElement("td");
            if(pedido.estado != "CANCELADO" && pedido.fase != "CONCLUIDO")
            {
                taglink1 = document.createElement("a");
                taglink1.innerText = "Finalizar";
                taglink1.href = `/pedido/finalizar/${pedido.id}`;
                taglink1.classList.add("botao");
                tagtd.appendChild(taglink1);
            }
            
            if(pedido.estado != "CANCELADO" && pedido.fase != "CONCLUIDO")
            {
                taglink2 = document.createElement("a");
                taglink2.innerText="Editar";
                taglink2.href = `/pedido/${pedido.id}`;
                taglink2.classList.add("botao");
                tagtd.appendChild(taglink2);
            }
            tagtr.appendChild(tagtd);
            
            tagtable.appendChild(tagtr);
            
        });

    } catch (error) {
        console.log(error);
    }
    
}

function atendimento_busca_pedido(arg){
    atendimento_geraTr();
}

export default atendimento_busca_pedido;