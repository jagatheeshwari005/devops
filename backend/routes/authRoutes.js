const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication
        const token = req.user.token;
        // Redirect to frontend with token
        res.redirect(`http://localhost:3000/auth/success?token=${token}`);
    }
);

module.exports = router;
