import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: '24972497Vlad',
  host: 'localhost',
  port: 5432,
  database: 'test_db',
});

export default pool;
