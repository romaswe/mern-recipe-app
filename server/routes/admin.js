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
	bulkDeleteGroupRecipes,
	addScrapedRecipe,
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
 *     security:
 *     - bearerAuth: []
 *     tags:
 *     - Admin
 *     summary: Add a new recipe
 *     description: Add a new recipe to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *             - name
 *             - description
 *             - ingredients
 *             - instructions
 *             - tags
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/recipes').post(adminProtect, addRecipe);

/**
 * @openapi
 * /api/admin/recipe/scraping:
 *   post:
 *     security:
 *     - bearerAuth: []
 *     tags:
 *     - Admin
 *     summary: Add a new recipe by scraping a website
 *     description: Add a new recipe to the database by scraping a website
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *             required:
 *             - url
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/recipe/scraping').post(adminProtect, addScrapedRecipe);

/**
 * @openapi
 * /api/admin/getUsers:
 *   get:
 *     security:
 *     - bearerAuth: []
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
 *     security:
 *     - bearerAuth: []
 *     tags:
 *     - Admin
 *     summary: Change user role
 *     description: Change user role in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               role:
 *                 type: string
 *             required:
 *             - userId
 *             - role
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/changeUserRole').put(adminProtect, setUserRole);

/**
 * @openapi
 * /api/admin/setGroupRecipes:
 *   put:
 *     security:
 *     - bearerAuth: []
 *     tags:
 *     - Admin
 *     summary: Add recipes to group
 *     description: Add a recipe to a group in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipeId:
 *                 type: string
 *               groupId:
 *                 type: string
 *             required:
 *             - recipeId
 *             - groupId
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/setGroupRecipes').post(adminProtect, addGroupRecipes);

/**
 * @openapi
 * /api/admin/deleteRecipeById:
 *   delete:
 *     security:
 *     - bearerAuth: []
 *     tags:
 *     - Admin
 *     summary: Delete a recipe by ID
 *     description: Delete a recipe from the database by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/deleteRecipeById/:id').delete(adminProtect, deleteRecipes);

/**
 * @openapi
 * /api/admin/deleteGroupRecipeById:
 *   delete:
 *     security:
 *     - bearerAuth: []
 *     tags:
 *     - Admin
 *     summary: Delete a group recipe by ID
 *     description: Delete a group recipe from the database by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router
	.route('/deleteGroupRecipeById/:id')
	.delete(adminProtect, deleteGroupRecipes);

/**
 * @openapi
 * /api/admin/bulkDeleteRecipes:
 *   delete:
 *     security:
 *     - bearerAuth: []
 *     tags:
 *     - Admin
 *     summary: Delete multiple recipes by ID
 *     description: Delete multiple recipes from the database by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipeIds:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *             - recipeIds
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/bulkDeleteRecipes').delete(adminProtect, bulkDeleteRecipes);

/**
 * @openapi
 * /api/admin/bulkDeleteGroupRecipes:
 *   delete:
 *     security:
 *     - bearerAuth: []
 *     tags:
 *     - Admin
 *     summary: Delete multiple group recipes by ID
 *     description: Delete multiple group recipes from the database by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: string
 *               recipeIds:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *             - groupId
 *             - recipeIds
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router
	.route('/bulkDeleteGroupRecipes')
	.delete(adminProtect, bulkDeleteGroupRecipes);

module.exports = router;
