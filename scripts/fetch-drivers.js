import mysql from 'mysql2/promise';
import fetch from 'node-fetch';

const connection = await mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'f1'
});

await connection.execute(`
CREATE TABLE IF NOT EXISTS drivers (
  driver_number INT PRIMARY KEY,
  full_name VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  team_name VARCHAR(255),
  team_colour VARCHAR(20),
  headshot_url VARCHAR(255),
  country_code VARCHAR(10)
)`);

const driverNumbers = Array.from({ length: 99 }, (_, i) => i + 1);
for (const number of driverNumbers) {
  try {
    const res = await fetch(`https://api.openf1.org/v1/drivers?driver_number=${number}&session_key=9158`);
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      const d = data[0];
      await connection.execute(
        'REPLACE INTO drivers (driver_number, full_name, first_name, last_name, team_name, team_colour, headshot_url, country_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          d.driver_number,
          d.full_name,
          d.first_name,
          d.last_name,
          d.team_name,
          d.team_colour,
          d.headshot_url,
          d.country_code,
        ]
      );
      console.log('Saved driver', d.full_name);
    }
  } catch (err) {
    console.error('Failed to fetch driver', number, err.message);
  }
}

await connection.end();
