const mysql = require("mysql2/promise");
const util = require("util");

const config = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "company_db",
};
const conn = await mysql.createConnection(config);

const getDepartments = async () => {
  const [rows, fields] = await conn.execute("SELECT * FROM department");
  // await conn.end();
  return rows;
};

const getRoles = async () => {
  // const conn = await mysql.createConnection(config);
  const [rows, fields] = await conn.execute(
    "SELECT department.id,title,name AS department,salary FROM role JOIN department ON role.id = department.id;"
  );
  // await conn.end();
  return rows;
};

const getEmployees = async () => {
  const query = `SELECT
    e.id,
    concat(e.first_name," ",e.last_name) AS Employee,
    role.title,
    concat(m.first_name," ",m.last_name) AS Manager
FROM
    employee e
LEFT JOIN employee m ON m.id = e.manager_id
JOIN role ON e.role_id=role.id
JOIN department ON role.department_id=department.id;`;
  const conn = await mysql.createConnection(config);
  const [rows, fields] = await conn.execute(query);
  // await conn.end();
  return rows;
};
const endConnection = () => {
  await conn.end();
}
const addDepartment = async (departmentName) => {
  console.log('Add a Department');
};

const addRole = async (roleTitle,departmentName) => {
  console.log('Add a Department');
};

const addEmployee = async (employeeName,roleTitle,departmentName) => {
  console.log('Add a Department');
};

module.exports = {
  getDepartments,
  getRoles,
  getEmployees,
  endConnection
};
