import ValidLogin from "./modules/validform/ValidLogin";
import ValidUsuario from "./modules/validform/ValidUsuario";
import ValidDesativarUsuario from "./modules/validform/ValidDesativarUsuario";
import ValidEditarUsuario from "./modules/validform/ValidEditarUsuario";



import divcriarpedido from "./modules/eventosBuscaInterativa/criarperdido/configCriarPedido";
import funcdivcriarpedido from "./modules/eventosBuscaInterativa/criarperdido/funcdivcriarpedido";


import { AtivarBuscaInterativa } from "./buscaInterativa";

window.addEventListener('load', (e)=>{

    const listSearch = [];
    listSearch.push([funcdivcriarpedido, divcriarpedido]);
    let botao;
    listSearch.forEach((element)=>{
        const [funcao ,objconfig ] = element;
        let botao = document.querySelector(`.${objconfig.classBotao}`);
        if(botao)
        {
            botao.onclick = ()=> AtivarBuscaInterativa(objconfig);
        }
        else 
            console.log(`Classe ${objconfig.classBotao} não foi localizada`);
    });



    const listValidForm = [];
    listValidForm.push([ValidLogin, ".class-form-login"]);
    listValidForm.push([ValidUsuario, ".class-form-usuario"]);
    listValidForm.push([ValidDesativarUsuario, ".class-form-deativarusuario"]);
    listValidForm.push([ValidEditarUsuario, ".class-form-editarusuario"]);
    listValidForm.forEach( (Validclasstr) =>{
        const [Valid, classtr] = Validclasstr
        const valid = new Valid(classtr);
        valid.init();
    });

    
    
});