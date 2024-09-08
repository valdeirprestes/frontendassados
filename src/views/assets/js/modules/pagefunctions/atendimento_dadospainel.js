import axios from "axios";
const prefix_item = "jsitem_";
const prefix_item_nome = "js_atendimento_nome_";
const prefix_item_estoque = "js_atendimento_saldo_estoque_";
const prefix_item_totalpedido = "js_atendimento_total_pedido_";
const prefix_item_saldo = "js_atendimento_saldo_";
const class_atendimento_movimento = 'jsatendimento_campo_movimento_filtro';
const class_atendimento_qtd_items= "jsatendimento_qtd_items";
const class_atendimento_div_produto = "jsatendimento_produto";
const class_div_produtos = 'jsatendimento_itens_fechamento';
const class_atendimento_label_span_item= "atendimento_label_span_item";

const class_positivo = "atendimento_item_saldo_positivo";
const class_negativo = "atendimento_item_saldo_negativo";


class ClassItem{
    constructor(id){
        this.item = null;
        this.item_nome = null;
        this.item_estoque = null;
        this.item_totalpedido = null;
        this.item_saldo = null;
        this.item = document.querySelector(`.${prefix_item}${id}`);
        if(!this.item)
        {
            this.criaestrutura(id);
        }
        
        this.conectar(id);
        return this;
    }
    criaestrutura(id)
    {
        let tagdivprodutos = document.querySelector(`.${class_div_produtos}`);
        if(!tagdivprodutos)
        {
            console.log(`Não conseguiu acessar a classe ${class_div_produtos}`);
            return;
        }
        
        let tagdivproduto = document.createElement("div");
        tagdivproduto.classList.add('atendimento_produto');
        tagdivproduto.classList.add('jsatendimento_produto');
        tagdivproduto.classList.add(`${prefix_item}${id}`);
        tagdivprodutos.appendChild(tagdivproduto);
        

        let taglabelspanitem = document.createElement("div");
        taglabelspanitem.classList.add(class_atendimento_label_span_item);
        tagdivproduto.appendChild(taglabelspanitem);
        let taglabel = document.createElement('label');
        taglabel.innerText = "Produto:";
        taglabelspanitem.appendChild(taglabel);
        let tagspan = document.createElement('span');
        tagspan.classList.add(`${prefix_item_nome}${id}`);
        taglabelspanitem.appendChild(tagspan);

        taglabelspanitem = document.createElement("div");
        taglabelspanitem.classList.add(class_atendimento_label_span_item);
        tagdivproduto.appendChild(taglabelspanitem);
        taglabel = document.createElement('label');
        taglabel.innerText = "Estoque:";
        taglabelspanitem.appendChild(taglabel);
        tagspan = document.createElement('span');
        tagspan.classList.add(`${prefix_item_estoque}${id}`);
        taglabelspanitem.appendChild(tagspan);

        taglabelspanitem = document.createElement("div");
        taglabelspanitem.classList.add(class_atendimento_label_span_item);
        tagdivproduto.appendChild(taglabelspanitem);
        taglabel = document.createElement('label');
        taglabel.innerText = "Qtd p/ pedidos:";
        taglabelspanitem.appendChild(taglabel);
        tagspan = document.createElement('span');
        tagspan.classList.add(`${prefix_item_totalpedido}${id}`);
        taglabelspanitem.appendChild(tagspan);

        taglabelspanitem = document.createElement("div");
        taglabelspanitem.classList.add(class_atendimento_label_span_item);
        tagdivproduto.appendChild(taglabelspanitem);
        taglabel = document.createElement('label');
        taglabel.innerText = "Saldo:";
        taglabelspanitem.appendChild(taglabel);
        tagspan = document.createElement('span');
        tagspan.classList.add(`js_atendimento_saldo_${id}`);
        taglabelspanitem.appendChild(tagspan);
    }
    conectar(id)
    {
        this.item = document.querySelector(`.${prefix_item}${id}`);
        if(!this.item)
        {
            console.log(`Não conseguiu acessar a classe ${prefix_item}${id}`);
            return;
        }
        this.item_nome = document.querySelector(`.${prefix_item_nome}${id}`);
        if(!this.item_nome)
        {
            console.log(`Não conseguiu acessar a classe ${prefix_item_nome}${id}`);
            return;
        }
        this.item_estoque = document.querySelector(`.${prefix_item_estoque}${id}`);
        if(!this.item_estoque)
        {
            console.log(`Não conseguiu acessar a classe ${prefix_item_estoque}${id}`);
            return;
        }
        this.item_totalpedido = document.querySelector(`.${prefix_item_totalpedido}${id}`);
        if(!this.item_totalpedido)
        {
            console.log(`Não conseguiu acessar a classe ${prefix_item_totalpedido}${id}`);
            return;
        }
        this.item_saldo = document.querySelector(`.${prefix_item_saldo}${id}`);
        if(!this.item_saldo)
        {
            console.log(`Não conseguiu acessar a classe ${prefix_item_saldo}${id}`);
            return;
        }
    }
    removePositivoNegativo(){
        if(!this.item)
        {
            console.log(`Não conseguiu acessar a classe ${prefix_item}${id}`);
            return;
        }
        
        for (let i = 0; i < this.item.classList.length; i++ )
        {
            if(this.item.classList[i] == class_negativo )
            {
                this.item.classList.remove(class_negativo);
                --i;
            }
            else if(this.item.classList[i] == class_positivo)
            {
                this.item.classList.remove(class_positivo);
                --i;
            }
        }


    }
    setPositivo(){
        if(!this.item)
        {
            console.log(`Não conseguiu acessar a classe ${prefix_item}${id}`);
            return;
        }
        this.removePositivoNegativo();
        this.item.classList.add(class_positivo);
    }
    setNegativo(){
        if(!this.item)
        {
            console.log(`Não conseguiu acessar a classe ${prefix_item}${id}`);
            return;
        }
        this.removePositivoNegativo();
        this.item.classList.add(class_negativo);
    }
}

