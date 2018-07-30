function BoardsDAO(connection) {
    this._connection = connection;
}

BoardsDAO.prototype.listar = function(callback) {
    this._connection.query('select * from boards', callback);
}

BoardsDAO.prototype.salvar = function(board, callback) {
    this._connection.query('insert into boards set ?', board, callback);
}

BoardsDAO.prototype.atualizar = function(id, board, callback) {
    this._connection.query(`update boards set ? where id = ${ id }`, board, callback);
}

BoardsDAO.prototype.deletar = function(id, callback) {
    this._connection.query(`delete from boards where id = ${ id }`, callback);
}

module.exports = (connection) => {
    return BoardsDAO;
};