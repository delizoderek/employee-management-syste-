const mysql2 = require("mysql2/promise");
const mysql = require("mysql2");
const util = require("util");

class SqlQueries {
  constructor(passsword){
    this.config = {
      host: "localhost",
      user: "root",
      password: password,
      database: "company_db",
    };
    this.conn = mysql.createConnection(this.config);
  }

  async getDepartments(){
    const [rows, fields] = await this.conn.promise.execute("SELECT * FROM department");
    return rows;
  }
  async getRoles(){

  }
  async getEmployees(){

  }
  async (){

  }
  async (){

  }
  async (){

  }
  async (){

  }
  async (){

  }
  async (){

  }



};

function SqlQueries() {
  this.config = {
    host: "localhost",
    user: "root",
    password: "password",
    database: "company_db",
  };
  this.db = mysql2.createConnection(this.config);
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
    const [rows,fields] = await conn.query("SELECT id FROM department WHERE name=?",[departmentName]);
    return rows;
  } catch (error){
    return [];
  }
};

SqlQueries.prototype.roleId = async (conn,roleName) => {
  try{
    const [rows,fields] = await conn.query("SELECT id FROM role WHERE title=?",[roleName]);
    return rows;
  } catch (error){
    return [];
  }
};

SqlQueries.prototype.employeeId = async (conn,fullName) => {
  let [first,last] = fullName.split(" ");
  first=first.trim();
  last=last.trim();
  try{
    const [rows,fields] = await conn.execute("SELECT id FROM employee WHERE first_name=? AND last_name=?;",[first,last]);
    return rows;
  } catch (error){
    return [];
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
  console.log("Add a Department");
};

SqlQueries.prototype.addEmployee = async (conn,first_name,last_name, role_id, manager_id) => {
  try {
    const [rows,fields] = await conn.execute('INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)',[first_name,last_name,role_id,manager_id]);
  } catch (error) {
    console.log("Employee could not be added");
    return false;
  }
};

module.exports = SqlQueries;
