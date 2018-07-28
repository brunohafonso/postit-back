function PostitsDAO(connection) {
    this._connection = connection;
}

PostitsDAO.prototype.listar = function(callback) {
    this._connection.query('select * from postits', callback);
}

PostitsDAO.prototype.salvar = function(postit, callback) {
    this._connection.query('insert into postits set ?', postit, callback);
}

module.exports = function(connection) {
    return PostitsDAO;
}
