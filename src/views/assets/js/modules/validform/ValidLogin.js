import validator from "validator";
//import axiosconfig from "../../../../config/axiosConfig";
import axios from "axios";
//import axios from "axios";
export default class ValidLogin{
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
        this.events()
    }

    getAtributes(){
        this.email = this.form.querySelector('input[name="email"]');
        this.senha = this.form.querySelector('input[name="senha"]');
        this.email_erro = this.form.querySelector('span[name="email"]');
        this.senha_erro = this.form.querySelector('span[name="senha"]');
        this.backenderros = this.form.querySelector('span[name="backenderros"]');
    }
    cleanFields(){
        this.email_erro.innerText="";
        this.senha_erro.innerText="";
        this.backenderros.innerText="";
        this.errorsvalid= [];
    }

    events()
    {
        this.form.addEventListener('submit',
        (e)=>{
            console.log("Testando login");
            this.cleanFields();
            e.preventDefault();            
            if(this.validadata() == false) {
                return;
            }
            /*
            const request = axios.create(axiosconfig.configbroswer());
            request.post('/token',{   
                "email":`${this.email.value}`, 
                "senha":`${this.senha.value}`
            })*/
            axios.post('/api', {
                data:{
                    rota:`/token`,
                    parametros:{   
                        "email":`${this.email.value}`, 
                        "senha":`${this.senha.value}`
                    }
                }
            })
            .then((res)=>{
                //console.log(res.data.token);
                //let data = {'token': `${res.data.token}`};
                //sessionStorage.setItem('user', JSON.stringify(data));
                this.form.submit();
            })
            .catch(error=>{
                //console.log("Error catch");
                this.backenderros = this.form.querySelector('span[name="backenderros"]');
                const data = error.response.data;
                data.errors.map(
                    err =>{
                        this.backenderros.innerText += err;
                    }
                )
            });
            e.preventDefault();
        });
    }


    validadata()
    {
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
        if(this.errorsvalid > 0)
            return false;
        return true; 
    }
}