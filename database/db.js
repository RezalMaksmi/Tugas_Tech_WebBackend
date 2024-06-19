import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const testConnection = async () => {
  try {
    await db.getConnection();
    console.log("success connecting to db");
  } catch (e) {
    console.error("failed to connect to database: ", e);
  }
};

const query = async (command, values) => {
  try {
    const [result] = await db.query(command, values ?? []);
    return result;
  } catch (e) {
    console.error(e);
  }
};

export { testConnection, query };
