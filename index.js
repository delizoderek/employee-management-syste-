const startMenu = require("./modules/StartMenu");
const dUtil = require("./modules/DepartmentUtil");
const eUtil = require("./modules/EmployeeUtil");
const mysql = require("mysql2/promise");
const cTable = require("console.table");
const SqlQueries = require("./helper/SqlQueries");

const querier = new SqlQueries();

// Handles aadding a new employee
const addEmployee = async (conn) => {
    const allEmployees = await querier.getEmployees(conn);
    const allRoles = await querier.getRoles(conn);
    const newEmployee = await eUtil(allRoles,allEmployees);
    if(newEmployee){
        let managerId = NULL;
        if(newEmployee.managerId){
            managerId = await querier.employeeId(conn,newEmployee.manager);
        }
        const roleId = await querier.roleId(conn,newEmployee.role);
        await querier.addEmployee(conn,newEmployee.first_name,newEmployee.last_name,roleId,managerId);
    } else {
        console.log('There was an error adding a new employee');
    }
};

const startApp = async () => {
  const conn = await mysql.createConnection(querier.config);
  let option = await startMenu();
  while (option < 7) {
    if (option == 0) {
      // TODO: Get All Employees
      const allEmployees = await querier.getEmployees(conn);
      const employeeTable = cTable.getTable(allEmployees);
      console.log(employeeTable);
    } else if (option == 1) {
      // TODO: Add Employee
      await addEmployee(conn);
    } else if (option == 2) {
      // TODO: Update Employee Role
      console.log("Update Employee Role");
    } else if (option == 3) {
      // View All Roles
      const allRoles = await querier.getRoles(conn);
      const roleTable = cTable.getTable(allRoles);
      console.log(roleTable);
    } else if (option == 4) {
      // TODO: Add Role
      console.log("Add Role");
    } else if (option == 5) {
      // View All Departments
      const departmentRows = await querier.getDepartments(conn);
      const departmentTable = cTable.getTable(departmentRows);
      console.log(departmentTable);
      console.log("View All Departments");
    } else if (option == 6) { // Add Department
      const deptName = await dUtil();
      await querier.addDepartment(conn, deptName);
    } else {
      console.log("Welcome to the dark side");
    }
    option = await startMenu();
  }
  querier.endConnection(conn);
};

// TODO: Display Start menu
// TODO: Handle start menu selection
// TODO: Render table view in command line
// TODO: Get All Departments
// TODO: Get All Employees
// TODO: Add Department
// TODO: Add Role
// TODO: Quit application

startApp();
