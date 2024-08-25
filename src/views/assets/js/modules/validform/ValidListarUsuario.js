import validator from "validator";
import axiosconfig from "../../../../../config/axiosConfig";
import axios from "axios";
//import axios from "axios";
export default class ValidListarUsuario{
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
    }
    
    cleanFieldsErrors(){
    }

    events()
    {
        this.form.addEventListener('submit',
        (e)=>{
            //e.preventDefatult();
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
