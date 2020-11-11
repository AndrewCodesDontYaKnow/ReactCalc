const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, "build", "index.html")));

const SELECT_TEN_CALCS_QUERY = 'SELECT calc FROM calculations ORDER BY id DESC LIMIT 10;';

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'calculator_db'
});

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'calculator_db'
    })
}

connection.connect(err => {
    if(err) {
        return err;
    }
});

app.use(cors());

app.get('/calculations/add', (req, res) => {
    const { calc } = req.query;

    const INSERT_CALCULATION_QUERY = `INSERT INTO calculations (calc) VALUES ('${calc}');`;

    connection.query(INSERT_CALCULATION_QUERY, (err) => {
        if(err) {
            return res.send(err)
        } else {
        return res.send(`successfully added calculation`)
        }
    })
})

app.get('/calculations', (req, res) => {
    connection.query(SELECT_TEN_CALCS_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
            data: results
        })
        }
    })
})


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
