const { parseHTML } = require('linkedom');

async function scrapeGodareRecipe(url) {
	try {
		const response = await fetch(url);
		const data = await response.text();
		const { document } = parseHTML(data);

		const name =
			document.querySelector('h1.godare-title')?.textContent.trim() || '';

		const notesArray = Array.from(
			document.querySelectorAll('div.description_description__b75w_ p')
		).map((el) => el.textContent.trim());
		const notes = notesArray.join(' ');

		const description =
			document
				.querySelector('[data-test-tag="lead-text"]')
				?.textContent.trim() || '';

		const categories = Array.from(
			document.querySelectorAll('li.flexrow-item_c6ac span')
		).map((el) => el.textContent.trim());

		const ingredients = Array.from(
			document.querySelectorAll('ul.styles-ingredientGroupList_3a54 li')
		)
			.map((el) => {
				const name =
					el
						.querySelector('span.styles-ingredientItemName_36b4')
						?.textContent.trim() || '';
				let amount =
					el
						.querySelector('span.styles-ingredientAmount_36b4')
						?.textContent.trim() || '';
				let unit = ''; // Initialize unit
				if (amount.match(/^\d+(\s*-\s*\d*)?$/)) {
					// TODO: this unit should me localized when thats implemented
					unit = 'st'; // Set unit to 'st' if amount is just a number or number with a dash
				} else {
					const match = amount.match(/^([\d\s\/.-]+)(.*)$/);
					if (match) {
						amount = match[1].trim();
						unit = match[2].trim();
					}
				}
				return { name, amount, unit };
			})
			.filter(
				(ingredient) =>
					ingredient.name || ingredient.amount || ingredient.unit
			);

		const instructions = Array.from(
			document.querySelectorAll(
				'ul.recipeinstructionslist-instructions_2060 span.checkmark-checkLabel_7ad3'
			)
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

module.exports = {
	scrapeGodareRecipe,
};
