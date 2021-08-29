const express = require('express');
const router = express.Router();
const {
	getPrivateRoute,
	getRecipes,
	getRecipeByName,
	addRecipe,
} = require('../controllers/private');
const { protect, adminProtect } = require('../middleware/auth');

router.route('/').get(protect, getPrivateRoute);

router.route('/recipes').get(protect, getRecipes);

router.route('/getRecipeByName/:recipeName').get(protect, getRecipeByName);

router.route('/recipes').post(adminProtect, addRecipe);

module.exports = router;
