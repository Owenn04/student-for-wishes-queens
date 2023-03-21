const mysql = require('mysql')
const db = mysql.createConnection({
    host: "qweb.cwfdygwqbs8p.ca-central-1.rds.amazonaws.com",
    user: "admin",
    password: "linodeisthebest159",
    database:"qweb"
})
db.connect(function(err) {
    if (err) throw err;

    db.query("SELECT * FROM events", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });

    db.query("SELECT * FROM donate_link", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});

module.exports = db;
