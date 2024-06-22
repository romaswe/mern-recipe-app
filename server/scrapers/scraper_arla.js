const { parseHTML } = require('linkedom');

async function scrapeArlaRecipe(url) {
	try {
		const response = await fetch(url);
		const data = await response.text();
		const { document } = parseHTML(data);

		const name =
			document
				.querySelector('h1.c-recipe__title.u-text-break')
				?.textContent.trim() || '';

		const notesArray = Array.from(
			document.querySelectorAll('[data-placement="RecipeTips"]')
		).map((el) => el.textContent.trim());
		const notes = notesArray.join(' ');

		const description =
			document
				.querySelector('div.c-recipe__description')
				?.textContent.trim() || '';

		const categories = Array.from(
			document.querySelectorAll(
				'div.o-content-box.c-recipe__details span.c-tag'
			)
		).map((el) => el.textContent.trim());

		const ingrediens = Array.from(
			document.querySelectorAll('div.c-recipe__ingredients-inner tr')
		)
			.map((el) => {
				const name =
					el.querySelector('th span')?.textContent.trim() || '';
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
			document.querySelectorAll(
				'ul.u-bare-list.c-recipe__instructions-steps-list.u-ml--m.c-recipe__instructions-steps-multi li'
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
			ingrediens,
			instructions,
			tags,
		};

		return recipe;
	} catch (error) {
		console.error('Error scraping recipe:', error);
	}
}

export default {
	scrapeArlaRecipe,
};
