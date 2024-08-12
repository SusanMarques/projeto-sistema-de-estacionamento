const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sistemaSmartPark',
    password: 'BemVindo!',
    port: 5432,
});

module.exports = pool;