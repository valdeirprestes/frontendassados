import axios from "axios";
import { AxiosRequestConfig } from "axios";
class InterecaoEventoDivInput{
    constructor (config){
        this.config = config;
        this.divbusca = null;
        this.inputid = null;
        this.inputbusca = null;
        this.divtable = null;
        this.labelbusca = null;
        this.mytable = null;
        //console.log(this.config.className);
        this.mainDiv = document.querySelector(`.${this.config.className}`);
    }


    init(){
        //console.log(this.mainDiv);
        if(!this.mainDiv)
            return;
        this.criabusca();
        this.eventos();
    }


    criabusca(){
        //console.log("Criando busca")
        this.divbusca = document.createElement("div");
        this.divbusca.classList.add('divbusca');
        this.mainDiv.appendChild(this.divbusca);
        this.labelbusca = document.createElement("label");
        this.labelbusca.classList.add("labelbusca");
        //console.log(this.labelbusca);
        this.labelbusca.innerText = this.config.labelbuscar || "Buscar";
        this.inputbusca = document.createElement("input");
        this.inputbusca.classList.add("inputbusca");
        this.divbusca.appendChild(this.labelbusca);
        this.divbusca.appendChild(this.inputbusca);

    }


    criadivtabela(){
        this.divtable = document.createElement("div");
        this.divtable.classList.add('divtabela');
        this.mainDiv.appendChild(this.divtable);
    }


    eventos(){
        //console.log(this.inputbusca);
        
        if(this.inputbusca)
            this.inputbusca.addEventListener('keyup',e => this.criardivtableporparametros());
        
    }

    async criardivtableporparametros ( event){
        let rota = this.config.axios.rota_contagem;
        let parametros = {};
        for(let i=0; i < this.config.axios.filtragemestatica.length ; i++){
            parametros = {...parametros, 
                [this.config.axios.filtragemestatica[i].campo]:[this.config.axios.filtragemestatica[i].valor]}
        }
        
        let metodo = this.config.axios.metodo_contagem;
        let response;
        if( metodo == "post"){
            response = await axios.post('/api', {data:{ "rota":rota, "parametros":parametros}});
        }
        else if(metodo == "get" ){
            response = await axios.get('/api', {
                params: 
                {
                    data:{ "rota":rota, "parametros": parametros}
                }
            });
        }
        else if(metodo == "put" ){
            response = await axios.put('/api', {data:{ "rota":rota, "parametros": parametros}});
        }
        else if(metodo == "delete" ){
            response = await axios.delete('/api', {data:{ "rota":rota, "parametros": parametros}});
        }
        let {quantidade} = response.data;
        //console.log('quantidade', quantidade);
        if(!this.divtable)
            this.criadivtabela();
        else if(this.table)
            this.table.remove();
        if(this.config.tabelacabecalho.length > 0 && this.inputbusca.value.length > 0){
            this.table = document.createElement("table");
            this.table.classList.add('tabela');
            this.divtable.appendChild(this.table);
            if(this.config.tabelacabecalho.length > 0){
                let tr = document.createElement("tr");
                let th;
                for (let i= 0 ; i < this.config.tabelacabecalho.length; i++){
                    th = document.createElement("th");
                    //tr.classList.add('trstyle');
                    th.innerText = this.config.tabelacabecalho[i];
                    tr.appendChild(th);
                };
                th = document.createElement("th");
                th.innerText = ""
                tr.appendChild(th);
                this.table.appendChild(tr);
            }

        }
        if(quantidade > 0 ){
            rota = this.config.axios.rota_dados;
            metodo = this.config.axios.metodo_dados;
            for(let i=0; i < this.config.tabeladados.length; i++){
                parametros = {...parametros, [this.config.tabeladados[i]]:this.inputbusca.value}
            }
            if( metodo == "post"){
                response = await axios.post('/api', {data:{ "rota":rota, "parametros":parametros}});
            }
            else if(metodo == "get" ){
                response = await axios.get('/api',{
                    params: {
                        data: { "rota":rota, "parametros": parametros}
                    }
                });
                //response = await axios.get({ AxiosRequestConfig:{data: { "rota":rota, "parametros": parametros} }});
            }
            else if(metodo == "put" ){
                response = await axios.put('/api', {data:{ "rota":rota, "parametros": parametros}});
            }
            else if(metodo == "delete" ){
                response = await axios.delete('/api', {data:{ "rota":rota, "parametros": parametros}});
            }
            
            if(response.data){
                let usuario;
                let key;
                for(let i = 0 ; i < response.data.length; i++){
                    let tr = document.createElement("tr");
                    usuario = response.data[i];
                    let td;
                    for(let j = 0 ; j < this.config.tabeladados.length; j++){
                        td = document.createElement("td");
                        //tr.classList.add('trstyle');
                        key = this.config.tabeladados[j];
                        td.innerText = usuario[key];
                        tr.appendChild(td);
                    }
                    td = document.createElement("td");
                    td.innerText = "Link"
                    tr.appendChild(td);
                    this.table.appendChild(tr);
                }
                
            }

        }


    }


}

export default InterecaoEventoDivInput;
