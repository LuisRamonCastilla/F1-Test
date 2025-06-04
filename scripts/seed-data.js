import mysql from 'mysql2/promise';

const pool = await mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'f1',
});

await pool.execute(`
CREATE TABLE IF NOT EXISTS teams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  name_en VARCHAR(255),
  logo VARCHAR(255),
  car VARCHAR(255),
  drivers_json TEXT
)`);

await pool.execute(`
CREATE TABLE IF NOT EXISTS calendar (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  country VARCHAR(255),
  country_code VARCHAR(10),
  location VARCHAR(255),
  date DATE,
  circuit VARCHAR(255),
  sessions_json TEXT,
  is_past BOOLEAN,
  has_results BOOLEAN
)`);

await pool.execute(`
CREATE TABLE IF NOT EXISTS driver_standings (
  position INT PRIMARY KEY,
  driver VARCHAR(255),
  team VARCHAR(255),
  points INT,
  wins INT,
  podiums INT,
  country VARCHAR(255),
  country_code VARCHAR(10)
)`);

await pool.execute(`
CREATE TABLE IF NOT EXISTS constructor_standings (
  position INT PRIMARY KEY,
  constructor VARCHAR(255),
  points INT,
  wins INT,
  podiums INT,
  country VARCHAR(255),
  country_code VARCHAR(10),
  drivers_json TEXT
)`);

