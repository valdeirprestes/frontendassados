class GestaoPedido_carregarpedido{
    constructor(className){
        let spanids = document.querySelector(".produtoselecionado_criarpedido");
        let spanprodparcial = document.querySelector(".produtoselecionadoparcial_criarpedido");
        if(!spanids || !spanprodparcial){
            return;
        }
        try{
            this.listaprodutos_id = null;
            this.listaprodutos_parcial = null;
            this.listaprodutos_id = spanids.innerText.split(",");
            this.listaprodutos_parcial = spanprodparcial.innerText.split(",");
        }catch(e){
            return;
        }
    }
    init(){
        
        if(!this.listaprodutos_id || !this.listaprodutos_parcial) return;
        if(this.listaprodutos_id.length != this.listaprodutos_parcial.length)
            return;
        let menosid,  inputqtd, inputpreco, inputsubtotal;
        for(let i = 0 ; i < this.listaprodutos_id.length ; i++)
        {
            menosid = document.querySelector(`.botaomenos${this.listaprodutos_id[i]}`);
            if(menosid)
                menosid.onclick = ()=> this.removeElementclass(`tr${this.listaprodutos_id[i]}`);

            //atualizarPreco(classqtd, classpreco, classsubtotal, unidade_parcial)
            inputqtd = document.querySelector(`.input_qtd${this.listaprodutos_id[i]}`);
            inputpreco = document.querySelector(`.input_preco${this.listaprodutos_id[i]}`);
            inputsubtotal = document.querySelector(`.input_subtotal${this.listaprodutos_id[i]}`);
            let test = this.listaprodutos_parcial[i] == "SIM" 
            if(inputqtd)
                inputqtd.onkeyup = () => this.atualizarSubtotal(
                    `input_qtd${this.listaprodutos_id[i]}`, 
                    `input_preco${this.listaprodutos_id[i]}`,
                    `input_subtotal${this.listaprodutos_id[i]}`,
                    (this.listaprodutos_parcial[i].trim() =="SIM")?true:false);
            if(inputpreco)
                inputpreco.onkeyup = () => this.atualizarSubtotal(
                    `input_qtd${this.listaprodutos_id[i]}`, 
                    `input_preco${this.listaprodutos_id[i]}`,
                    `input_subtotal${this.listaprodutos_id[i]}`,
                    (this.listaprodutos_parcial[i].trim() =="SIM")?true:false);

        }
        
    }
    removeElementclass(classname){
        let element = document.querySelector(`.${classname}`);
        if(!element){
            console.log(`Elemento de id classe ${classname} não foi encontrado`);
            return;
        }
        element.remove();
    }
    
    atualizarSubtotal( classqtd, classpreco, classsubtotal, unidade_parcial){
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
    }

}


export default GestaoPedido_carregarpedido;