import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Bagel Fund',
	description: '$100-500 micro-grants for young ambitious builders.',
	openGraph: {
		title: 'Bagel Fund',
		description: '$100-500 micro-grants for young ambitious builders.',
		url: 'https://bagel.fund/',
		siteName: 'Bagel Fund',
		images: [
			{
				url: 'http://bagel.fund/og-image.webp',
				width: 1200,
				height: 630,
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Bagel Fund',
		description: '$100-500 micro-grants for young ambitious builders.',
		images: ['http://bagel.fund/og-image.webp'],
	},
	viewport: {
		width: 'device-width',
		initialScale: 1,
		maximumScale: 1,
		userScalable: false,
	},
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en">
			<head>
				<script async src="https://cdn.splitbee.io/sb.js"></script>
				<script async src="https://cdn.seline.com/seline.js" data-token="e20a4df338bf61a"></script>
			</head>
			<body>{children}</body>
		</html>
	);
}
