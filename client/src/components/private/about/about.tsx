import './about.css';
export const AboutComponent = () => {
	const appVersion = process.env.REACT_APP_VERSION;
	return (
		<div className='row'>
			<div className='col-s-12 col-6 about-card'>
				<h2>Om</h2>
				<p>
					Detta är en hemsida som har en kombinerad recept och
					inköpslista för att underlätta vardagshandling.
				</p>
			</div>
			<div className='col-s-12 col-6 about-card'>
				<h2>Roller</h2>
				<p>
					Denna applikation använder sig av olika roller. Vid frågor
					om roller kontakta din administratör. Du kan se din
					nuvarande roll i högra hörnet av navigatios fältet.
				</p>
				<div className='row'>
					<div className='col-6'>
						<h4>Viewer</h4>
						<p>
							Som Viewer kan man enbart se recept och inte använda
							sig av inköpslistan.
						</p>
					</div>
					<div className='col-6'>
						<h4>User</h4>
						<p>
							Använadre kan göra allt som viewer kan samt lägga
							till och tabort i inköpslistan.
						</p>
					</div>
					<div className='col-6'>
						<h4>Admin</h4>
						<p>
							Admin kan göra allt som User och Viewer kan samt
							byta roller på användare och lägga till nya recept.
						</p>
					</div>
				</div>
			</div>
			<div className='col-s-12 col-6 about-card'>
				<h3>Funktionalitet</h3>

				<p>
					Den huvudsakliga Funktionaliteten som finns är att hitta
					recept och hantera inköpslista.
				</p>
				<p>
					Utöver det finns det även stöd för att registrera användare,
					byta lösenord och lägga till recept.
				</p>
			</div>
			<div className='col-s-12 col-6 about-card'>
				<h3>Framtiden</h3>
				<p>
					Målet är att lägga till ny Funktionalitet samt förbättra den
					befintliga.
				</p>
				<p>
					Det här är en lista på några saker som är planerade. Listan
					är inte sorterad efter något och ingen tidsplan finns just
					nu.
				</p>

				<dl>
					<dt>
						<h5>Nya roller</h5>
					</dt>
					<dd>
						- Fler roller som möjligör fler funktioner för flera
						användara bland annat lägga till recept
					</dd>
					<dt>
						<h5>Sökfunktion</h5>
					</dt>
					<dd>- Möjligheten att kunna söka efter recept</dd>
					<dt>
						<h5>Direktlänk till recept</h5>
					</dt>
					<dd>
						- Skapa direktlänkar till recept för att kunna dela
						eller spara recpet
					</dd>
					<dt>
						<h5>Flera inköpslistor</h5>
					</dt>
					<dd>
						- Möjligheten att kunna namnge och skapa flera olika
						inköpslistor
					</dd>
				</dl>
			</div>
			<div className='col-12'>Version: {appVersion}</div>
		</div>
	);
};
