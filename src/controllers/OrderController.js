class OrderController{
    createorder( req, res){
        return res.render('criarpedido');
    }
    detalhes(req, res) {
        return res.render('detalhespedido');
    }
    concluidos(req, res) {
        return res.render('concluidospedido');
    }
    cancelados(req, res) {
        return res.render('canceladospedido');
    }
    editar(req, res) {
        return res.render('editarpedido');
    }
}
export default new OrderController();