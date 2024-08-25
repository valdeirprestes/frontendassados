import validator from "validator";
import axiosconfig from "../../../../../config/axiosConfig";
import axios from "axios";
//import axios from "axios";
export default class ValidCategoria{
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
        this.nome = this.form.querySelector('input[name="nome"]');
        this.nome_erro = this.form.querySelector('span[name="nome"]');
        this.erros_erro = this.form.querySelector('span[name="erros"]');
    }
    
    cleanFieldsErrors(){
        this.nome_erro.innerText="";
        this.erros_erro.innerText="";
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
            axios.post('/api',
            {
                data:{
                "rota":'categorias',
                 parametros:{
                    "nome":`${this.nome.value}`
                }
            }})
            .then(()=>{
                //location.href = "/login"
                this.form.submit();
            })
            .catch(error=>{
                console.log(error.response.data);
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
        }
        if(this.errorsvalid > 0)
            return false;
        return true; 
    }
}
