const express = require('express');
const router = express.Router();
const {
	getPrivateRoute,
	getRecipes,
	addRecipe,
	getGrocerieList,
	addGroceries,
	getGroceriesInfo,
	deleteGroceries,
	setGroceries,
	getUsers,
	setUserRole,
} = require('../controllers/private');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getPrivateRoute);

router.route('/recipes').get(protect, getRecipes);

router.route('/groceries').get(protect, getGrocerieList);

router.route('/groceries').post(protect, addGroceries);

router.route('/groceries').delete(protect, deleteGroceries);

router.route('/groceries').put(protect, setGroceries);

router.route('/getGroceriesInfo').get(protect, getGroceriesInfo);

module.exports = router;
