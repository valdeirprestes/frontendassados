import validator from "validator";
import axiosconfig from "../../../../config/axiosConfig";
import axios from "axios";

export default class ValidDesativarUsuario{
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
    }
    
    cleanFieldsErrors(){
    }

    events()
    {
        this.form.addEventListener('submit',
        (e)=>{
            e.preventDefault(); 
            /*const request = axios.create(axiosconfig.configbroswer());
            request.put(`/usuario/${this.id.value}`,{   
                "estado":"CANCELADO"
            })*/
            axios.put('/api', 
                {data:            
                    {
                        rota:`/usuario/${this.id.value}`,
                        parametros:
                        {
                            "estado":"CANCELADO"
                        }
                    }
                }
            )
            .then(()=>{
                this.form.submit();
            })
            .catch(error=>{
               // location.href = "/notfound404"
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
