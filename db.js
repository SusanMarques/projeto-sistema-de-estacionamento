const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sistemaSmartPark',
    password: '91646861',
    port: 5432,
});

module.exports = pool;