module.exports = (app) => {
    app.get('/boards', (req, res) => {
        const connection = app.model.connectionFactory();
        const boardsDAO = new app.model.BoardsDAO(connection);
        boardsDAO.listar((error, results) => res.json(results));
        connection.end();
    });

    app.post('/boards', (req, res) => {
        const board = req.body;
        const connection = app.model.connectionFactory();
        const boardsDAO = new app.model.BoardsDAO(connection);
        boardsDAO.salvar(board, (error, results) => {
            res.json(board)
        });
    });
}