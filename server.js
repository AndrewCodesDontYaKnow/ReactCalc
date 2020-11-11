const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;

// app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "/client/build")));

// This route serves the React app
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, "/client/build", "index.html")));

const SELECT_TEN_CALCS_QUERY = 'SELECT calc FROM calculations ORDER BY id DESC LIMIT 10;';
const CLEAR_ALL_CALCS_QUERY = 'DELETE * FROM calculations;'

// const SELECT_ALL_CALCULATIONS_QUERY = 'SELECT * FROM calctable';

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

// app.get('/', (req, res) => {
//    res.send('go to the /calculations route to see calculations')
// });

app.get('/calculations/add', (req, res) => {
    const { calc } = req.query;
    console.log(`here is req.query.calc: ${calc}`)
    
    const INSERT_CALCULATION_QUERY = `INSERT INTO calculations (calc) VALUES ('${calc}');`;

    connection.query(INSERT_CALCULATION_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        } else {
        return res.send(`successfully added calculation`)
        }
    })
    // res.send(`adding calculation`)
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

// app.delete('/clear', (req, res) => {
//     connection.query(CLEAR_ALL_CALCS_QUERY, (err) => { 
//         console.log(`clear query fired off`)
//         if(err) {
//             return res.send(err)
//         } else {
//             return res.send(`delete fired`)
//         }
//     })
// })


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
