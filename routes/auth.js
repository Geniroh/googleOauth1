const express = require('express');
const router = express.Router();
const passport = require('passport');

// @desc login/landing page
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

// @desc dashboard
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/'
}),(req, res) => {
    res.redirect('/dashboard');
})


router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router