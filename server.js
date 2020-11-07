const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
// import App from './src/App';

const app = express();

const SELECT_TEN_CALCS_QUERY = 'SELECT calc FROM calctable ORDER BY id DESC LIMIT 10;';
// const SELECT_ALL_CALCULATIONS_QUERY = 'SELECT * FROM calctable';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'calculator_db'
});

connection.connect(err => {
    if(err) {
        return err;
    }
});

app.use(cors());

app.get('/', (req, res) => {
   res.send('go to the /calculations route to see calculations')
});

app.get('/calculations/add', (req, res) => {
    const { calc } = req.query;
    console.log(`here is req.query.calc: ${calc}`)

    const INSERT_CALCULATION_QUERY = `INSERT INTO calctable (calc) VALUES (${calc});`;
    
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

const PORT = process.env.PORT || 4000;





app.listen(4000, () => {
    console.log(`Calculations server listening on port ${PORT}.`)
})