const mysql = require("mysql2/promise");
const util = require("util");

function SqlQueries() {
  this.config = {
    host: "localhost",
    user: "root",
    password: "password",
    database: "company_db",
  };
  this.db = mysql.createConnection(this.config);
};

SqlQueries.prototype.getDepartments = async (conn) => {
  const [rows, fields] = await conn.execute("SELECT * FROM department");
  return rows;
};

SqlQueries.prototype.getRoles = async (conn) => {
  const query = `SELECT role.id, role.title, department.name AS department, role.salary
                FROM role
                JOIN department ON role.department_id=department.id;`;
  const [rows, fields] = await conn.execute(query);
  return rows;
};

SqlQueries.prototype.getEmployees = async (conn) => {
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
  const [rows, fields] = await conn.query(query);
  return rows;
};

SqlQueries.prototype.departmentId = async (conn,departmentName) => {
  try{
    const [rows,fields] = await conn.execute("SELECT id FROM department WHERE name=?",[departmentName]);
    return rows[0].id;
  } catch (error){
    console.log(error);
    return -1;
  }
};

SqlQueries.prototype.roleId = async (conn,roleName) => {
  try{
    const [rows,fields] = await conn.execute("SELECT id FROM role WHERE title=?",[roleName]);
    return rows[0].id;
  } catch (error){
    return -1;
  }
};

SqlQueries.prototype.employeeId = async (conn,fullName) => {
  if(fullName === 'None'){
    return null;
  }
  let [first,last] = fullName.split(" ");
  first=first.trim();
  last=last.trim();
  try{
    const [rows,fields] = await conn.execute("SELECT id FROM employee WHERE first_name=? AND last_name=?;",[first,last]);
    return rows[0].id;
  } catch (error){
    return -1;
  }
};

SqlQueries.prototype.endConnection = async (conn) => {
  await conn.end();
};
SqlQueries.prototype.addDepartment = async (conn,departmentName) => {
  try {
    const [rows,fields] = await conn.execute('INSERT INTO department (name) VALUES (?)',[departmentName]);
    console.log('New department added succesfully');
  } catch (error) {
    console.log('New department not added');
  }
};

SqlQueries.prototype.addRole = async (conn,roleTitle, salary,department_id) => {
  try {
    const [rows,fields] = await conn.execute('INSERT INTO role (title,salary,department_id) VALUES (?,?,?)',[roleTitle,salary,department_id]);
    return true;
  } catch (error) {
    console.log(error);
    console.log("Employee could not be added");
    return false;
  }
};

SqlQueries.prototype.addEmployee = async (conn,first_name,last_name, role_id, manager_id) => {
  try {
    const [rows,fields] = await conn.execute('INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)',[first_name,last_name,role_id,manager_id]);
    return true;
  } catch (error) {
    console.log(error);
    console.log("Employee could not be added");
    return false;
  }
};

SqlQueries.prototype.updateEmployee = async (conn,employeeId,newRole) => {
  try {
    const [row,fields] = await conn.execute("UPDATE employee SET role_id=? WHERE employee.id=?",[newRole,employeeId]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = SqlQueries;
