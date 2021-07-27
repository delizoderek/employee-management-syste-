-- SELECT * FROM department;

-- SELECT role.id, role.title, department.name AS department, role.salary
-- FROM role
-- JOIN department ON role.department_id=department.id;

-- SELECT
--     e.id,
--     concat(e.first_name," ",e.last_name) AS Employee,
--     role.title,
--     concat(m.first_name," ",m.last_name) AS Manager
-- FROM
--     employee e
-- LEFT JOIN employee m ON m.id = e.manager_id
-- JOIN role ON e.role_id=role.id
-- JOIN department ON role.department_id=department.id;
