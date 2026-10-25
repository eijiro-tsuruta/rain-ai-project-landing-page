import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import proxy from '../proxy.js';

test('production configuration invokes the probe guard', async () => {
  const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url)));
  assert.equal(config.proxy.entrypoint, 'proxy.js');
  assert.equal(config.cleanUrls, true);
});

test('probe requests are rejected even when claiming to be a search crawler', async () => {
  for (const path of ['/.env', '/.env.local', '/.git/config', '/.svn/entries', '/.hg/store', '/wp-login.php', '/wp-admin/', '/blog/wp-content/plugins/', '/xmlrpc.php', '/shell.phtml', '/WP-LOGIN.PHP', '/%2eenv', '/%2egit%2fconfig', '/blog%5cwp-admin/', '/index.php/extra', '/index.php;extra', '/%ZZ']) {
    for (const method of ['GET', 'HEAD', 'POST']) {
      const response = proxy(new Request('https://www.rainaiproject.com' + path, { method, headers: { 'User-Agent': 'Googlebot' } }));
      assert.equal(response.status, 403, `${method} ${path}`);
      assert.equal(response.headers.get('Cache-Control'), 'no-store');
      assert.equal(response.headers.get('X-Robots-Tag'), 'noindex');
      assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
      if (method === 'HEAD') assert.equal(await response.text(), '');
    }
  }
});

test('normal pages, crawler resources and the chat API continue without challenges', () => {
  for (const agent of ['Applebot', 'Googlebot', 'Google-InspectionTool', 'Mozilla/5.0', '']) {
    for (const path of ['/', '/robots.txt', '/sitemap.xml', '/privacy', '/terms', '/blog', '/products/rain-field', '/favicon.ico', '/chatbot.js', '/og-rain-ai.png', '/google717249a4a0dd8e9c.html', '/.well-known/security.txt', '/?next=/wp-login.php', '/privacy?file=.env']) {
      for (const method of ['GET', 'HEAD']) {
        assert.equal(proxy(new Request('https://www.rainaiproject.com' + path, { method, headers: { 'User-Agent': agent } })), undefined, `${agent} ${method} ${path}`);
      }
    }
  }
  for (const method of ['POST', 'OPTIONS', 'GET']) {
    assert.equal(proxy(new Request('https://www.rainaiproject.com/api/chat', { method })), undefined);
  }
});
