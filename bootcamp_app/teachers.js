const {Pool} = require('pg');

const pool = new Pool({
  user: 'billy',
  password: 'psql',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const values = [`%${cohortName}%`];

const queryString = `
SELECT DISTINCT cohorts.name as cohort, teachers.name FROM cohorts
JOIN students ON cohort_id = cohorts.id
JOIN assistance_requests ON student_id = students.id
JOIN teachers ON teacher_id = teachers.id
WHERE UPPER(cohorts.name) LIKE UPPER($1)
`;

pool.query(queryString, values)
  .then(res => res.rows.forEach(user => {
    console.log(user.cohort, ':', user.name);
  }))
  .catch(err => console.error(err));