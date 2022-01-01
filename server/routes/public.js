const express = require('express');
const router = express.Router();

const { getRecipeByName, getPublicRoute } = require('../controllers/public');
/**
 * @openapi
 * /api/public:
 *   get:
 *     tags:
 *     - Public
 *     summary: Get public route
 *     description: Get public route description
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/').get(getPublicRoute);

/**
 * @openapi
 * /api/public/recipe/{recipeName}:
 *   get:
 *     tags:
 *     - Public
 *     summary: Get public route
 *     description: Get single recipe by name
 *     parameters:
 *     - name: "recipeName"
 *       in: "path"
 *       description: "Name of recipe to return"
 *       required: true
 *       type: "string"
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/recipe/:recipeName').get(getRecipeByName);

module.exports = router;
