import axios from "axios";

async function dadosdoproduto(idproduto){
    try {
        const rota = "/estoque/saldo";
        const parametros = {"idproduto":idproduto};
        const request = await axios.post("/api", {data:{
            "rota":rota,
            "parametros":parametros
        }});
        return request.data[0];
        
    } catch (e) {
        console.log(e);
        return null;
        
    }

}



export default async function(myconfig){
    const idproduto = document.querySelector(`.telaestoque_produtoid`);
    if(!idproduto){
        console.log("Não foi possível acessar a varável telaestoque_produtoid");
        return;
    }
    const tagproduto = document.querySelector(`.telaestoque_campo_nome`);
    if(!tagproduto)
    {
        console.log("Não conseguiu acessar a classe telaestoque_campo_nome");
        return;
    }
    const tagitemfechamento = document.querySelector(`.telaestoque_campo_itemfechamento`);
    if(!tagitemfechamento)
    {
        console.log("Não conseguiu acessar a classe telaestoque_campo_itemfechamento");
        return;
    }
    const tagitemparcial = document.querySelector(`.telaestoque_campo_unidadeparcial`);
    if(!tagitemparcial)
    {
        console.log("Não conseguiu acessar a classe telaestoque_campo_unidadeparcial");
        return;
    }
    const tagcategoria = document.querySelector(`.telaestoque_campo_category`);
    if(!tagcategoria)
    {
        console.log("Não conseguiu acessar a classe telaestoque_campo_category");
        return;
    }
    const tagestoqueatual = document.querySelector(`.telaestoque_campo_quantidade`);
    if(!tagestoqueatual)
    {
        console.log("Não conseguiu acessar a classe telaestoque_campo_category");
        return;
    }
    const dados = await dadosdoproduto(idproduto.value);
    console.log("dados", dados);
    tagproduto.value = dados.produto.nome;
    tagestoqueatual.value = (dados.sub_entrada - dados.sub_saida).toFixed(2);
    tagitemfechamento.value = dados.produto.item_fechamento;
    tagitemparcial.value = dados.produto.unidade_parcial;
    tagcategoria.value = dados.produto.categoria.nome;
}