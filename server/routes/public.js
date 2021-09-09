const express = require('express');
const router = express.Router();

const { getRecipeByName, getPublicRoute } = require('../controllers/public');

router.route('/').get(getPublicRoute);
router.route('/recipe/:recipeName').get(getRecipeByName);

module.exports = router;
