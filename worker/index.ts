export default {
  fetch(request) {
    const { pathname } = new URL(request.url)

    // Only the API and log routes reach the Worker (see run_worker_first in wrangler.jsonc).
    if (pathname.startsWith('/api/') || pathname === '/log' || pathname.startsWith('/log/')) {
      return Response.json({ error: 'not_found' }, { status: 404 })
    }

    return new Response(null, { status: 404 })
  },
} satisfies ExportedHandler<Env>
