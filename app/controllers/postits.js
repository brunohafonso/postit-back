module.exports = (app) => {
    app.get('/postits', (req, res) => {
        const connection = app.model.connectionFactory();
        const postitsDAO = new app.model.PostitsDAO(connection);
        postitsDAO.listar((error, results) => {
            if(error) {
                res.status(500).json('erro inesperado: ' + error);
            }
            res.status(200).json(results);
        });
        connection.end(); 
    });

    app.post('/postits', (req, res) => {
        const postit = req.body;
        req.assert('content', 'content é obrigatório').notEmpty();
        req.assert('idBoard', 'idBoard é obrigatório').notEmpty();
        req.assert('positionTop', 'positionTop é obrigatório').notEmpty();
        req.assert('positionLeft', 'positionLeft é obrigatório').notEmpty();
        req.assert('color', 'color é obrigatório').notEmpty();
        const erros = req.validationErrors();
        if(erros) {
            res.status(400).json('erros ao cadastrar board ' + erros[0].msg);
        }
        const connection = app.model.connectionFactory();
        const postitsDAO = new app.model.PostitsDAO(connection);
        postitsDAO.salvar(postit, (error, results) => {
            if(error) {
                res.status(500).json('erro inesperado: ' + error);
            }
            res.status(200).json('postit salvo com sucesso.');
        });
        connection.end(); 
    });

    app.put('/postits/:id', (req, res) => {
        const id = req.params.id;
        const postit = req.body;
        req.assert('content', 'content é obrigatório').notEmpty();
        req.assert('idBoard', 'idBoard é obrigatório').notEmpty();
        req.assert('positionTop', 'positionTop é obrigatório').notEmpty();
        req.assert('positionLeft', 'positionLeft é obrigatório').notEmpty();
        req.assert('color', 'color é obrigatório').notEmpty();
        const erros = req.validationErrors();
        if(erros) {
            res.status(400).json('erros ao cadastrar board ' + erros[0].msg);
        }
        const connection = app.model.connectionFactory();
        const postitsDAO = new app.model.PostitsDAO(connection);
        postitsDAO.atualizar(id, postit, (error, result) => {
            if(error) {
                res.status(500).json('erro inesperado: ' + error);
            }
            res.status(200).json('postit atualizado com sucesso.');
        });
        connection.end();
    });

    app.delete('/boards/:id', (req, res) => {
        const id = req.params.id;
        const connection = app.model.connectionFactory();
        const postitsDAO = new app.model.PostitsDAO(connection);
        postitsDAO.deletar(id, (error, results) => {
            if(error) {
                res.status(500).json('erro inesperado: ' + error);
            }
            res.status(200).json('postit deletado com sucesso');
        });
        connection.end();
    });
}