const { scrapeIcaRecipe } = require('../scrapers/scraper_ica');
const { scrapeArlaRecipe } = require('../scrapers/scraper_arla');
const { scrapeKoketRecipe } = require('../scrapers/scraper_koket');

const scraper = async (url) => {
	switch (true) {
		case /^(https?:\/\/)?(www\.)?koket\.se\//.test(url):
			console.log('Matched koket.se');
			// Add your logic for handling koket.se URLs
			return await scrapeKoketRecipe(url);

		case /^(https?:\/\/)?(www\.)?arla\.se\/recept\//.test(url):
			console.log('Matched arla.se/recept');
			// Add your logic for handling arla.se/recept URLs
			return await scrapeArlaRecipe(url);

		case /^(https?:\/\/)?(www\.)?ica\.se\/recept\//.test(url):
			console.log('Matched ica.se/recept');
			// Add your logic for handling ica.se/recept URLs
			return await scrapeIcaRecipe(url);

		default:
			console.log('URL did not match any known case');
			// Add your logic for handling unknown URLs
			throw new Error('URL did not match any known case');
	}
};

module.exports = scraper;