function removeProdutositens(){
    const div_produto = document.getElementsByClassName(class_atendimento_div_produto);
    if(!div_produto)
    {
        console.log(`Não conseguiu acessar a classe ${class_atendimento_div_produto}`);
        return;
    }
    if(div_produto.length < 1)
        return;
    
    while(div_produto.length>0)
        div_produto[0].remove();
}

async function atualizarestoque(){
    try {
        const spanqtditem = document.querySelector(`.${class_atendimento_qtd_items}`);
        if(!spanqtditem){
            console.log(`Erro, não conseguiu acessar a varíavel ${class_atendimento_qtd_items}`);
            return;
        }
        const spanmovimento = document.querySelector(`.${class_atendimento_movimento}`);
        if(!spanmovimento)
        {
            console.log(`Erro, não conseguiu acessar a variável ${class_atendimento_movimento}`);
            return;
        }
        removeProdutositens();
        spanqtditem.innerText = 0;
        const rota = "/estoque/saldo";
        let parametros = {"estado":"NORMAL"};
        //parametros = { ...parametros, "datamovimento":spanmovimento.innerText};
        const dados = {data:{"rota":rota, "parametros":parametros} };
        const request = await axios.post("/api",dados);
        request.data.forEach(itemestoque => {
            
            if(itemestoque.produto.item_fechamento == "SIM")
            {
                let newitem = new ClassItem(itemestoque.produto.id);
                newitem.item_nome.innerText = itemestoque.produto.nome;
                newitem.item_estoque.innerText = (parseFloat(itemestoque.sub_entrada) - parseFloat(itemestoque.sub_saida)).toFixed(2); 
                newitem.item_totalpedido.innerText = 0;
                let saldo = newitem.item_estoque.innerText - newitem.item_totalpedido.innerText;
                newitem.item_saldo.innerText = saldo
                if(saldo < 0 )
                {
                    newitem.setNegativo();
                }else
                {
                    newitem.setPositivo();
                }
            }
            
        });
        
    } catch (e) {
        console.log(e);
        
    }

}

async function atualizarprodudosdepedidos(){
    try {
        const spanqtditem = document.querySelector(`.${class_atendimento_qtd_items}`);
        if(!spanqtditem){
            console.log(`Erro, não conseguiu acessar a varíavel ${class_atendimento_qtd_items}`);
            return;
        }
        const spanmovimento = document.querySelector(`.${class_atendimento_movimento}`);
        if(!spanmovimento)
        {
            console.log(`Erro, não conseguiu acessar a variável ${class_atendimento_movimento}`);
            return;
        }
        const rota = "/pedido/somaitemproduto";
        let parametros = {"estado":"NORMAL"};
        parametros = { ...parametros, "datamovimento":spanmovimento.innerText};
        const dados = {data:{"rota":rota, "parametros":parametros} };
        const request = await axios.post("/api",dados);
        
        let {itens } = request.data[0];
        if(!itens) return;
        itens.forEach(itensdepedido => {
            
            if(itensdepedido.produto.item_fechamento == "SIM")
            {
                let newitem = new ClassItem(itensdepedido.idproduto);
                newitem.item_totalpedido.innerText = itensdepedido.sub_quantidade;
                let saldo = newitem.item_estoque.innerText - newitem.item_totalpedido.innerText;
                newitem.item_saldo.innerText = saldo
                if(saldo < 0 )
                {
                    newitem.setNegativo();
                }else
                {
                    newitem.setPositivo();
                }
            }
            
        });
        
    } catch (e) {
        console.log(e);
    }
}

function atendimento_atualizarpainel(){
    atualizarestoque();
    atualizarprodudosdepedidos();
}

export {atendimento_atualizarpainel};