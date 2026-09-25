const mysql = require('mysql2/promise');

async function testRoot() {
  const configs = [
    { host: 'localhost', port: 3306, user: 'root', password: '' },
    { host: 'localhost', port: 3306, user: 'root', password: 'root' },
    { host: 'localhost', port: 3306, user: 'root', password: 'lovebite_root_secret_2026' },
    { host: 'localhost', port: 3306, user: 'lovebite', password: 'lovebite_secure_pass_2026' },
  ];

  for (const c of configs) {
    try {
      const conn = await mysql.createConnection(c);
      console.log(`Connected with user: ${c.user}, pass: ${c.password ? 'yes' : 'no'}`);
      const [dbs] = await conn.query('SHOW DATABASES');
      console.log('Databases:', dbs.map(d => Object.values(d)[0]));
      await conn.end();
      return;
    } catch (e) {
      console.log(`Failed user: ${c.user}, pass: ${c.password ? 'yes' : 'no'} - ${e.code || e.message}`);
    }
  }
}

testRoot();
