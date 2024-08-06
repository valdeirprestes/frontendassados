
class NotFound404{
    page(req, res){
        res.render('404', {title:"Pagina não encontrada", msg:"Pagina não encontrada"});
    }
}

export default new NotFound404();
