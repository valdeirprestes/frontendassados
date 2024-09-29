import axios from "axios";
import { atendimento_atualizarpainel } from "./atendimento_dadospainel";

const class_atendimento_paginacao_ul = "js_atendimento_paginacao";
const class_atendimento_paginacao_li_page = "js_atendimento_paginacao_page";


const class_atendimento_busca_input = "js_atendimento_campo_busca";
const class_atendimento_comentrega_input = 'js_atendimento_campo_comentrega';
const class_atendimento_sementrega_input = 'js_atendimento_campo_sementrega';
const class_atendimento_estadonormal_input = 'js_atendimento_campo_estadonormal';
const class_atendimento_estadocancelado_input = 'js_atendimento_campo_estadocancelado';
const class_atendimento_fase_concluidos = 'js_atendimento_campo_fase_concluido';

const class_atendimento_pagina_atual = 'jsatendimento_campo_pagina_atual';
const class_atendimento_pagina_quantidade = 'jsatendimento_campo_pagina_quantidade';
const class_atendimento_quantidade_total = "jsatendimento_campo_quantidade_total";

const class_atendimento_tabela_table  = 'js_atendimento_tabela_table';
const class_atendimento_tr = 'atendimento_tr';
const class_atendimento_movimento = 'jsatendimento_campo_movimento_filtro';

function alterarpagina(num)
{
    let tagpageatual = document.querySelector(`.${class_atendimento_pagina_atual}`);
    if(!tagpageatual)
    {
        console.log(`Não conseguiu acessar ${class_atendimento_pagina_atual}`);
        return;
    }
    tagpageatual.innerText = num;
    atendimento_busca_pedido();
}

function criaPaginacao()
{
   
    let tagli_page = document.getElementsByClassName(class_atendimento_paginacao_li_page);
    if(!tagli_page)
    {
        console.log(`Não conseguiu acessar ${class_atendimento_paginacao_li_page}`);
        return;
    }
    let tagqtdtotal = document.querySelector(`.${class_atendimento_quantidade_total}`);
    if(!tagqtdtotal)
    {
        console.log(`Não conseguiu acessar ${class_atendimento_quantidade_total}`);
        return;
    }
    let tagqtdelementospages = document.querySelector(`.${class_atendimento_pagina_quantidade}`);
    if(!tagqtdelementospages)
    {
        console.log(`Não conseguiu acessar ${class_atendimento_pagina_quantidade}`);
        return;
    }
    
    let tagul = document.querySelector(`.${class_atendimento_paginacao_ul}`);
    if(!tagul)
    {
        console.log(`Não conseguiu acessar ${class_atendimento_paginacao_ul}`);
        return;
    }
    let numpages = parseInt( tagqtdtotal.innerText / tagqtdelementospages.innerText );
    let taglink, taglipag;
    console.log("total elementospags numpages", tagqtdtotal.innerText, tagqtdelementospages.innerText , numpages);
    if(tagqtdtotal.innerText==0)
    {
        limparPaginacao;
        return;
    }
    for (let i=0; i < numpages ; i++)
    {
        taglipag = document.createElement('li');
        taglipag.classList.add(class_atendimento_paginacao_li_page);
        
        taglink = document.createElement('a');
        taglink.classList.add('pagina');
        taglink.innerText = i+1;
        taglink.onclick = () => alterarpagina(i+1);
        taglipag.appendChild(taglink);
        tagul.appendChild(taglipag);
    }
}

function limparPaginacao(){
    let tagul = document.getElementsByClassName(class_atendimento_paginacao_li_page);
    if(!tagul)
    {
        console.log(`Não conseguiu acessar ${class_atendimento_paginacao_li_page}`);
        return;
    }
    
    while(tagul.length > 0)
    {
        tagul[0].remove();
    }


}
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
        const qtd_total = document.querySelector(`.${class_atendimento_quantidade_total}`);
        
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
        if(!qtd_total){
            console.log(`Não conseguiu acessar a classe ${class_atendimento_quantidade_total}`);
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
        let request = await axios.post("/api",args_api);
        qtd_total.innerText = request.data;
        

        

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
            limparPaginacao();
            limparTable();
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
    limparPaginacao();
    limparTable();
    atendimento_geraTr();
    atendimento_atualizarpainel();
    //criaPaginacao();
}

export  { atendimento_busca_pedido, criaPaginacao };