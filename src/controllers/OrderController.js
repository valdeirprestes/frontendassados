import axios from "axios";
import axiosConfig from "../config/axiosConfig";
import criatelaDialogo from "../views/assets/js/modules/utils/criatelaDialogo";

class OrderController {
    createorder( req, res){
        return res.render('gestaodepedido', {"iduser":res.locals.user.id});
    }

    async pedido(req, res){
        try 
        {
            const request  = axios.create(axiosConfig.configcontroller(req, res));   
            const response = await request.get(`/pedido/${req.params.id}`, 
                {
                params:{ 
                    "estadoitens":"NORMAL"      
                }
            });
            console.log(response);
            if(!response){
                criatelaDialogo("divflexvertical", `Não encontrou o pedido ${req.params.id}`, -1 );
                console.log(`Não encontrou o pedido ${req.params.id}`);
                return res.status(400).redirect("/");
            }
            let {itens} = response.data;
            let listaprodutosid = [];
            let listaprodutosparcial = [];
            if(itens){
                itens.forEach(item => {
                    listaprodutosid.push(item.produto.id);
                    listaprodutosparcial.push(item.produto.unidade_parcial);
                });
            }
            const datamovimentopedido = new Date(response.data.datamovimento);

            let somasubtotal = 0;
            response.data.itens.forEach(item =>{
                somasubtotal += item.quantidade * item.preco;
            });
            somasubtotal = somasubtotal.toFixed(2);
            
            return res.status(200).render('gestaodepedido', 
                {
                    "iduser":res.locals.user.id,
                     "pedido": response.data,
                     "datamovimentopedido":datamovimentopedido.toISOString().split('T')[0],
                     "stringprodutosid": listaprodutosid.join(),
                     "stringprodutosparcial": listaprodutosparcial.join(),
                     "somasubtotal":somasubtotal
                });
            
        }
         catch (e) 
        {
            console.log(e);
            return res.status(400).redirect('/login');
        }
    }
    detalhes(req, res) {
        return res.render('detalhespedido');
    }
    concluidos(req, res) {;
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