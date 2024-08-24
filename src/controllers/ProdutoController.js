import axiosconfig from "../config/axiosConfig";
import Axios from "axios";
class ProdutoController {
    async criar(req, res) {
        try {
            const axios = Axios.create(axiosconfig.configcontroller(req, res));
            const response = await axios.post('/categorias/todos');
            console.log("data", response.data);
            return res.render("criarproduto", {categoria:response.data});
        } catch (e) {
            console.log(e);
            return res.redirect('notfound404');
        }
    }
    async efetuarcadastro(req, res) {
        return res.redirect("/atendimento");
    }
    async editar(req, res) {
        try {
            const axios = Axios.create(axiosconfig.configcontroller(req, res));
            const response = await axios.get(`/produto/${req.params.id}`);
            //console.log("data", response.data);
            let {updated_at, ...resto} = response.data;
            let tmp = new Date(updated_at);
            updated_at = tmp.toLocaleString('pt-BR', { timezone: 'UTC-3'});
            const newdata = {updated_at, ...resto};

            const response2 = await axios.post('/categorias/todos');
            console.log("teste", response2.data);

            return res.render("editarproduto", {"produto":newdata, "categoria":response2.data});
        } catch (e) {
            console.log(e);
            return res.redirect('notfound404');
        }
    }
}
export default new ProdutoController();
