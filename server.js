const server = Bun.serve({
	port: 3000,
	async fetch(request) {
		const url = new URL(request.url);
		let path = url.pathname;

		// Default to index.html
		if (path === '/') {
			path = '/index.html';
		}

		// Remove leading slash for file system
		const filePath = path.slice(1) || 'index.html';

		// Try to serve the file
		const file = Bun.file(filePath);
		const exists = await file.exists();
		if (exists) {
			// Set proper Content-Type headers
			const headers = new Headers();
			if (filePath.endsWith('.json')) {
				headers.set('Content-Type', 'application/json');
			} else if (filePath.endsWith('.html')) {
				headers.set('Content-Type', 'text/html');
			} else if (filePath.endsWith('.css')) {
				headers.set('Content-Type', 'text/css');
			} else if (filePath.endsWith('.js')) {
				headers.set('Content-Type', 'application/javascript');
			}
			return new Response(file, {headers});
		}

		// 404 for not found
		return new Response('Not Found', {status: 404});
	},
});

console.log(`🚀 Server running at http://localhost:${server.port}`);
