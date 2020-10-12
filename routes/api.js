const express = require('express');
const router = express.Router()


router.post('/save', (req, res) => {
    console.log(`Request Body: ${req.body}`)

    res.json({
        msg: 'data received!!'
    })

})