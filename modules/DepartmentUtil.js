const inquirer = require('inquirer');

const departAddQuestion = {
    type: "input",
    name: "name",
    message: "What would you like the department name to be?",
    validate(value) {
        if(value === "" || value === null){
            return 'Please enter a name';
        }
        return true;
    }
}

const newDepartment = async () => {
    const depName = await inquirer.prompt(departAddQuestion);
    return depName.name;
}

module.exports = newDepartment;