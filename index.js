const startMenu = require("./modules/StartMenu");
const {getDepartments,getRoles,getEmployees,endConnection} = require('./helper/SqlQueries');


const startApp = async () => {
  let option = await startMenu();
  while (option < 7) {
    if (option == 0) {
        // TODO: Get All Employees
        console.log("All Employees");
    } else if (option == 1) {
        // TODO: Add Employee
        console.log("Add Employees");
    } else if (option == 2) {
        // TODO: Update Employee
        console.log('Update Employee Role');
    } else if (option == 3) {
        // TODO: View All Roles
        console.log('View All Roles');
    } else if (option == 4) {
        // TODO: Add Role
        console.log('Add Role')
    } else if (option == 5) {
        // TODO: View All Departments
        console.log('View All Departments')
    } else if (option == 6) {
        // TODO: Add Department
        console.log('Add Department');
    } else {
        console.log('Welcome to the dark side');
    }
    option = await startMenu();
  }
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
