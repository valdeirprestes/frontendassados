function criatelaDialogo( strClassNameTagHTML, strMensagem, intTipoMensagem){
    /*
        intTipoMensagem == 0 -> Exclamação
        intTipoMensagem  < 0 -> Erro
        intTipoMensagem  > 0 -> Sucesso
     */

    const classeprincipal = document.querySelector(`.${strClassNameTagHTML}`)
    if(!classeprincipal){
        console.log(`Não conseguiu acessa a classe ${strClassNameTagHTML}`);
        return;
    }
    let classDiv;    
    if(intTipoMensagem == 0)
    {
        classDiv = "exclamacao-dialog";
    }
    else if(intTipoMensagem < 0)
    {
        classDiv = "erro-dialog";
    }
    else
    {
        classDiv = "sucesso-dialog";
    }
    const tela = document.createElement("div");
    tela.classList.add("dialog");
    tela.classList.add(classDiv);
    classeprincipal.appendChild(tela);
    

    const msg = document.createElement("h1");
    msg.innerText = strMensagem;
    tela.appendChild(msg);
    
    const botao = document.createElement("button");
    botao.classList.add("newbotao");
    botao.innerText ="Fechar"
    botao.onclick = () => tela.remove();
    tela.appendChild(botao);

}
export default criatelaDialogo;