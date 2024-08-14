import validator from "validator";
import axiosconfig from "../../../../config/axiosConfig";
import axios from "axios";
//import axios from "axios";
export default class ValidUsuario{
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
        this.email = this.form.querySelector('input[name="email"]');
        this.senha = this.form.querySelector('input[name="senha"]');
        this.perfil = this.form.querySelector('input[name="perfil"]');
        this.nome_erro = this.form.querySelector('span[name="nome"]');
        this.email_erro = this.form.querySelector('span[name="email"]');
        this.senha_erro = this.form.querySelector('span[name="senha"]');
        this.perfil_erro = this.form.querySelector('span[name="perfil"]');
        this.erros_erro = this.form.querySelector('div[name="erros"]');
    }
    
    cleanFieldsErrors(){
        this.nome_erro.innerText="";
        this.email_erro.innerText="";
        this.senha_erro.innerText="";
        this.perfil_erro.innerText="";
        this.erros_erro.innerText="";
    }

    events()
    {
        this.form.addEventListener('submit',
        (e)=>{
            e.preventDefault();            
            if(this.validadata() == false) {
                return;
            }
            const request = axios.create(axiosconfig.configbroswer());
            request.post('http://localhost:3006/usuario/',{
                "nome":`${this.nome.value}`,  
                "email":`${this.email.value}`, 
                "senha":`${this.senha.value}`,
                "perfil":`${this.perfil.value}` 
            })
            .then(()=>{
                //location.href = "/login"
                this.form.submit();
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
        this.cleanFields();
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
        if(this.senha.value.length < 1 )
        {
            this.senha_erro.innerText = "Preencha a senha."
            this.errorsvalid += 1;
        }
        if(this.perfil.value.length < 1 )
        {
            this.perfil_erro.innerText = "Preencha o perfil."
            this.errorsvalid += 1;
        }
        if(this.errorsvalid > 0)
            return false;
        return true; 
    }
}
