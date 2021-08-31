const express = require('express');
const router = express.Router();
const {
	getPrivateRoute,
	getRecipes,
	getRecipeByName,
	addRecipe,
	getGrocerieListById,
	addGroceries,
} = require('../controllers/private');
const { protect, adminProtect } = require('../middleware/auth');

router.route('/').get(protect, getPrivateRoute);

router.route('/recipes').get(protect, getRecipes);

router.route('/getRecipeByName/:recipeName').get(protect, getRecipeByName);

router.route('/recipes').post(adminProtect, addRecipe);

router.route('/getGrocerieListById/:userID').get(protect, getGrocerieListById);

router.route('/groceries').post(adminProtect, addGroceries);

module.exports = router;
