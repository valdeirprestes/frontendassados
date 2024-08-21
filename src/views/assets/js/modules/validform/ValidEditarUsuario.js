import validator from "validator";
import axiosconfig from "../../../../../config/axiosConfig";
import axios from "axios";
//import axios from "axios";
export default class ValidEditarUsuario{
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
        this.email = this.form.querySelector('input[name="email"]');
        this.telefone = this.form.querySelector('input[name="telefone"]');
        this.cep = this.form.querySelector('input[name="cep"]');
        this.endereco = this.form.querySelector('input[name="endereco"]');
        this.numero = this.form.querySelector('input[name="numero"]');
        this.cidade = this.form.querySelector('input[name="cidade"]');
        this.uf = this.form.querySelector('input[name="uf"]');
        this.nome_erro = this.form.querySelector('span[name="nome"]');
        this.email_erro = this.form.querySelector('span[name="email"]');
        this.telefone_erro = this.form.querySelector('span[name="telefone"]');
        this.cep_erro = this.form.querySelector('span[name="cep"]');
        this.endereco_erro = this.form.querySelector('span[name="endereco"]');
        this.numero_erro = this.form.querySelector('span[name="numero"]');
        this.cidade_erro = this.form.querySelector('span[name="cidade"]');
        this.uf_erro = this.form.querySelector('span[name="uf"]');
        this.erros_erro = this.form.querySelector('span[name="erros"]');
    }
    
    cleanFieldsErrors(){
        this.nome_erro.innerText="";
        this.email_erro.innerText="";
        this.telefone_erro.innerText="";
        this.cep_erro.innerText="";
        this.endereco_erro.innerText="";
        this.numero_erro.innerText="";
        this.cidade_erro.innerText="";
        this.uf_erro.innerText="";
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
            axios.put('/api',
                {data:            
                    {
                        rota:`/usuario/${this.id.value}`,
                        parametros:
                        {
                            "nome":`${this.nome.value}`,  
                            "email":`${this.email.value}`, 
                            "telefone":`${this.telefone.value}`,
                            "cep":`${this.cep.value}`,
                            "logradouro":`${this.endereco.value}`,
                            "numero":`${this.numero.value}`,
                            "municipio":`${this.cidade.value}`,
                            "uf":`${this.uf.value}`,
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
        }
        if(this.email.value.length < 1 || !validator.isEmail(this.email.value))
        {
            this.errorsvalid += 1;
            this.email_erro.innerText = "Email inválido."
        }
        if(this.errorsvalid > 0)
            return false;
        return true; 
    }
}
