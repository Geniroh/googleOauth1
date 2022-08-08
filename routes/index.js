const express = require('express');
const router = express.Router();

// @desc login/landing page
router.get('/', (req,res) => {
    res.render('login', {
        layout: 'login'
    });
})

// @desc dashboard
router.get('/dashboard', (req,res) => {
    res.send('dashboard');
})

module.exports = router