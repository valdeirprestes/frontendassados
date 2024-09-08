import axios from "axios";

async function dadosdoestoque(idproduto){
    try {
        const rota = "/estoque/saldo";
        const parametros = {"idproduto":idproduto};
        console.log("rota", rota, "parametros", parametros);
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

async function dadosdoproduto(idproduto){
    try {
        const rota = "/produto/" + idproduto;
        const parametros = {idproduto};
        console.log("rota", rota, "parametros", parametros);
        const request = await axios.get("/api", {
            params: {
                data: { "rota":rota, "parametros": parametros}
            }});
        return request.data;
        
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
    console.log("idproduto", idproduto.value);
    const dados = await dadosdoproduto(idproduto.value);
    console.log("dados", dados);
    const estoque = await dadosdoestoque(idproduto.value);
    console.log("estoque", estoque);
    tagproduto.value = dados.nome;
    if(!estoque)
        tagestoqueatual.value = 0
    else
        tagestoqueatual.value = (estoque.sub_entrada - estoque.sub_saida).toFixed(2);
    tagitemfechamento.value = dados.item_fechamento;
    tagitemparcial.value = dados.unidade_parcial;
    tagcategoria.value = dados.categoria.nome;

    
}