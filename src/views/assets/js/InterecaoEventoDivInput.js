class InterecaoEventoDivInput{
    constructor (config){
        this.config = config;
        this.divbusca = null;
        this.inputid = null;
        this.inputbusca = null;
        this.divtable = null;
        this.mainDiv = document.querySelector(this.config.className);
    }
    init(){
        if(!this.mainDiv)
            return;
        this.criabusca();
        this.eventos();
    }
    criabusca(){
        this.divbusca = document.createElement("div");
        this.divbusca.classList.add('buscaporevento');
        this.mainDiv.appendChild(divbusca);
        this.inputbusca = document.createElement("input");
        this.divbusca.appendChild(this.inputbusca);
    }
    criadivtabela(){
        this.divtable = document.createElement("div");
        this.divtable.classList.add('tabela');
    }
    eventos(){
        if(this.inputbusca)
        {
            this.inputbusca.addEventListener('change',(e)=>{

            });
        }
    }
}

export default InterecaoEventoDivInput;
