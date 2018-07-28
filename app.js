const app = require('./config/express')();

app.listen(3000, () => { console.log('listening on localhost:3000') });