import axios from "axios";
import criatelaDialogo from "./modules/utils/criatelaDialogo";

class buscaInterativa {
 constructor(config){
        this.config = config;
        this.divbusca = null;
        this.inputid = null;
        this.inputbusca = null;
        this.divtable = null;
        this.labelbusca = null;
        this.table = null;
        this.divpaginador = null;
        this.numeroderegistros = null;
        this.paginaselecionada = 1;
        this.selecoesMultipla = [];
        //console.log(this.config.className);
        this.mainDiv = document.querySelector(`.${this.config.className}`);
        this.divInsert = document.querySelector(`.${this.config.classDivInsert}`);
        
    }


    init(){
        //console.log(this.mainDiv);
        if(!this.mainDiv)
            return;
        this.criatelas();
        this.criabusca();

        this.inputescolha = document.querySelector(`.${this.config.classInputSelecionado}`);
        if(!this.inputescolha){
            this.inputescolha = document.createElement("input");
            this.inputescolha.type= "hidden";
            this.inputescolha.classList.add(this.config.classInputSelecionado);
            this.mainDiv.appendChild(this.inputescolha);
        }
        this.criadivtabela();
        this.inputbusca.focus();
        this.listrun = 0;
        this.semaforofree = true;
    }

    addListRun()
    {
        this.listrun += 1;
        if( this.listrun == 1 ){
            this.execListRun();
        }

    }
    execListRun()
    {
        if(this.listrun > 0 && this.semaforofree == true){
            this.semaforofree = false;
            this.criardivtableporparametros();
            this.semaforofree = true;
            this.listrun -= 1;
            this.execListRun();
        }
    }
    criabusca(){
        
        this.divbusca = document.createElement("div");
        this.divbusca.classList.add('divbusca');
        this.telaselecao.appendChild(this.divbusca);
        this.labelbusca = document.createElement("label");
        this.labelbusca.classList.add("labelbusca");
        
        this.labelbusca.innerText = this.config.labelbuscar || "Buscar";
        this.inputbusca = document.createElement("input");
        this.inputbusca.classList.add("inputbusca");
        this.divbusca.appendChild(this.labelbusca);
        this.divbusca.appendChild(this.inputbusca);
        this.inputbusca.onkeyup = () => this.addListRun();

        let tagA = document.createElement("a");
        tagA.innerText=this.config.labelbuscarcancel|| "Cancelar";
        tagA.href = "#";
        tagA.classList.add('botao');
        tagA.onclick = ()=> this.cancelarProcesso();
        this.divbusca.appendChild(tagA);

        if(this.config.SelecaoMultipla == true)
        {
            tagA = document.createElement("a");
            tagA.innerText=this.config.labelbuscarconfirmar|| "Confirmar";
            tagA.href = "#";
            tagA.classList.add('botao');
            tagA.onclick = ()=> this.confirmaProcessoLista();
            this.divbusca.appendChild(tagA);
        }

    }

    criatelas(){
        this.telaselecao = document.createElement("div");
        this.telaapresentacao = document.createElement("div");
        this.telaselecao.classList.add("telaselecao");
        this.telaapresentacao.classList.add("telaapresentacao");
        //this.mainDiv.appendChild(this.telaapresentacao);
        this.divInsert.appendChild(this.telaselecao);
    }
    
    criadivtabela(){
        
        if(!this.divtable){
            this.divtable = document.createElement("div");
            this.divtable.classList.add('divtabela');
            this.telaselecao.appendChild(this.divtable);
            this.table = document.createElement("table");
            this.table.classList.add('tabelaselecao');
            this.divtable.appendChild(this.table);
            if(this.config.tabelacabecalho.length > 0){
                let tr = document.createElement("tr");
                let th;
                for (let i= 0 ; i < this.config.tabelacabecalho.length; i++){
                    th = document.createElement("th");
                    th.innerText = this.config.tabelacabecalho[i];
                    tr.appendChild(th);
                };
                th = document.createElement("th");
                th.innerText = ""
                tr.appendChild(th);
                this.table.appendChild(tr);
            }
        }
            
        if(this.divpaginador)
            this.divpaginador.remove();
        
        this.divpaginador = document.createElement("div");
        this.divpaginador.classList.add('divpaginador');
        this.telaselecao.appendChild(this.divpaginador);
        this.geratagTable();
        this.gerarTagUL();

    }




