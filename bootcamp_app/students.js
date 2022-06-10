const {Pool} = require('pg');

const pool = new Pool({
  user: 'billy',
  password: 'psql',
  host: 'localhost',
  database: 'bootcampx'
});

// query the database
const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohortName}%`, limit];

const queryString = `
SELECT students.id, students.name, cohorts.name as cohort FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE UPPER(cohorts.name) LIKE UPPER($1)
LIMIT $2;
`;

pool.query(queryString, values)
  .then(res => res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
  }))
  .catch(err => console.error('query error', err.stack));
