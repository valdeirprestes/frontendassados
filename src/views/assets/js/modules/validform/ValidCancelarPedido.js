import validator from "validator";
import axiosconfig from "../../../../../config/axiosConfig";
import axios from "axios";

export default class ValidCancelarPedido{
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
            axios.post('/api', 
                {data:            
                    {
                        rota:`/pedido/${this.id.value}/cancelar`,
                        parametros:
                        {
                            
                        }
                    }
                }
            )
            .then(()=>{
                this.form.submit();
            })
            .catch(error=>{
                location.href = "/notfound404"
            });
            e.preventDefault();
        });
    }
}
