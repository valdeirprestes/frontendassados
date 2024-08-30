import validator from "validator";
//import axiosconfig from "../../../../config/axiosConfig";
import axios from "axios";
//import axios from "axios";
import criatelaDialogo from "../utils/criatelaDialogo";
export default class ValidMovimentoAbertura_formdata{
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
        this.dataescolhida = this.form.querySelector('input[name="movimento_data"]');
    }
    cleanFields(){

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
            this.form.submit();    
        });
        
    }


    validadata()
    {
        console.log("Iniciou a validação");
        if(this.dataescolhida.value.length < 1 || !validator.isDate(this.dataescolhida.value) )
        {
            criatelaDialogo("contents", `Preencha uma data`, -1);
            return false;
        }
        return true; 
    }
}