    async criardivtableporparametros ( ){
        this.numeroderegistros = 0;
        this.paginaselecionada = 1; 
        this.criadivtabela();
    }

    
    async geratagTable(){
        this.numeroderegistros = await this.responseCount();
        let trselect = document.getElementsByClassName('trselect');
        
        if(trselect.length>0){
            while(trselect.length > 0)
                trselect[0].remove();
        }
        if(this.numeroderegistros > 0 ){
            const response = await this.responseDados(); 
            let tagA;
            if(response.data){
                let usuario;
                let key;
                for(let i = 0 ; i < response.data.length; i++){
                    let tr = document.createElement("tr");
                    tr.classList.add("trselect");
                    usuario = response.data[i];
                    let td;
                    let opcao;
                    let classlnkbutton;
                    for(let j = 0 ; j < this.config.tabeladados.length; j++){
                        td = document.createElement("td");
                        key = this.config.tabeladados[j];
                        td.innerText = usuario[key];
                        if(j==0)
                            opcao = usuario[key];
                        tr.appendChild(td);
                    }
                    td = document.createElement("td");
                    tagA = document.createElement("a");
                    tagA.href = "#";
                    classlnkbutton = `classlnkbutton${i}`;
                    tagA.classList.add(classlnkbutton);
                    if(this.config.SelecaoMultipla == false){
                        tagA.innerText="Confirmar";
                        tagA.classList.add('botao');
                        tagA.onclick = ()=> this.confimarEscolha(opcao);
                    }else{
                        if( this.selecoesMultipla.includes( opcao))
                        {
                            tagA.innerText="OK";
                            tagA.classList.add('botaoremover');
                            tagA.onclick = () => this.removerLista(classlnkbutton, opcao);
                        }
                        else
                        {
                            tagA.innerText="Selecionar";
                            tagA.classList.add('botaoselecionar');
                            tagA.onclick = ()=> this.addLista( classlnkbutton, opcao );
                        }
                    }
                    td.appendChild(tagA);
                    tr.appendChild(td);
                    this.table.appendChild(tr);
                }
                
            }

        }

    }
    async gerarTagUL(){ /*Paginador */
        this.numeroderegistros = await this.responseCount();
        /*console.log("numeroderegistro", this.numeroderegistros);*/
        if(this.numeroderegistros ==0 ) return ;
        if(this.paginadotagul)
            this.paginadotagul.remove();
        for(let i= 0; i < this.config.axios.filtragemestatica.length && this.qtdpagina == null; i++)
            if(this.config.axios.filtragemestatica[i].campo == "qtdpagina")
            {
                this.qtdpagina = this.config.axios.filtragemestatica[i].valor;
                break;
            }
        /*console.log('this.numeroderegistros', this.numeroderegistros);
        console.log('this.qtdpagina', this.qtdpagina);*/
        if(this.numeroderegistros && this.numeroderegistros > this.qtdpagina){
            
            this.paginadotagul = document.createElement("ul");
            let tagli = document.createElement("li");
            let tagA; 

            for(let i = 0; i < Math.ceil( this.numeroderegistros / this.qtdpagina ) ; i++)
            {
                tagli = document.createElement("li");
                tagA = document.createElement("a");
                tagA.innerText=`${i+1}`;
                tagA.href = "#";
                tagA.classList.add('aPagina');
                tagA.classList.add('pagina');
                tagA.onclick = ()=> this.mudarPagina(i+1);
                tagli.appendChild(tagA);
                this.paginadotagul.appendChild(tagli);
            }
            this.divpaginador.appendChild(this.paginadotagul);
        }
    }

