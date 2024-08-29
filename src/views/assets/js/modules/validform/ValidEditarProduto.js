import validator from "validator";
import axiosconfig from "../../../../../config/axiosConfig";
import axios from "axios";
//import axios from "axios";
export default class ValidEditarProduto{
    constructor(className){
        this.classForm =  className;
        this.form = document.querySelector(className);
        
        this.errorsvalid = 0;
    }

    init()
    {
        if(!this.form)
        { 
            return;
        }
        this.getAtributes();
	    this.cleanFieldsErrors();
        this.events();
    }

    getAtributes(){
        this.id = this.form.querySelector('input[name="id"]');
        this.nome = this.form.querySelector('input[name="nome"]');
        this.preco = this.form.querySelector('input[name="preco"]');
        this.unidade_parcial = this.form.querySelector('select[name="unidade_parcial"]');
        this.categoria = this.form.querySelector('select[name="categoria"]');
        this.fechamento = this.form.querySelector('select[name="fechamento"]');
        this.nome_erro = this.form.querySelector('span[name="nome"]');
        this.preco_erro = this.form.querySelector('span[name="preco"]');
        this.categoria_erro = this.form.querySelector('span[name="categoria"]');
        this.fechamento_erro = this.form.querySelector('span[name="fechamento"]');
        this.erros_erro = this.form.querySelector('span[name="erros"]');
    }
    
    cleanFieldsErrors(){
        this.nome_erro.innerText="";
        this.preco_erro.innerText="";
        this.errorsvalid = [];
    }

    events()
    {
        this.form.addEventListener('submit',
        (e)=>{
            e.preventDefault();
            this.cleanFieldsErrors();      
            if(this.validadata() == false) {
                return;
            }
            
            let precocorrigido = this.preco.value;
            precocorrigido = precocorrigido.replace(/,/g, '.');

            axios.put('/api',
                {data:            
                    {
                        rota:`/produto/${this.id.value}`,
                        parametros:
                        {
                            "nome":`${this.nome.value}`,  
                            "preco":`${precocorrigido}`, 
                            "idcategoria":`${this.categoria.value}`,
                            "item_fechamento":`${this.fechamento.value}`,
                            "unidade_parcial": `${this.unidade_parcial.value}`
                        }
                    }
                }
            )
            .then(()=>{
                location.reload();
                //this.form.submit();
            })
            .catch(error=>{
                console.log(error);
                let {errors} = error.response.data;
                errors.forEach(element => {
                    this.erros_erro.innerHTML += element + "<br>"; 
                });
            });
            e.preventDefault();
        });
    }


    validadata()
    {
        if(this.nome.value.length < 1 )
            {
                this.nome_erro.innerText = "Preencha o nome."
                this.errorsvalid += 1;
                console.log("a")
            }
            if(this.preco.value.length < 1)
            {
                this.errorsvalid += 1;
                this.preco_erro.innerText = "Preço inválido."
            }
            if(this.categoria.value.length < 1 )
            {
                this.categoria_erro.innerText = "Preencha a categoria."
                this.errorsvalid += 1;
            }
            if(this.errorsvalid > 0)
                return false;
        return true;  
    }
}
