import axios from "axios";
import axiosConfig from "../config/axiosConfig";
class EstoqueController{
    index (req, res){
        return res.render('gerenciarestoque');
    }
    adicionarestoque(req, res){
        return res.render('gestaoestoque',
        {
            "iduser":res.locals.user.id
        });
    }
}

export default new EstoqueController();
