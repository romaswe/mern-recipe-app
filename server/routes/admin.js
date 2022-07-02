const express = require('express');
const router = express.Router();

const {
	getAdminRoute,
	addRecipe,
	getUsers,
	setUserRole,
	addGroupRecipes,
	deleteRecipes,
	deleteGroupRecipes,
	bulkDeleteRecipes,
} = require('../controllers/admin');
const { adminProtect } = require('../middleware/auth');

/**
 * @openapi
 * /api/admin:
 *   get:
 *     tags:
 *     - Admin
 *     summary: Get admin route
 *     description: Get admin route description
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/').get(getAdminRoute);

/**
 * @openapi
 * /api/admin/recipes:
 *   post:
 *     tags:
 *     - Admin
 *     summary: Add a new recipe
 *     description: Add a new recipe to the database
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/recipes').post(adminProtect, addRecipe);

/**
 * @openapi
 * /api/admin/getUsers:
 *   get:
 *     tags:
 *     - Admin
 *     summary: Get users
 *     description: Get users from the database
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/getUsers').get(adminProtect, getUsers);

/**
 * @openapi
 * /api/admin/changeUserRole:
 *   put:
 *     tags:
 *     - Admin
 *     summary: Change user role
 *     description: Change user role in the database
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/changeUserRole').put(adminProtect, setUserRole);

/**
 * @openapi
 * /api/admin/setGroupRecipes:
 *   put:
 *     tags:
 *     - Admin
 *     summary: Add recipes to group
 *     description: Add a recipe to a group in the database
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/setGroupRecipes').post(adminProtect, addGroupRecipes);

router.route('/deleteRecipeById/:id').delete(adminProtect, deleteRecipes);

router
	.route('/deleteGroupRecipeById/:id')
	.delete(adminProtect, deleteGroupRecipes);

router.route('/bulkDeleteRecipes').delete(adminProtect, bulkDeleteRecipes);

module.exports = router;
