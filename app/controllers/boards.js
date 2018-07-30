module.exports = (app) => {
    app.get('/boards', (req, res) => {
        const connection = app.model.connectionFactory();
        const boardsDAO = new app.model.BoardsDAO(connection);
        boardsDAO.listar((error, results) => {
            if(error) {
                res.status(500).json("Erro ao buscar quadros " + error);
            }
            res.status(200).json(results);;
        });
        connection.end();
    });

    app.post('/boards', (req, res) => {   
        const board = req.body;
        req.assert('name', 'name é obrigatório').notEmpty();
        req.assert('createdAt', 'createdAt é obrigatório').notEmpty();
        const erros = req.validationErrors();
        if(erros) {
            res.status(400).json('erros ao cadastrar board ' + erros[0].msg);
        }
        const connection = app.model.connectionFactory();
        const boardsDAO = new app.model.BoardsDAO(connection);
        boardsDAO.salvar(board, (error, results) => {
            if(error) {
                res.status(500).json('erro inesperado ' + error);
            }
            res.status(200).json(`${ board.name } cadastrado com sucesso.`);
        });
        connection.end();
    });

    app.put('/boards/:id', (req, res) => {
        const id = req.params.id;
        const board = req.body;
        req.assert('name', 'name é obrigatório').notEmpty();
        req.assert('createdAt', 'createdAt é obrigatório').notEmpty();
        const erros = req.validationErrors();
        if(erros) {
            res.status(400).json('erros ao cadastrar board ' + erros[0].msg);
        }
        const connection = app.model.connectionFactory();
        const boardsDAO = new app.model.BoardsDAO(connection);
        boardsDAO.atualizar(id, board, (error, result) => {
            if(error) {
                res.status(500).json('error inesperado: ' + error);   
            }
            res.status(200).json('board atualizado com sucesso.');
        });
    });

    app.delete('/boards/:id', (req, res) => {
        const id = req.params.id;
        const connection = app.model.connectionFactory();
        const boardsDAO = new app.model.BoardsDAO(connection);
        boardsDAO.deletar(id, (error, results) => {
            if(error) {
                res.status(500).json("erro inesperado: " + error);
            }
            res.status(200).json("board deletado com sucesso.");
        });
        connection.end();
    });
}