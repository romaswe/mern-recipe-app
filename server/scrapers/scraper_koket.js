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

		// TODO: fix units, now we get units in one long string in the name and dont have a good way to separate it to the correct format
		// Maybe we can check if the string starts with a number and then parse on spaces for amount, unit and name
		const ingredients = Array.from(
			document.querySelectorAll('#ingredients span')
		)
			.map((el) => {
				const name = el.querySelector('span')?.textContent.trim() || '';
				let amount = el.querySelector('td')?.textContent.trim() || '';
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

export default {
	scrapeKoketRecipe,
};
