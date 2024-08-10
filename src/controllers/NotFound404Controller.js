
class NotFound404{
    page(req, res){
        res.render('notfound404', {title:"Pagina não encontrada", msg:"Pagina não encontrada"});
    }
}

export default new NotFound404();
