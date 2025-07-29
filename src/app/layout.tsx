import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Gondar Health Professionals Charity Association',
	description: 'GHPCA Main Website',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className='antialiased'>{children}</body>
		</html>
	);
}
