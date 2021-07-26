const inquire = require("inquirer");

const menuQuestion = {
  type: "list",
  name: "menuChoice",
  message: "What would you like to do?",
  choices: [
    "View All Employees",
    "Add Employee",
    "Update Employee Role",
    "View All Roles",
    "Add Role",
    "View All Departments",
    "Add Department",
    "Quit",
  ],
};

const selectMenuOption = async () => {
  const resp = await inquire.prompt(menuQuestion);
  if (resp.menuChoice === "View All Employees") {
    return 0;
  } else if (resp.menuChoice === "Add Employee") {
    return 1;
  } else if (resp.menuChoice === "Update Employee Role") {
    return 2;
  } else if (resp.menuChoice === "View All Roles") {
    return 3;
  } else if (resp.menuChoice === "Add Role") {
    return 4;
  } else if (resp.menuChoice === "View All Departments") {
    return 5;
  } else if (resp.menuChoice === "Add Department") {
    return 6;
  } else {
    return 7;
  }
};

module.exports = selectMenuOption;
