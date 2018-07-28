module.exports = (app) => {
    app.get('/boards/postits', (req, res) => {
        const connection = app.model.connectionFactory();
        const postitsDAO = new app.model.PostitsDAO(connection);
        postitsDAO.listar((error, results) => res.json(results));
        connection.end(); 
    });

    app.post('/boards/postits', (req, res) => {
        const postit = req.body;
        const connection = app.model.connectionFactory();
        const postitsDAO = new app.model.PostitsDAO(connection);
        postitsDAO.salvar(postit, (error, results) => {
            res.json(postit)
        });
        connection.end(); 
    });
}