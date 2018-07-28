const mysql = require('mysql');
function createDbConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin123',
        database: 'postit_generator'
    });
}

module.exports = () => {
    return createDbConnection;
}
