import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

// Initialize MySQL Pool if environment variables are present
export function getDbPool(): mysql.Pool | null {
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME;
  const port = parseInt(process.env.DB_PORT || "3306", 10);

  if (!host || !user || !database) {
    return null; // Missing config, fallback to file-system JSON database
  }

  if (!pool) {
    try {
      pool = mysql.createPool({
        host,
        user,
        password,
        database,
        port,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
      console.log("MySQL Connection Pool successfully initialized.");
    } catch (error) {
      console.error("Failed to initialize MySQL Connection Pool:", error);
      pool = null;
    }
  }

  return pool;
}

// Check database connectivity
export async function isDbActive(): Promise<boolean> {
  const activePool = getDbPool();
  if (!activePool) return false;
  try {
    const conn = await activePool.getConnection();
    conn.release();
    return true;
  } catch (error) {
    console.error("Database connection check failed:", error);
    return false;
  }
}
