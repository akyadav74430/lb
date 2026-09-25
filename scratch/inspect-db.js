const fs = require('fs');

const env = fs.readFileSync('.env', 'utf8');
const envDoc = fs.readFileSync('.env.docker', 'utf8');

function parseDbUrl(txt) {
  const line = txt.split(/\r?\n/).find(l => l.startsWith('DATABASE_URL='));
  if (!line) return null;
  const raw = line.replace('DATABASE_URL=', '').trim().replace(/^["']|["']$/g, '');
  try {
    const u = new URL(raw);
    return {
      protocol: u.protocol,
      user: u.username,
      passLen: u.password ? u.password.length : 0,
      host: u.host,
      pathname: u.pathname,
      rawStart: raw.substring(0, 15)
    };
  } catch (err) {
    return { error: err.message };
  }
}

console.log('.env:', parseDbUrl(env));
console.log('.env.docker:', parseDbUrl(envDoc));
