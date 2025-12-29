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
			return new Response(file);
		}

		// 404 for not found
		return new Response('Not Found', {status: 404});
	},
});

console.log(`🚀 Server running at http://localhost:${server.port}`);
