import axios from "axios";
import criatelaDialogo from "../utils/criatelaDialogo";
const classe_movimento  = "movimento_campo";
const classe_fase = "fase_campo"
const classe_status_pagamento = "status_pagamento_campo";
const class_mododeentrega= "mododeentrega_campo";
const class_idcliente = "usuarioselecionado_criarpedido";
const listClassprod ="idlistproduto_criarpedido";
const class_idusuario= "iduser";



const class_clienteregistrado = "clientecadastrado_campo";

let listacliente= [
    ["dadosusuario_nome","nome"],
    ["dadosusuario_email","email"],
    ["dadosusuario_telefone","telefone"],
    ["dadosusuario_celular","celular"],
    ["dadosusuario_logradouro","logradouro"],
    ["dadosusuario_numero","numero"],
    ["dadosusuario_municipio","municipio"]
];


function validarcampos(){
    let obj = {};
    let numcampos=0;
    let campousuario=0;
    
    listacliente.forEach( objcliente =>{
        let [tag, campo] = objcliente;
        let dados = document.querySelector(`.${tag}`);
        if(!dados){
            console.log(`Error, não consegui acessar a classe ${tag}`);
        }
        else if(dados.value.length > 0 ){
            if(campo == "nome") campousuario = 1;
            numcampos += 1;
        }
    });
    if(numcampos < 2 || campousuario != 1){
        criatelaDialogo("divflexvertical",
    "Para registrar um novo cliente precisa preencher o nome  e mais algum outro campo para contato como telefone, celular ou email ",
    -1);
        return false;

    }
        
    
    let tagdatamovimento = document.querySelector(`.${classe_movimento}`);
    if(!tagdatamovimento ){
        console.log(`Não conseguiu acessar class ${classe_movimento}`);
        criatelaDialogo("divflexvertical",
    "Erro interno do sistema",
    -1);
        return false;
    }
    console.log("tagdatamovimento.value", tagdatamovimento.value);
    console.log("tagdatamovimento.innerText", tagdatamovimento.innerText);
    if(tagdatamovimento.value.length< 1){
        criatelaDialogo("divflexvertical",
        "Preencha o dia do pedido no campo data",
    -1);
        return false;
    }
    try {
        const data = new Date(tagdatamovimento.value);
        
    } catch (error) {
        criatelaDialogo("divflexvertical",
        "Preencha o dia do pedido no campo data",
    -1);
        return false;
    }


    let listaprodutos = document.getElementsByClassName(listClassprod);
    if(listaprodutos.length<1){
        criatelaDialogo("divflexvertical",
    "Para criar um pedido  é necessário adicionar pelo menos um produto na lista de produtos",
    -1);
        return false;
    }

    return true;
}


function gerarobjcliente(){
    let obj = {};
    listacliente.forEach( objcliente =>{
        let [tag, campo] = objcliente;
        let dados = document.querySelector(`.${tag}`);
        if(!dados){
            console.log(`Error, não consegui acessar a classe ${tag}`);
        }
        else if(dados.value.length > 0 ){
            obj= {...obj, [campo]:dados.value};
        }
    });
    return obj;
}

function getlistidproduto(){
    let lista = document.getElementsByClassName(listClassprod);
    let listaid = [];
    if(!lista) return listaid;
    
    for(let i = 0; i < lista.length; i++){
        listaid.push(lista[i].innerText);
    }
    
    return listaid;
}

function getproduct(id){
    let preco = document.querySelector(`.input_preco${id}`);
    let quantidade = document.querySelector(`.input_qtd${id}`);
    if(!preco){
        console.log(`Não localizou input_preco${id}`);
        return {"idpedido":idpedido};
    }
    if(!quantidade){
        console.log(`Não localizou input_qtd${id}`);
        return {"idpedido":idpedido};
    }
    return {
        "idproduto":id,
        "quantidade":quantidade.value,
        "preco":preco.value 
    };
}

async function gravardadospedido(obj){
    const rota= "/pedido/criar2";
    const parametros= obj;
    let response = await axios.post('/api', {data:{ "rota":rota, "parametros":parametros}});
    return response;
}

async function gestaopedido_registrarnovopedido(){
    if(!validarcampos()){
        console.log("Erro na validação de dados do usuário");
        criatelaDialogo("divflexvertical",
        "Alguns dados estão incorretos para criar o pedido",
        -1);
        return;
    }
    let tagidcliente = document.querySelector(`.${class_idcliente}`);
    let tagidusuario = document.querySelector(`.${class_idusuario}`);
    let tagmododeentrega = document.querySelector(`.${class_mododeentrega}`);
    let tagstatus_pagamento = document.querySelector(`.${classe_status_pagamento}`);
    let tagdatamovimento = document.querySelector(`.${classe_movimento}`);

    let mododeentrega = tagmododeentrega.value
    let status_pagamento = tagstatus_pagamento.value

    let objneworder={};
    if(tagidcliente.innerText > 0){
        objneworder = {"idcliente":tagidcliente.value};
    }
    objneworder = {
        ...objneworder,
        "idusuario": tagidusuario.innerText,
        "idusuarioalt":tagidusuario.innerText,
        "status_pagamento":status_pagamento,
        "fase":"PENDENTE",
        "mododeentrega":mododeentrega,
        "datamovimento":tagdatamovimento.value
    }
    let listid = getlistidproduto();
    let objproduct = {};
    let listprod=[];
    listid.forEach(tmpid =>{
        const obj = getproduct(tmpid);
        listprod.push(obj);
        
    });
    objproduct = {"itens": listprod};
    objneworder = {...objneworder, ...objproduct};
    
    if(tagidcliente.innerText < 0){
        let objcliente = { "cliente": gerarobjcliente()};
        objneworder = { ...objneworder, ...objcliente};
    }
    console.log(objneworder);
    let response = await gravardadospedido(objneworder);
    console.log(response.data);
    const pedido = response.data;
    criatelaDialogo("divflexvertical",` O pedido ${pedido.id} foi gerado!`,1);
}
export { gestaopedido_registrarnovopedido }