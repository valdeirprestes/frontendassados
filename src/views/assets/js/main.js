import ValidLogin from "./modules/validform/ValidLogin";
import ValidUsuario from "./modules/validform/ValidUsuario";
import ValidDesativarUsuario from "./modules/validform/ValidDesativarUsuario";
import ValidEditarUsuario from "./modules/validform/ValidEditarUsuario";

import InterecaoEventoDiv from "./InterecaoEventoDivInput";
import divcriarpedido from "./modules/eventodiv/divcriarpedido";

window.addEventListener('load', (e)=>{
    const listValidForm = [];
    //adicione cada validador de formulário
    listValidForm.push([ValidLogin, ".class-form-login"]);
    listValidForm.push([ValidUsuario, ".class-form-usuario"]);
    listValidForm.push([ValidDesativarUsuario, ".class-form-deativarusuario"]);
    listValidForm.push([ValidEditarUsuario, ".class-form-editarusuario"]);
    listValidForm.forEach( (Validclasstr) =>{
        const [Valid, classtr] = Validclasstr
        const valid = new Valid(classtr);
        valid.init();
    });

    const listEventodiv = [];
    listEventodiv.push(divcriarpedido);
    listEventodiv.forEach((mydiv)=>{
        const controlevento = new InterecaoEventoDivInput(mydiv);
        controlevento.init();
    });
    
});