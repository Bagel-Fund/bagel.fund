import BagelAnimation from '@/components/BagelAnimation';
import GranteesTable from '@/components/GranteesTable';
import granteesData from '@/data/grantees.json';
import type {Grantee} from '@/types';

function getGrantees(): Grantee[] {
	// In Next.js, we can import JSON directly from data folder at build time
	return granteesData as Grantee[];
}

export default function Home() {
	const grantees = getGrantees();

	return (
		<div id="root">
			<BagelAnimation />
			<h1>Bagel Fund</h1>

			<div>
				<p>
					What is Bagel Fund? We&apos;re a friend group in tech that wants to support young people
					working on important problems with scrappy solutions.
				</p>
				<p>We give microgrants ($100-500) to ambitious young builders.</p>
				<p>Working on something cool and need some non-dilutive ideation capital? Apply below.</p>
				<p>
					<a
						href="https://ak-columbia.notion.site/2250cfd9eaa3809db298f27055556489?pvs=105"
						className="applyButton"
					>
						Apply
					</a>
				</p>
				<p>We&apos;ll get back to you via email in 48 hours if it&apos;s a good fit.</p>
				<p>
					<a href="https://bagelfund.substack.com/">Quarterly Grant Updates Here</a>
				</p>
			</div>

			<br />

			<div>
				<GranteesTable grantees={grantees} />

				<div style={{paddingTop: '20px'}}>
					<p>
						Reach out to{' '}
						<a
							href="mailto:aridutilh@gmail.com,alexa@kayman.ventures?subject=Bagel%20Grant%20Question"
							target="_blank"
							rel="noopener noreferrer"
						>
							Ari and Alexa
						</a>{' '}
						if you have questions about your application. Bagel Fund was founded by:
					</p>

					<ul className="grantees">
						<li>
							<a href="https://twitter.com/nebulatgs" target="_blank" rel="noopener noreferrer">
								Adarsh Krishna
							</a>
						</li>
						<li>
							<a href="https://twitter.com/alistaiir" target="_blank" rel="noopener noreferrer">
								Alistair Smith
							</a>
						</li>
						<li>
							<a href="https://twitter.com/alexakayman" target="_blank" rel="noopener noreferrer">
								Alexa Kayman
							</a>
						</li>
						<li>
							<a href="https://twitter.com/nijmehvm" target="_blank" rel="noopener noreferrer">
								Andrew Nijmeh
							</a>
						</li>
						<li>
							<a href="https://twitter.com/aridutilh" target="_blank" rel="noopener noreferrer">
								Ari Dutilh
							</a>
						</li>
						<li>
							<a href="https://twitter.com/brandonsaldan" target="_blank" rel="noopener noreferrer">
								Brandon Saldan
							</a>
						</li>
						<li>
							<a href="https://twitter.com/devlooskie" target="_blank" rel="noopener noreferrer">
								Cody Miller
							</a>
						</li>
						<li>
							<a href="https://twitter.com/notcnrad" target="_blank" rel="noopener noreferrer">
								Conrad Crawford
							</a>
						</li>
						<li>
							<a href="https://twitter.com/landon_xyz" target="_blank" rel="noopener noreferrer">
								Landon Boles
							</a>
						</li>
						<li>
							<a href="https://twitter.com/m1guelpf" target="_blank" rel="noopener noreferrer">
								Miguel Piedrafita
							</a>
						</li>
						<li>
							<a
								href="https://twitter.com/roberttwestbury"
								target="_blank"
								rel="noopener noreferrer"
							>
								Robert Westbury
							</a>
						</li>
						<li>
							<a href="https://twitter.com/suptejas" target="_blank" rel="noopener noreferrer">
								Tejas Ravishankar
							</a>
						</li>
					</ul>
				</div>

				<div style={{paddingTop: '20px'}}>
					<p>Want to help us make young people&apos;s dreams come true? Become a donor.</p>

					<div className="donationCards">
						<div className="donationCard">
							<h2>Donate $53</h2>
							<p>Recurring donation funding the next generation of builders</p>
							<a
								href="https://buy.stripe.com/6oEdUi9Dw7kA11eeUY"
								target="_blank"
								rel="noopener noreferrer"
							>
								Donate
							</a>
						</div>
						<div className="donationCard">
							<h2>Donate $105</h2>
							<p>Recurring donation funding the next generation of builders</p>
							<a
								href="https://buy.stripe.com/14kaI63f87kA7pC9AC"
								target="_blank"
								rel="noopener noreferrer"
							>
								Donate
							</a>
						</div>
						<div className="donationCard">
							<h2>Donate $208</h2>
							<p>Recurring donation funding the next generation of builders</p>
							<a
								href="https://buy.stripe.com/cN2dUi9Dw9sI5hubIL"
								target="_blank"
								rel="noopener noreferrer"
							>
								Donate
							</a>
						</div>
					</div>

					<p className="donationNote">
						Your donations are tax deductible thanks to our partner 501(c)3 nonprofit with EIN
						99-1405564. Thank you for supporting young builders working on important problems with
						scrappy solutions.
					</p>
				</div>

				<p style={{paddingTop: '8rem'}}>
					Bagel Fund is a 501(c)3 nonprofit. EIN: 33-2899896.
				</p>
				<p>
					<a
						href="https://www.youtube.com/watch?v=_u2B3yDnxKg&ab_channel=rebelstasia"
						target="_blank"
						rel="noopener noreferrer"
					>
						get sucked into the bagel
					</a>
				</p>
			</div>
		</div>
	);
}
