const express = require('express');
const router = express.Router();
const {
	getPrivateRoute,
	getRecipes,
	getRecipeByName,
	addRecipe,
	getGrocerieList,
	addGroceries,
	getGroceriesInfo,
	deleteGroceries,
} = require('../controllers/private');
const { protect, adminProtect } = require('../middleware/auth');

router.route('/').get(protect, getPrivateRoute);

router.route('/recipes').get(protect, getRecipes);

router.route('/getRecipeByName/:recipeName').get(protect, getRecipeByName);

router.route('/recipes').post(adminProtect, addRecipe);

router.route('/getGrocerieList').get(protect, getGrocerieList);

router.route('/groceries').post(protect, addGroceries);

router.route('/groceries').delete(protect, deleteGroceries);

router.route('/getGroceriesInfo').get(protect, getGroceriesInfo);

module.exports = router;
