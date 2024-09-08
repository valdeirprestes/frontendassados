import criatelaDialogo from "../utils/criatelaDialogo";
import axios from "axios";


async function  adicionarEstoque(){
    const rota="";
    const parametros = {};
    const request = await axios.post()

}

async function  estornarEstoque(){
    console.log("estornar");

}


function estoque_processar(){
    const tagproduto = document.querySelector('.telaestoque_produtoid');
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
        criatelaDialogo("contents", `Escolha um produto`, -1);
        return;
    }
    if(tagquantidade.value <= 0){
        criatelaDialogo("contents", `Valor tem que ser maior que zero`, -1);
        return;
    }
    if(tagdescricao.value.length < 1)
    {
        criatelaDialogo("contents", `Coloque uma descrição`, -1);
        return;
    }
    if(tagopcao.value == "adicionar")
        adicionarEstoque();
    else
        estornarEstoque();



}

export {estoque_processar};