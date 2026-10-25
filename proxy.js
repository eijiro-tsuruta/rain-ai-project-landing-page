import { isProbePath } from './lib/probe-path.js';

export default function proxy(request) {
  if (isProbePath(new URL(request.url).pathname)) {
    return new Response(request.method === 'HEAD' ? null : 'Forbidden', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      }
    });
  }
  // No response continues to the site's existing static pages and chat API.
}
