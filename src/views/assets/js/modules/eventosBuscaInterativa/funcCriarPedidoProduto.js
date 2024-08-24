function somaproduto(){

}
function subtraiproduto(){

}
function alterapreco(){

}



async function getProduct(id){
    const rota = `/produto/${id}`;
    const parametros = {};
    const response = await axios.post('api',{params: {
        data: { "rota":rota, "parametros": parametros}
    }});
    return response;
}


function verificaProdutonaLista(num){
    let lista = document.getElementsByClassName("idlistproduto_criarpedido");
    if(!lista) return false;
    let cont = 0 ;
    for (let i =0; i < lista.length; i++){
        if(num == lista[i].innerText) return true;
    }
}

async function funcCriarPedidoProduto(config){
    let divlistaproduto_criarpedido = document.querySelector(".divlistaproduto_criarpedido");
    let ultimoproduto_criarpedido = document.querySelector(".ultimoproduto_criarpedido");
    let produtoselecionado_criarpedido = document.querySelector(".produtoselecionado_criarpedido");
    let tableproduto_criarpedido = document.querySelector(".tablelistaproduto_criarpedido");
    if(!divlistaproduto_criarpedido ){
        console.log("A classe divlistaproduto_criarpedido não foi encontrada")
        return;
    }
    if(!produtoselecionado_criarpedido){
        console.log("A classe produtoselecionado_criarpedido não foi encontrada")
        return;
    }
    if(!ultimoproduto_criarpedido ){
        console.log("A classe ultimoproduto_criarpedido não foi encontrada")
        return;
    }
    
    if(produtoselecionado_criarpedido.value != ultimoproduto_criarpedido.value)
    {
        ultimoproduto_criarpedido.value = produtoselecionado_criarpedido.value;
        console.log("Alterou produto");
        if(verificaProdutonaLista(produtoselecionado_criarpedido.value) == true) return;
        if(!tableproduto_criarpedido){
            tableproduto_criarpedido = document.createElement("table");
            tableproduto_criarpedido.classList.add("tablelistaproduto_criarpedido");
            divlistaproduto_criarpedido.appendChild(tableproduto_criarpedido);
        }
        
        const response = await getProduct();
        if(!response){
            console.log(`Error, produto id ${produtoselecionado_criarpedido.value}não encontrado` );
            return;
        }

        let tagtr, tagtd,taglink, tagimg, taglabel, taginput;
        tagtr = document.createElement("tr");
        tableproduto_criarpedido.appendChild(tagtr);
        
        tagtd = document.createElement('td');
        tagtd.classList.add("idlistproduto_criarpedido");
        tagtd.innerText = produtoselecionado_criarpedido.value;
        tagtr.appendChild(tagtd);

        tagtd = document.createElement('td');
        tagtd.classList.add("");
        taglink = document.createElement("a");
        taglink.href = "#";
        tagtr.appendChild(tagtd);
        tagtr.appendChild(tagtd);

        tagtd = document.createElement('td');
        tagtd.classList.add("");
        taginput = document.createElement("input");
        taginput.value = response.data.preco;
        tagtr.appendChild(tagtd);

        tagtd = document.createElement('td');
        tagtd.classList.add("");
        taglink = document.createElement("a");
        taglink.href = "#";
        tagtr.appendChild(taglink);

        tagtd = document.createElement('td');
        tagtd.classList.add("");
        tagimg = document.createElement("img");
        tagimg.src= response.data.url;
        tagtr.appendChild(tagtd);
        
        tagtd = document.createElement('td');
        tagtd.classList.add("");
        taginput = document.createElement("input");
        taginput.value = response.data.preco;
        tagtr.appendChild(tagtd);

        tagtd = document.createElement('td');
        tagtd.classList.add("");
        tagtd.innerText = produtoselecionado_criarpedido.value;
        tagtr.appendChild(tagtd);

        tagtd = document.createElement('td');
        tagtd.classList.add("");
        tagtd.innerText = produtoselecionado_criarpedido.value;
        tagtr.appendChild(tagtd);

    }
    
    
}

export default funcCriarPedidoProduto;