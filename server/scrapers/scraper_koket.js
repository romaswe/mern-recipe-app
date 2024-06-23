const { parseHTML } = require('linkedom');

async function scrapeKoketRecipe(url) {
	try {
		const response = await fetch(url);
		const data = await response.text();
		const { document } = parseHTML(data);

		const name =
			document
				.querySelector('h1.recipe_title__Al9fM')
				?.textContent.trim() || '';

		const notesArray = Array.from(
			document.querySelectorAll('div.description_description__b75w_ p')
		).map((el) => el.textContent.trim());
		const notes = notesArray.join(' ');

		const description =
			document
				.querySelector('div.description_description__b75w_ p')
				?.textContent.trim() || '';

		const categories = Array.from(
			document.querySelectorAll('div.themes_wrapper__XnOUd a')
		).map((el) => el.textContent.trim());

		const ingredients = Array.from(
			document.querySelectorAll('#ingredients span')
		)
			.map((el) => {
				const ingredientRow =
					el.querySelector('span')?.textContent.trim() || '';
				return parseIngredient(ingredientRow);
			})
			.filter(
				(ingredient) =>
					ingredient.name || ingredient.amount || ingredient.unit
			);

		const instructions = Array.from(
			document.querySelectorAll('section.instructions_wrapper__f2NmG li')
		).map((el) => el.textContent.trim());

		const tags = Array.from(
			document.querySelectorAll('div.tags__item')
		).map((el) => el.textContent.trim());

		const recipe = {
			name,
			url,
			notes,
			description,
			categories,
			ingredients,
			instructions,
			tags,
		};

		return recipe;
	} catch (error) {
		console.error('Error scraping recipe:', error);
	}
}

function parseIngredient(ingredient) {
	// TODO: this unit should me localized when thats implemented
	const regex = /^(\d+[,\.]?\d*)\s*(g|dl|tsk|msk|kg|l|ml)?\s*(.*)$/i;
	const match = ingredient.match(regex);

	if (match) {
		return {
			name: match[3].trim(),
			amount: match[1].replace(',', '.'),
			// TODO: this unit should me localized when thats implemented
			unit: match[2] ? match[2].trim() : 'st',
		};
	}

	return {
		name: ingredient.name,
		amount: '',
		unit: '',
	};
}

module.exports = {
	scrapeKoketRecipe,
};
