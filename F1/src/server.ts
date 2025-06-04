import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import mysql from 'mysql2/promise';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

const dbPromise = mysql.createPool({
  host: process.env['MYSQL_HOST'] || 'localhost',
  user: process.env['MYSQL_USER'] || 'root',
  password: process.env['MYSQL_PASSWORD'] || 'password',
  database: process.env['MYSQL_DATABASE'] || 'f1',
});

app.get('/api/drivers', async (_req, res) => {
  try {
    const db = await dbPromise.getConnection();
    const [rows] = await db.query('SELECT * FROM drivers');
    db.release();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drivers' });
  }
});

app.get('/api/teams', async (_req, res) => {
  try {
    const db = await dbPromise.getConnection();
    const [rows] = await db.query('SELECT * FROM teams');
    db.release();
    const teams = (rows as any[]).map((r) => ({
      id: r.id,
      name: r.name,
      nameEn: r.name_en,
      logo: r.logo,
      car: r.car,
      drivers: JSON.parse(r.drivers_json || '[]'),
    }));
    res.json(teams);
  } catch {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

app.get('/api/calendar', async (_req, res) => {
  try {
    const db = await dbPromise.getConnection();
    const [rows] = await db.query('SELECT * FROM calendar ORDER BY date');
    db.release();
    const calendar = (rows as any[]).map((r) => ({
      id: r.id,
      name: r.name,
      country: r.country,
      countryCode: r.country_code,
      location: r.location,
      date: r.date,
      circuit: r.circuit,
      sessions: JSON.parse(r.sessions_json || '[]'),
      isPast: !!r.is_past,
      hasResults: !!r.has_results,
    }));
    res.json(calendar);
  } catch {
    res.status(500).json({ error: 'Failed to fetch calendar' });
  }
});

app.get('/api/standings/drivers', async (_req, res) => {
  try {
    const db = await dbPromise.getConnection();
    const [rows] = await db.query('SELECT * FROM driver_standings ORDER BY position');
    db.release();
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Failed to fetch standings' });
  }
});

app.get('/api/standings/constructors', async (_req, res) => {
  try {
    const db = await dbPromise.getConnection();
    const [rows] = await db.query('SELECT * FROM constructor_standings ORDER BY position');
    db.release();
    const data = (rows as any[]).map((r) => ({
      position: r.position,
      constructor: r.constructor,
      points: r.points,
      wins: r.wins,
      podiums: r.podiums,
      country: r.country,
      countryCode: r.country_code,
      drivers: JSON.parse(r.drivers_json || '[]'),
    }));
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch standings' });
  }
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