// sample teams
const teams = [
  {
    name: 'Red Bull Racing',
    nameEn: 'Red Bull Racing',
    logo: 'https://www.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing-logo.png',
    car: 'https://www.formula1.com/content/dam/fom-website/manual/Misc/2024manual/RedBull.jpg.transform/9col/image.jpg',
    drivers: [
      { name: 'Max Verstappen', nameEn: 'Max Verstappen', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/verstappen.jpg.transform/2col/image.jpg' },
      { name: 'Sergio Pérez', nameEn: 'Sergio Perez', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/perez.jpg.transform/2col/image.jpg' }
    ]
  },
  {
    name: 'Ferrari',
    nameEn: 'Ferrari',
    logo: 'https://www.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png',
    car: 'https://www.formula1.com/content/dam/fom-website/manual/Misc/2024manual/Ferrari.jpg.transform/9col/image.jpg',
    drivers: [
      { name: 'Charles Leclerc', nameEn: 'Charles Leclerc', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/leclerc.jpg.transform/2col/image.jpg' },
      { name: 'Carlos Sainz', nameEn: 'Carlos Sainz', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/sainz.jpg.transform/2col/image.jpg' }
    ]
  },
  {
    name: 'Mercedes',
    nameEn: 'Mercedes',
    logo: 'https://www.formula1.com/content/dam/fom-website/teams/2024/mercedes-logo.png',
    car: 'https://www.formula1.com/content/dam/fom-website/manual/Misc/2024manual/Mercedes.jpg.transform/9col/image.jpg',
    drivers: [
      { name: 'Lewis Hamilton', nameEn: 'Lewis Hamilton', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/hamilton.jpg.transform/2col/image.jpg' },
      { name: 'George Russell', nameEn: 'George Russell', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/russell.jpg.transform/2col/image.jpg' }
    ]
  }
];

for (const t of teams) {
  await pool.execute(
    'REPLACE INTO teams (name, name_en, logo, car, drivers_json) VALUES (?, ?, ?, ?, ?)',
    [t.name, t.nameEn, t.logo, t.car, JSON.stringify(t.drivers)]
  );
}

// sample calendar events
const calendar = [
  {
    id: 1,
    name: 'Gran Premio de Bahrain',
    country: 'Bahrain',
    countryCode: 'bh',
    location: 'Sakhir',
    date: '2025-03-16',
    circuit: 'Circuito Internacional de Bahrain',
    sessions: [
      { name: 'Práctica Libre 1', date: '2025-03-14', time: '11:30' },
      { name: 'Práctica Libre 2', date: '2025-03-14', time: '15:00' },
      { name: 'Práctica Libre 3', date: '2025-03-15', time: '11:30' },
      { name: 'Clasificación', date: '2025-03-15', time: '15:00' },
      { name: 'Carrera', date: '2025-03-16', time: '15:00' }
    ],
    isPast: true,
    hasResults: true
  },
  {
    id: 2,
    name: 'Gran Premio de Arabia Saudí',
    country: 'Saudi Arabia',
    countryCode: 'sa',
    location: 'Jeddah',
    date: '2025-03-23',
    circuit: 'Circuito Urbano de Jeddah',
    sessions: [
      { name: 'Práctica Libre 1', date: '2025-03-21', time: '13:30' },
      { name: 'Práctica Libre 2', date: '2025-03-21', time: '17:00' },
      { name: 'Práctica Libre 3', date: '2025-03-22', time: '13:30' },
      { name: 'Clasificación', date: '2025-03-22', time: '17:00' },
      { name: 'Carrera', date: '2025-03-23', time: '17:00' }
    ],
    isPast: true,
    hasResults: true
  },
  {
    id: 3,
    name: 'Gran Premio de Australia',
    country: 'Australia',
    countryCode: 'au',
    location: 'Melbourne',
    date: '2025-04-06',
    circuit: 'Circuito de Albert Park',
    sessions: [
      { name: 'Práctica Libre 1', date: '2025-04-04', time: '01:30' },
      { name: 'Práctica Libre 2', date: '2025-04-04', time: '05:00' },
      { name: 'Práctica Libre 3', date: '2025-04-05', time: '01:30' },
      { name: 'Clasificación', date: '2025-04-05', time: '05:00' },
      { name: 'Carrera', date: '2025-04-06', time: '05:00' }
    ],
    isPast: true,
    hasResults: true
  }
];

for (const gp of calendar) {
  await pool.execute(
    'REPLACE INTO calendar (id, name, country, country_code, location, date, circuit, sessions_json, is_past, has_results) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [gp.id, gp.name, gp.country, gp.countryCode, gp.location, gp.date, gp.circuit, JSON.stringify(gp.sessions), gp.isPast, gp.hasResults]
  );
}

// sample driver standings
const driverStandings = [
  { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', points: 156, wins: 4, podiums: 6, country: 'Netherlands', countryCode: 'nl' },
  { position: 2, driver: 'Lando Norris', team: 'McLaren', points: 128, wins: 2, podiums: 5, country: 'United Kingdom', countryCode: 'gb' },
  { position: 3, driver: 'Charles Leclerc', team: 'Ferrari', points: 115, wins: 1, podiums: 4, country: 'Monaco', countryCode: 'mc' }
];

for (const d of driverStandings) {
  await pool.execute(
    'REPLACE INTO driver_standings (position, driver, team, points, wins, podiums, country, country_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [d.position, d.driver, d.team, d.points, d.wins, d.podiums, d.country, d.countryCode]
  );
}

// sample constructor standings
const constructorStandings = [
  { position: 1, constructor: 'Red Bull Racing', points: 231, wins: 4, podiums: 8, country: 'Austria', countryCode: 'at', drivers: ['Max Verstappen', 'Sergio Pérez'] },
  { position: 2, constructor: 'McLaren', points: 226, wins: 2, podiums: 8, country: 'United Kingdom', countryCode: 'gb', drivers: ['Lando Norris', 'Oscar Piastri'] },
  { position: 3, constructor: 'Ferrari', points: 201, wins: 1, podiums: 6, country: 'Italy', countryCode: 'it', drivers: ['Charles Leclerc', 'Carlos Sainz'] }
];

for (const c of constructorStandings) {
  await pool.execute(
    'REPLACE INTO constructor_standings (position, constructor, points, wins, podiums, country, country_code, drivers_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [c.position, c.constructor, c.points, c.wins, c.podiums, c.country, c.countryCode, JSON.stringify(c.drivers)]
  );
}

await pool.end();

console.log('Database seeded');
