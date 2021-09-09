const express = require('express');
const router = express.Router();

const {
	getAdminRoute,
	addRecipe,
	getUsers,
	setUserRole,
} = require('../controllers/admin');
const { adminProtect } = require('../middleware/auth');

router.route('/').get(getAdminRoute);

router.route('/recipes').post(adminProtect, addRecipe);

router.route('/getUsers').get(adminProtect, getUsers);

router.route('/changeUserRole').put(adminProtect, setUserRole);

module.exports = router;
