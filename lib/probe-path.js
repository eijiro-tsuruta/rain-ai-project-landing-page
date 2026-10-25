// Check paths only: never block a country, crawler name or query parameter.
export function isProbePath(pathname) {
  let path;
  try { path = decodeURIComponent(pathname).replaceAll('\\', '/').toLowerCase(); }
  catch { return true; }
  return /(?:^|\/)\.(?:env(?:[./]|$)|git(?:\/|$)|svn(?:\/|$)|hg(?:\/|$))/.test(path)
    || /(?:^|\/)(?:wp-admin|wp-content|wp-includes)(?:\/|$)/.test(path)
    || /\.(?:php[0-9]?|phtml|phar)(?:[/.;]|$)/.test(path);
}
