import ValidLogin from "./modules/ValidLogin";
window.addEventListener('load', (e)=>{
    const listValid = [];
    //adicione cada validador de formulário
    listValid.push([ValidLogin, ".class-form-login"])
    listValid.forEach( (Validclasstr) =>{
        const [Valid, classtr] = Validclasstr
        let valid = new Valid(classtr);
        valid.init();
    });
});