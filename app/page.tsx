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
				<div className="ctaRow">
					<a
						href="https://ak-columbia.notion.site/2250cfd9eaa3809db298f27055556489?pvs=105"
						className="applyButton"
					>
						Apply
					</a>
					<a
						href="https://x.com/bagelfund"
						className="xButton"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Follow Bagel Fund on X"
					>
						<svg
							viewBox="0 0 24 24"
							width="16"
							height="16"
							aria-hidden="true"
							fill="currentColor"
						>
							<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
						</svg>
					</a>
				</div>
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
						<li>
							<a href="https://twitter.com/AnaArsonist" target="_blank" rel="noopener noreferrer">
								Ana Howard
							</a>
						</li>
					</ul>
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
