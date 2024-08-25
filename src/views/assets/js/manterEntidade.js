import axios from "axios";
class manterEntidade {
    constructor(config){
        this.config = config;
        this.maindiv = document.querySelector(`.${this.config.className}`);
        this.classtagroup = this.config.classtaggroup || "form-group";
        this.classtaginput = this.config.classtaginput || "form-control";
        this.criarDiv();
        this.criaGrupoLer();
    }
    criarDiv(){
        this.divInsert = document.querySelector(`.${this.config.classInsertName}`);
        if(!this.divInsert)
        {    
            this.divInsert = document.createElement("div");
            this.divInsert.classList.add(this.config.classInsertName);
            this.maindiv.appendChild(this.divInsert);
        }
    }
    async criaGrupoLer(){
        if(this.divInsert)
        {
            const response = await this.obtemDados();
            if(response){
                const entidade = response.data;
                if(this.config.campos.length != this.config.apelidos.length ||
                      this.config.campos.length != this.config.tipo.length){
                        console.log(" Atributos campos, apelidos e tipo pode tamanhos diferentes");
                        return;
                }
                let tagGroup, tagspan, taglabel, taginput, testinput;
                for(let i=0 ; i< this.config.campos.length; i++ ){
                    testinput = document.querySelector(`.${this.config.input_className[i]}`);
                    if(testinput){
                        testinput.value = entidade[ this.config.campos[i] ];
                        continue;
                    }
                    tagGroup = document.createElement("div");
                    tagGroup.classList.add(this.classtagroup);
                    this.divInsert.appendChild(tagGroup);

                    taglabel = document.createElement('label');
                    taglabel.innerText = this.config.apelidos[i];
                    tagGroup.appendChild(taglabel);

                    taginput = document.createElement('input');
                    taginput.value = entidade[ this.config.campos[i] ];
                    taginput.readOnly = true;
                    tagGroup.appendChild(taginput);
                }
            }
        }
    }
    async obtemDados(){
        try {
            let rota;
            let metodo;
            let parametros;
            rota = this.config.axios.rota_Ler;
            metodo = this.config.axios.metodo_Ler;
            parametros={}
            let response;
            if( metodo == "post"){
                response = await axios.post('/api', {data:{ "rota":rota, "parametros":parametros}});
            }
            else if(metodo == "get" ){
                response = await axios.get('/api',{
                    params: {
                        data: { "rota":rota, "parametros": parametros}
                    }
                });
            }
            else if(metodo == "put" ){
                response = await axios.put('/api', {data:{ "rota":rota, "parametros": parametros}});
            }
            else if(metodo == "delete" ){
                response = await axios.delete('/api', {data:{ "rota":rota, "parametros": parametros}});
            }
            return response;
        } catch (e) {
            console.error("Erro em responeDados");
            console.log(e);
            return null;
        }
    }
}
export {manterEntidade};