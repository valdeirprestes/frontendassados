import criatelaDialogo from "../utils/criatelaDialogo";
import axios from "axios";


const divdialog = "contents"


async function estoque_processar(){
    const tagproduto = document.querySelector('.telaestoque_produtoid');
    let rota = "";
    let parametros={};
    let resquest;

    let taguser = document.querySelector(".iduser");
    if(!taguser)
    {
        console.log(`Não conseguiu acessar classe iduser`);
        return;
    }
    let tagdatamovimento = document.querySelector(".datamovimento");
    if(!tagdatamovimento)
    {
        console.log(`Não conseguiu acessar classe .datamovimento`);
        return;
    }

    
    if(!tagproduto)
    {
        console.log(`Não conseguiu acessar classe telaestoque_produtoid`);
        return;
    }

    const tagdescricao = document.querySelector('.telaestoque_campo_descricao');
    if(!tagdescricao)
    {
        console.log(`Não conseguiu acessar classe telaestoque_campo_descricao`);
        return;
    }

    const tagquantidade = document.querySelector('.telaestoque_campo_valor');
    if(!tagquantidade)
    {
        console.log(`Não conseguiu acessar classe telaestoque_campo_valor`);
        return;
    }
    const tagopcao = document.querySelector('.telaestoque_campo_opcao');
    if(!tagopcao)
    {
        console.log(`Não conseguiu acessar classe telaestoque_campo_opcao`);
        return;
    }
    console.log("estoque_processar");
    if(tagproduto.value < 1){
        criatelaDialogo(divdialog, `Escolha um produto`, -1);
        return;
    }
    if(tagquantidade.value <= 0){
        criatelaDialogo(divdialog, `Valor tem que ser maior que zero`, -1);
        return;
    }
    if(tagdescricao.value.length < 1)
    {
        criatelaDialogo(divdialog, `Coloque uma descrição`, -1);
        return;
    }
    if(tagopcao.value == "adicionar"){
        parametros = {
            "entrada":tagquantidade.value,
            "idproduto":tagproduto.value,
            "descricao":tagdescricao.value,
            "idusuario":taguser.value,
            "datamovimento":tagdatamovimento.value
        };
        resquest = await axios.post("/api", {data:{ "rota": "/estoque/adicionar", "parametros":parametros}});
        criatelaDialogo(divdialog, `Adicição de estoque concluída`, 1);
        tagquantidade.value =0;
        tagdescricao.value= "";

    }      
    else{      
        parametros = {
            "saida":tagquantidade.value,
            "idproduto":tagproduto.value,
            "descricao":tagdescricao.value,
            "idusuario":taguser.value,
            "datamovimento":tagdatamovimento.value
        };
        resquest = await axios.post("/api", {data:{ "rota": "/estoque/remover", "parametros":parametros}});
        criatelaDialogo(divdialog, `Estorno no estoque efetivado`, 1);
        tagquantidade.value =0;
        tagdescricao.value= ""; 
    }
}

export {estoque_processar};