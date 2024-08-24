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
    async listar(req, res) {
        try {
            const axios = Axios.create(axiosconfig.configcontroller(req, res));
            const response = await axios.post('/produto/todos', {
                "estado":"NORMAL",
                "qtdpagina":10,
                "pagina":req.params.pagina
            });
            const response2 = await axios.post('/produto/quantidade');
            const quantidade = response2.data.quantidade
            let qtdepaginas = quantidade/10;
            qtdepaginas = Math.ceil(qtdepaginas);
            //console.log("data", response.data.errors);
            return res.render("listarprodutos", {"listaprodutos":response.data, "qtdepaginas":qtdepaginas});
        } catch (e) {
            console.log(e.data);
            return res.redirect('notfound404');
        }
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
    async desativar(req, res) {
        try {
            const axios = Axios.create(axiosconfig.configcontroller(req, res));
            const response = await axios.get(`/produto/${req.params.id}`);
            console.log(response);
            return res.render("desativarproduto", {"produto":response.data});
        } catch (e) {
            console.log(e);
            return res.redirect('notfound404');
        }
    }
}
export default new ProdutoController();
