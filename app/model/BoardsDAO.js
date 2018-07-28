function BoardsDAO(connection) {
    this._connection = connection;
}

BoardsDAO.prototype.listar = function(callback) {
    this._connection.query('select * from boards', callback);
}

BoardsDAO.prototype.salvar = function(board, callback) {
    this._connection.query('insert into boards set ?', board, callback);
}

module.exports = (connection) => {
    return BoardsDAO;
};