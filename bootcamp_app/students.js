const { Pool } = require('pg');

const pool = new Pool({
  user: 'billy',
  password: 'psql',
  host: 'localhost',
  database: 'bootcampx'
});

// query the database
pool.query(`
SELECT students.id, students.name, cohorts.name as cohort FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE UPPER(cohorts.name) LIKE UPPER('%${process.argv[2]}%')
LIMIT ${process.argv[3] || 5};
`)
  .then(res => res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
  }))
  .catch(err => console.error('query error', err.stack))
