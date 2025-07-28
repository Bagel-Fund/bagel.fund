window.BAGEL_SPEED = 0.2; // lower = slower

let A = 1;
let B = 1;

const renderAsciiFrame = preTag => {
	const width = 280;
	const height = 160;
	const b = Array(width * height).fill(' ');
	const z = Array(width * height).fill(0);

	A += 0.07 * window.BAGEL_SPEED;
	B += 0.03 * window.BAGEL_SPEED;

	const [cA, sA, cB, sB] = [Math.cos(A), Math.sin(A), Math.cos(B), Math.sin(B)];

	// Set newline characters at the end of each row
	for (let k = width - 1; k < width * height; k += width) {
		b[k] = '\n';
	}

	for (let j = 0; j < 2 * Math.PI; j += 0.07) {
		const ct = Math.cos(j);
		const st = Math.sin(j);

		for (let i = 0; i < 2 * Math.PI; i += 0.02) {
			const sp = Math.sin(i);
			const cp = Math.cos(i);
			const h = ct + 2;
			const D = 1 / (sp * h * sA + st * cA + 5);
			const t = sp * h * cA - st * sA;

			const x = Math.floor(width / 2 + (width / 4) * D * (cp * h * cB - t * sB));
			const y = Math.floor(height / 2 + (height / 4) * D * (cp * h * sB + t * cB));

			const o = x + width * y;
			const N = Math.floor(
				8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB),
			);

			if (y < height && y >= 0 && x >= 0 && x < width && D > z[o]) {
				z[o] = D;
				b[o] = '.,-bagelfund'[Math.max(0, N)];
				// b[o] = '`·╌░▏▎▍▌▋▊▉█'[Math.max(0, N)];
				// b[o] = '.,-~:;=!*#$@'[Math.max(0, N)];
			}
		}
	}

	preTag.innerHTML = b.join('');

	requestAnimationFrame(() => renderAsciiFrame(preTag));
};

document.addEventListener('DOMContentLoaded', () => {
	const preTag = document.querySelector('#bagel');
	renderAsciiFrame(preTag);
});
