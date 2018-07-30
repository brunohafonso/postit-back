function PostitsDAO(connection) {
    this._connection = connection;
}

PostitsDAO.prototype.listar = function(callback) {
    this._connection.query('select * from postits', callback);
}

PostitsDAO.prototype.salvar = function(postit, callback) {
    this._connection.query('insert into postits set ?', postit, callback);
}

PostitsDAO.prototype.atualizar = function(id, postit, callback) {
    this._connection.query(`update postits set ? where id = ${ id }`, postit, callback);
}

PostitsDAO.prototype.deletar = function(id, callback) {
    this._connection.query(`delete from postits where id = ${ id }`, callback);
}

module.exports = function(connection) {
    return PostitsDAO;
}
1