import axios from "axios";
import axiosConfig from "../config/axiosConfig";
class EstoqueController{
    index (req, res){
        return res.render('gerenciarestoque');
    }
}

export default new EstoqueController();
