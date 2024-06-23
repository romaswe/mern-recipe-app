const { parseHTML } = require('linkedom');

async function scrapeIcaRecipe(url) {
	try {
		const response = await fetch(url);
		const data = await response.text();
		const { document } = parseHTML(data);

		const name =
			document
				.querySelector('h1.recipe-header__title')
				?.textContent.trim() || '';

		const notesArray = Array.from(
			document.querySelectorAll('div.ingredients-list-group__card__ingr')
		).map((el) => el.textContent.trim());
		const notes = notesArray.join(' ');

		const description =
			document
				.querySelector('div.recipe-header__preamble p')
				?.textContent.trim() || '';

		const categories = Array.from(
			document.querySelectorAll('div.more-like-this__categories a')
		).map((el) => el.textContent.trim());

		const ingredients = Array.from(
			document.querySelectorAll('div.ingredients-list-group__card')
		)
			.map((el) => {
				const name =
					el
						.querySelector(
							'span.ingredients-list-group__card__ingr'
						)
						?.textContent.trim() || '';
				let amount =
					el
						.querySelector('span.ingredients-list-group__card__qty')
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
			document.querySelectorAll('div.cooking-steps-card')
		).map((el) => {
			const step =
				el
					.querySelector('div.cooking-steps-main__text')
					?.textContent.trim() || '';

			return step;
		});

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
	scrapeIcaRecipe,
};

/* 
Usage:
const { scrapeIcaRecipe } = require('./scraper');

const recipeUrl = 'https://www.ica.se/recept/vitloksrostad-farskpotatis-med-spenat-713530/';
scrapeIcaRecipe(recipeUrl).then(recipe => {
    if (recipe) {
        console.log(recipe);
    } else {
        console.error('Failed to scrape the recipe.');
    }
});

*/
