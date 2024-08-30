const classTagSomaSubtotal= "subtotal_criarpedido";
const classTagListId = "idlistproduto_criarpedido";
function gestaopedido_SomaSubtotal(){
    let tagListid = document.getElementsByClassName(classTagListId);
    let tagSomaSubtotal = document.querySelector(`.${classTagSomaSubtotal}`);
    if(!tagSomaSubtotal)
    {
        console.log(`Não foi possível acessar a classe ${classTagSomaSubtotal}`);
        return;
    }

    let  tagsubtotal, subtotal ;
    let sumsubtotal = 0;
    let classcurrent;
    for(let i = 0 ; i < tagListid.length; i++)
    {
        classcurrent= `.input_subtotal${tagListid[i].innerText}`
        console.log(classcurrent);
        tagsubtotal = document.querySelector(classcurrent);
        if(tagsubtotal)
        {
            sumsubtotal += parseFloat(tagsubtotal.value);
        }
    }
    sumsubtotal = sumsubtotal.toFixed(2);
    console.log(` Subtotal ${sumsubtotal}`); 
    tagSomaSubtotal.innerText = sumsubtotal;
    tagSomaSubtotal.value = sumsubtotal;
}

export default gestaopedido_SomaSubtotal;