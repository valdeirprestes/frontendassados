import axios from "axios";
import gestaopedido_SomaSubtotal from "../../pagefunctions/gestaopedido_SomaSubtotal";

async function getProduct(id){
    const rota = `/produto/${id}`;
    const parametros = {};
    const response = await axios.get('/api',{
        params: {
            data: { "rota":rota, "parametros": parametros}
        }})
    ;
    return response;
}


function verificaProdutonaLista(num){
    let lista = document.getElementsByClassName("idlistproduto_criarpedido");
    if(!lista) return false;
    
    for (let i =0; i < lista.length; i++){
        if(num == lista[i].innerText) return true;
    }
    return false;
}

function removeElementclass(classname){
    let element = document.querySelector(`.${classname}`);
    if(!element){
        console.log(`Elemento de id classe ${classname} não foi encontrado`);
        return;
    }
    element.remove();
    gestaopedido_SomaSubtotal();
}


    
function atualizarPreco(classqtd, classpreco, classsubtotal, unidade_parcial){
    let qtd = document.querySelector(`.${classqtd}`);
    let preco = document.querySelector(`.${classpreco}`);
    let subtotal = document.querySelector(`.${classsubtotal}`);
    if(!qtd){
        console.log(` Não consegui acessar ${classqtd}`);
        return;
    }
    if(!preco){
        console.log(` Não consegui acessar ${preco}`);
        return;
    }
    if(!subtotal){
        console.log(` Não consegui acessar ${subtotal}`);
        return;
    }
    let valor = qtd.value;
    qtd.value = unidade_parcial? valor.replace(",","."): parseInt(valor);
    
    
    valor = preco.value;
    preco.value = valor.replace(",",".");
    subtotal.value =  (parseFloat(qtd.value) * parseFloat(preco.value)).toFixed(2);
    gestaopedido_SomaSubtotal();
}

async function addIdTable(id){
        let divlistaproduto_criarpedido = document.querySelector(".divlistaproduto_criarpedido");
        
        let produtoselecionado_criarpedido = document.querySelector(".produtoselecionado_criarpedido");
        
        if(!divlistaproduto_criarpedido ){
            console.log("A classe divlistaproduto_criarpedido não foi encontrada")
            return;
        }
        if(!produtoselecionado_criarpedido){
            console.log("A classe produtoselecionado_criarpedido não foi encontrada")
            return;
        }

        
        if(verificaProdutonaLista(id) == true) return;
        
        const response = await getProduct(id);
        if(!response){
            console.log(`Error, produto id ${id}não encontrado` );
            return;
        }
        
        let  tagtr, tagtd, tagimg, taglinkremove;
        let tagtable = document.querySelector(".tabelaproduto_criapedido");
        if(!tagtable){
            tagtable = document.createElement("table");
            tagtable.classList.add("tabelaproduto_criapedido");
            /*tagtable.classList.add("tabelas");*/
            divlistaproduto_criarpedido.appendChild(tagtable);
            let lista = ["-","Qtd.", "img", "Produto", "Preço", "Subtotal"];
            let tagth;
            tagtr = document.createElement("tr");
            tagtable.appendChild(tagtr);
            for(let i=0 ; i < lista.length; i++)
            {
                tagth = document.createElement("th");
                tagth.innerText = lista[i];
                tagtr.appendChild(tagth);
            }
        }

        tagtr = document.createElement("tr");
        tagtr.classList.add(`tr${id}`);
        tagtable.appendChild(tagtr);

        let taginput1, taginput2, taginput3;

        tagtd = document.createElement("td");
        taglinkremove = document.createElement("a");
        taglinkremove.href = "#"
        taglinkremove.innerText="-";
        taglinkremove.classList.add("botaomenos");
        tagtd.appendChild(taglinkremove);
        tagtr.appendChild(tagtd);

        tagtd = document.createElement("td");
        tagtd.classList.add(`produto${id}`);
        tagtd.classList.add(`registroproduto`);
        tagtd.classList.add("idlistproduto_criarpedido");
        tagtd.classList.add('elementoinvisivel');
        tagtd.innerText = id;
        tagtr.appendChild(tagtd);
              

        tagtd = document.createElement("td");
        taginput1 = document.createElement("input");
        taginput1.value = 1;
        taginput1.classList.add("inputqtd");
        taginput1.classList.add("inputtam");
        taginput1.classList.add(`input_qtd${id}`);
        tagtd.appendChild(taginput1);
        tagtr.appendChild(tagtd);
        
        tagtd = document.createElement("td");
        tagimg = document.createElement("img");
        tagimg.src= response.data.url;
        tagimg.classList.add("img_criarpedido");
        tagtd.appendChild(tagimg);
        tagtr.appendChild(tagtd);
        

        tagtd = document.createElement("td");
        tagtd.innerText = response.data.nome;
        tagtr.appendChild(tagtd);


        tagtd = document.createElement("td");
        taginput2 = document.createElement("input");
        taginput2.classList.add("inputtam");
        taginput2.classList.add(`input_preco${id}`);
        taginput2.value = response.data.preco;
        tagtd.appendChild(taginput2);
        tagtr.appendChild(tagtd);

        tagtd = document.createElement("td");
        taginput3 = document.createElement("input");
        taginput3.classList.add("inputtam");
        taginput3.classList.add(`input_subtotal${id}`);
        taginput3.readOnly = true;
        taginput3.value = response.data.preco;
        tagtd.appendChild(taginput3);
        tagtr.appendChild(tagtd);
        let unidade_parcial = (response.data.unidade_parcial == "SIM")? true: false;
        taginput1.onkeyup = ()=> atualizarPreco(
            `input_qtd${id}`,
            `input_preco${id}`,
            `input_subtotal${id}`,
             unidade_parcial);
        taginput2.onkeyup = ()=> atualizarPreco(
            `input_qtd${id}`,
            `input_preco${id}`,
            `input_subtotal${id}`,
             unidade_parcial);
        taglinkremove.onclick = ()=> removeElementclass(`tr${id}`);
        gestaopedido_SomaSubtotal();
}

async function funcCriarPedidoProduto(config){
    let divlistaproduto_criarpedido = document.querySelector(".divlistaproduto_criarpedido");
    let produtoselecionado_criarpedido = document.querySelector(".produtoselecionado_criarpedido");
    //let tableproduto_criarpedido = document.querySelector(".tablelistaproduto_criarpedido");
    if(!divlistaproduto_criarpedido ){
        console.log("A classe divlistaproduto_criarpedido não foi encontrada")
        return;
    }
    if(!produtoselecionado_criarpedido){
        console.log("A classe produtoselecionado_criarpedido não foi encontrada")
        return;
    }

    let string = produtoselecionado_criarpedido.value;
    let lista = string.split(",");
    for(let i = 0 ; i< lista.length; i++)
    {
        addIdTable(lista[i]);
    }  
    gestaopedido_SomaSubtotal();
}

export default funcCriarPedidoProduto;