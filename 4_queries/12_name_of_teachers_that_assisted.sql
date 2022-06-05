-- SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort FROM teachers
--   JOIN assistance_requests ON teacher_id = teachers.id
--   JOIN students ON student_id = students.id
--   JOIN cohorts ON cohort_id = cohorts.id
--   WHERE cohorts.name = 'JUL02'
--   ORDER BY teacher

SELECT teachers.name as teacher, cohorts.name as cohort FROM teachers
  JOIN assistance_requests ON teacher_id = teachers.id
  JOIN students ON students.id = assistance_requests.student_id 
  JOIN cohorts ON cohort_id = cohorts.id
  WHERE cohorts.name = 'JUL02'
  GROUP BY teacher, cohort
  ORDER BY teacher