    async responseCount(){
        try {
            let rota = this.config.axios.rota_contagem;
            let parametros = {};
            
            for(let i=0; i < this.config.axios.filtragemestatica.length ; i++){
                parametros = {...parametros, 
                    [this.config.axios.filtragemestatica[i].campo]:this.config.axios.filtragemestatica[i].valor}
            }
            for(let i=0; i < this.config.tabelaprocura.length; i++){
                parametros = {...parametros, [this.config.tabelaprocura[i]]:this.inputbusca.value}
            }
            parametros = {...parametros, "pagina":this.paginaselecionada};
            
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
            
            if(this.inputbusca.value.length < 1) return 0;
            return quantidade;
        } catch (e) {
            const {errors } = e.response.data;
            if(errors){
                errors.forEach(error => {
                    criatelaDialogo("divflexvertical", error, -1);
                });                
            }
            console.error("Erro em responeCount");
            console.log(e);
            return 0;
        }
    }
    async responseDados(){
        try {
            if(this.inputbusca.length < 1) return null;
            let parametros = {};
            for(let i=0; i < this.config.axios.filtragemestatica.length ; i++){
                parametros = {...parametros, 
                    [this.config.axios.filtragemestatica[i].campo]:this.config.axios.filtragemestatica[i].valor}
            }
            for(let i=0; i < this.config.tabelaprocura.length; i++){
                parametros = {...parametros, [this.config.tabelaprocura[i]]:this.inputbusca.value}
            }
            parametros = {...parametros, "pagina":this.paginaselecionada};
            let metodo = this.config.axios.metodo_contagem;
            let response;
            let rota = this.config.axios.rota_dados;
            metodo = this.config.axios.metodo_dados;
            /*console.log('parametros', parametros);*/
            
            
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

    mudarPagina(mudarpagina){
        this.paginaselecionada = mudarpagina;
        this.criadivtabela();
    }
    confimarEscolha(opcao){
        this.inputescolha.value = opcao;
        this.inputescolha.innerText = opcao;
        this.telaselecao.remove();
        if(this.config.funcaopost)
        this.config.funcaopost(this.config);
    }

    confirmaProcessoLista(){
        this.inputescolha.value = this.selecoesMultipla.toString();
        this.telaselecao.remove();
        if(this.config.funcaopost)
        this.config.funcaopost(this.config);
    }

    cancelarProcesso(){
        this.telaselecao.remove();
    }

    addLista(classbutton1, opcao){
        this.selecoesMultipla.push(opcao);
        let taglink = document.querySelector(`.${classbutton1}`);
        if(!taglink){
            console.log(`Error, não conseguiu acessar link classbutton1 ( ${classbutton1} )`)
            return;
        }
        taglink.classList.remove('botaoselecionar');
        taglink.innerText = "OK";
        taglink.classList.add('botaoremover');
        taglink.onclick = ()=> this.removerLista( classbutton1, opcao );
    }

    removerLista(classbutton2, opcao){
        this.selecoesMultipla =  this.selecoesMultipla.filter( (x) => x != opcao);
        let taglink = document.querySelector(`.${classbutton2}`);
        if(!taglink){
            console.log(`Error, não conseguiu acessar link classbutton2 ( ${classbutton2} )`)
            return;
        }
        taglink.classList.remove('botaoremover');
        taglink.innerText = "Selecionar";
        taglink.classList.add('botaoselecionar');
        taglink.onclick = ()=> this.addLista( classbutton2, opcao );
    }

}




function AtivarBuscaInterativa(myconfig){
    let div = document.getElementsByClassName(myconfig.className);
    if(!div){
        console.log(`Classe ${myconfig.className} não foi localizada`)
        return;
    }
    let botao = document.getElementsByClassName(myconfig.classBotao);
    if(!botao){
        console.log(`Classe ${myconfig.classBotao} não foi localizada`)
        return;
    }
    const controlevento = new buscaInterativa(myconfig);
    controlevento.init();
}

export {AtivarBuscaInterativa , buscaInterativa};

