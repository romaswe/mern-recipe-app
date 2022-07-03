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
	getGroupRecipes,
	getGroupRecipesByGroupName,
} = require('../controllers/private');
const { protect } = require('../middleware/auth');

/**
 * @openapi
 * /api/private:
 *   get:
 *     tags:
 *     - Private
 *     summary: Get private route
 *     description: Get private route description
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/').get(protect, getPrivateRoute);

/**
 * @openapi
 * /api/private/recipes:
 *   get:
 *     tags:
 *     - Private
 *     summary: get recipes
 *     description: Get recipes from the database
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/recipes').get(protect, getRecipes);

/**
 * @openapi
 * /api/private/groceries:
 *   get:
 *     tags:
 *     - Private
 *     summary: Get groceries
 *     description: Get groceries from the database
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/groceries').get(protect, getGrocerieList);

/**
 * @openapi
 * /api/private/groceries:
 *   post:
 *     tags:
 *     - Private
 *     summary: Add groceries
 *     description: Add groceries to the database
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/groceries').post(protect, addGroceries);

/**
 * @openapi
 * /api/private/groceries:
 *   delete:
 *     tags:
 *     - Private
 *     summary: Delete groceries
 *     description: Delete groceries from the database
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/groceries').delete(protect, deleteGroceries);

/**
 * @openapi
 * /api/private/groceries:
 *   put:
 *     tags:
 *     - Private
 *     summary: Update groceries
 *     description: Update groceries in the database
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/groceries').put(protect, setGroceries);

/**
 * @openapi
 * /api/private/getGroceriesInfo:
 *   get:
 *     tags:
 *     - Private
 *     summary: Get groceries info
 *     description: Get groceries info from the database
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/getGroceriesInfo').get(protect, getGroceriesInfo);

router
	.route('/getGroupRecipesByName/:groupName')
	.get(protect, getGroupRecipesByGroupName);

router.route('/getGroupRecipes').get(protect, getGroupRecipes);

module.exports = router;
