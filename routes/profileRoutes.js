const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profilesController');
const verifyJWT = require('../middleware/verifyJWT');
const verifyJWTOptional = require('../middleware/verifyJWTOptional');

// Get profile - authentication optional
router.get('/:username',verifyJWTOptional, profileController.getProfile);

// Follow a user
router.post('/:username/follow', verifyJWT, profileController.followUser);

// unfollow a user
router.delete('/:username/follow', verifyJWT, profileController.unFollowUser);
module.exports = router;
