import './measurement.css';

const MeasurementsComponent = () => {
	return (
		<div className='grid' id='topContainer'>
			<div className='col-12'>
				<h3 className='title'>Måttenheter tabeller</h3>
			</div>
			<div className='col-12'>
				<table className='darkTable'>
					<tbody>
						<tr>
							<td>Deciliter</td>
							<td>dl</td>
							<td>1 dl = 20 tsk = 100 ml</td>
						</tr>
						<tr>
							<td>Matsked</td>
							<td>msk</td>
							<td>1 msk = 3 tsk = 15 ml</td>
						</tr>
						<tr>
							<td>Tesked</td>
							<td>tsk</td>
							<td>1 tsk = 5 krm = 5 ml</td>
						</tr>
						<tr>
							<td>Kryddm&aring;tt</td>
							<td>krm</td>
							<td>1 krm = 1 ml</td>
						</tr>
						<tr>
							<td>Kaffekopp</td>
							<td>kkp</td>
							<td>1 kkp = 1,5 dl = 150 ml</td>
						</tr>
						<tr>
							<td>Glas</td>
							<td>glas</td>
							<td>1 glas = 2 dl = 200 ml</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className='col-12'>
				<h3 className='title'>Måttenheter i hushållet</h3>
			</div>
			<div className='col-3'>
				<div className='article-sub-content'>
					<div className='text'>
						<h4>
							<strong>Vikt:</strong>
						</h4>
						<p>1 kilo (kg) = 1 000 g</p>
						<p>1 gram (g) = 1 000 mg</p>
						<p>1 milligram (mg) = 0.001 g</p>
						<p>
							<strong>Volym:</strong>
						</p>
						<p>1 liter (l) = 10 dl = 100 cl = 1 000 ml</p>
						<p>1 deciliter (dl) = 10 cl = 100 ml</p>
						<p>1 centiliter (cl) = 10 ml</p>
						<p>1 milliliter (ml) = 0.001 l</p>
						<p>50g smält fett (eller flytande) = ca. 0,5 dl</p>
						<p>1 äggula = ca 1 msk</p>
						<p>1 äggvita = ca 2 msk</p>
						<p>3 äggvitor = ca 1 dl</p>
					</div>
				</div>
			</div>
			<div className='col-3'>
				<div className='article-sub-content'>
					<h3 className='title'>Måttsatsens enheter</h3>
				</div>
				<div className='article-sub-content'>
					<div className='text'>
						<p>1 dl = 6,7 msk = 100 ml</p>
						<p>1 matsked (msk) = 3 tsk = 15 ml</p>
						<p>1 tesked (tsk) = 5 kryddmått = 5 ml</p>
						<p>1 kryddmått = 1 ml</p>
					</div>
				</div>
			</div>
			<div className='col-3'>
				<div className='article-sub-content'>
					<h3 className='title'>I äldre recept</h3>
				</div>
				<div className='article-sub-content'>
					<div className='text'>
						<p>1 tekopp (tkp) = ca 2.5 dl</p>
						<p>1 kaffekopp (kkp) = ca 1.5 dl</p>
						<p>
							<strong>Stycketal</strong>
						</p>
						<p>1 gross = 12 dussin</p>
						<p>1 dussin = 12 st</p>
						<p>1 tjog = 20 st</p>
					</div>
				</div>
			</div>
			<div className='col-3'>
				<div className='article-sub-content'>
					<h3 className='title'>
						Tips &amp; smarta lösningar till köket
					</h3>
				</div>
				<div className='article-sub-content'>
					<div className='text'>
						<p>
							<strong>
								<span className='smallvignettespassive'>
									Såsredningar{' '}
								</span>
							</strong>
						</p>
						<ul>
							<li>Sås 1 dl vätska + 0,5 msk vetemjöl</li>
							<li>Gratängsås 1 dl vätska + ¾ msk vetemjöl</li>
							<li>Stuvning 1 dl vätska + 1 msk vetemjöl</li>
						</ul>
						<p>
							<strong>
								<span className='smallvignettespassive'>
									Smått &amp; Gott
								</span>
							</strong>
						</p>
						<ul>
							<li>1 blad gelatin = 0,5 tsk gelatinpulver</li>
							<li>500 g kaffe räcker till ca 50 koppar</li>
							<li>50 g te räcker till ca 20 koppar</li>
							<li>1 tärning buljong löses i 1/2 l vatten</li>
						</ul>
						<p>
							<strong>Så gör du en 3-2-1 lag!</strong>
						</p>
						<ul>
							<li>1 dl ättiksprit (12 %)</li>
							<li>2 dl strösocker</li>
							<li>3 dl vatten</li>
						</ul>
						<p>
							Koka upp alla ingredienser i en kastrull. Rör om så
							att sockret löser sig. Häll lagen över tunt skivade
							grönsaker eller rotfrukter i väl rengjorda burkar
							och låt svalna. Förvara i kyl!
						</p>
					</div>
				</div>
			</div>
			<div className='col-12'>
				<h3 className='title'>Engelska och amerikanska mått </h3>
			</div>
			<div className='col-3'>
				<div className='article-sub-content'>
					<div className='text'>
						<p>
							<strong>Vikt</strong>
						</p>
						<p>
							1 hundred weight (Brit cwt) = 112 pounds = 50,8 kg
						</p>
						<p>1 US Centerweight (US cwt) = 100 pounds = 45,4 kg</p>
						<p>1 stone = 14 pounds = 6,35 kg</p>
						<p>1 pound (lb) = 16 ounces = 453,6 g</p>
						<p>1 ounce (o) = 28,35 g</p>
						<p>1 grain = 65 mg</p>
					</div>
				</div>
			</div>

			<div className='col-3'>
				<p>
					<strong>Volym (amerikansk)</strong>
				</p>
				<p>1 US gallon = 4 liquid quarts = 3,7851</p>
				<p>1 liquid quart = 2 liquid pints = 9,5 dl</p>
				<p>1 liquid pint = 16 US fl.oz = 4,73 dl</p>
				<p>1 liquid pint = 2 cups = 4,73 dl</p>
				<p>1 cup = 8 US fl oz = 2.37 dl</p>
				<p>1 US fluid ounce (US fl oz) = 29,6 ml</p>
				<p>1 dry quart = 2 dry pints = 1,1 l</p>
				<p>1 dry pint = 5,51 dl</p>
			</div>
			<div className='col-3'>
				<p>
					<strong>Volym (engelsk)</strong>
				</p>
				<p>1 imperial gallon = 4,55 l</p>
				<p>1 pint = 2 cups = 5,68 dl</p>
				<p>1 cup = 10 Brit fl oz = 2,84 dl</p>
				<p>1 British fluid ounce (Brit fl oz) = 28,4 ml</p>
			</div>
		</div>
	);
};

export default MeasurementsComponent;
