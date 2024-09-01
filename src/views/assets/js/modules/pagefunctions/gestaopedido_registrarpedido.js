import axios from "axios";
import criatelaDialogo from "../utils/criatelaDialogo";
const classe_movimento  = "movimento_campo";
const classe_fase = "fase_campo"
const classe_status_pagamento = "status_pagamento_campo";
const class_mododeentrega= "mododeentrega_campo";
const class_idcliente = "usuarioselecionado_criarpedido";
const listClassprod ="idlistproduto_criarpedido";
const class_idusuario= "iduser";
const class_pedido_campo  = 'pedido_campo';
const class_alterar_usuario = 'dadosusuario_nome';



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

async function gravardadospedido(obj, modo){
    try {
        let rota;
        const parametros= obj;
        let response;
        if(modo == 1){
            rota= "/pedido/criar2";
            response = await axios.post('/api', {data:{ "rota":rota, "parametros":parametros}});
            return response;
        }
        else if(modo == 2){
            rota= "/pedido/atualizar";
            response = await axios.put('/api', {data:{ "rota":rota, "parametros":parametros}});
            return response;
        }
        else
            new Error();       
        
    } catch (e) {
        const {errors} = e.response.data;
        if(errors){
            errors.forEach((erro)=>{
                console.log("Erro:", erro);
                criatelaDialogo("divflexvertical",erro,0);
            });
        }
        criatelaDialogo(divflexvertical,"Erra ao tentar os ler os dados do pedido", -1);
        return;
    }
}

async function atualizarCliente(id){
    try{
        const rota = `/usuario/${id}`;
        let parametros = gerarobjcliente();
        parametros = {...parametros, "id":id};
        const response = await axios.put("/api", {data:{ rota , parametros}});
        if(response.status != 200)
            new Error();
        return response;
    }catch(e){
        const {errors} = e.response.data;
        if(errors){
            errors.forEach((erro)=>{
                console.log("Erro:", erro);
                criatelaDialogo("divflexvertical",erro,-1);
            })
            return null;
        }
        console.log(`Erra ao tentr os dados do usuario`);
        criatelaDialogo(divflexvertical,"Erra ao tentar os dados do usuario", -1)
        return;
    }
}
async function gestaopedido_registrarnovopedido(objparametros){
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
    let tagpedido = document.querySelector(`.${class_pedido_campo}`);
    let tagalterarusuario = document.querySelector(`.${class_alterar_usuario}`);

    let mododeentrega = tagmododeentrega.value
    let status_pagamento = tagstatus_pagamento.value

    let objneworder={};
    if(!tagidcliente)
        {
            console.log(`Não conseguiu acessar a classe ${class_idcliente}`);
            return;
        }
    if(tagidcliente.innerText > 0){
        objneworder = {"idcliente":tagidcliente.innerText};
        if(!tagalterarusuario)
        {
            console.log(`Não conseguiu acessar a classe ${class_alterar_usuario}`);
            return;
        }
        if(tagalterarusuario.innerText != -1)
        {
           let response =  await atualizarCliente(tagidcliente.innerText);
           if(!response)
            return;
        }
    }
    let pedidoval = parseInt(tagpedido.innerText) || 0;
    if(pedidoval)
        objneworder = {...objneworder, "id":pedidoval};
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
    
    let clienteval = tagidcliente.innerText || 0;
    if(clienteval < 1){
        let objcliente = { "cliente": gerarobjcliente()};
        objneworder = { ...objneworder, ...objcliente};
    }
    
    let response;
    let pedido;
    if(parseInt(tagpedido.innerText) > 0) {
        response = await gravardadospedido(objneworder, 2 ); // Atualizar novo
        if(!response){
            criatelaDialogo("divflexvertical",` Erro interno no sistma ao grava o pedido.`,-1);
            return;
        }
        pedido = response.data;
        criatelaDialogo("divflexvertical",` Atualizou o pedido ${tagpedido.id}!`,1);
    }
    else{
        
        response = await gravardadospedido(objneworder, 1 ); //criar um novo
        pedido = response.data;
        criatelaDialogo("divflexvertical",` O pedido ${pedido.id} foi gerado!`,1);
    }
    document.location = `/pedido/${pedido.id}`;
}   
export { gestaopedido_registrarnovopedido }