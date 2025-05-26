import { PGliteWorker } from '@electric-sql/pglite/worker';

let dbInstance: PGliteWorker | null = null;

const initSchema = async (db: PGliteWorker) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      dateOfBirth TEXT NOT NULL,
      gender TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      address TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_patient_name ON patients (lastName, firstName);
  `);
};

export const getDatabase = async (): Promise<PGliteWorker> => {
  if (!dbInstance) {
    try {
      const workerInstance = new Worker(new URL('/database-worker.js', import.meta.url), {
        type: 'module',
      });
      dbInstance = new PGliteWorker(workerInstance);
      await initSchema(dbInstance);
    } catch (error) {
      console.error("Failed to initialize database:", error);
      throw error;
    }
  }
  return dbInstance;
};
