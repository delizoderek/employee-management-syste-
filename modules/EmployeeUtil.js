const inquirer = require('inquirer');

const setupQuestions = (r,e) => {
    return[
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?"
        },
        {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: r
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is there manager",
            choices: ['None',...e],
            default: 'None',
        }
    ];
}

const parseLists = (roleList, employeeList) => {
    const roles = [];
    const employees = [];
    for(let role of roleList){
        roles.push(role.title);
    }

    for(let emp of employeeList){
        employees.push(emp.Employee);
    }

    return {roles,employees};
}

const askQuestions = async (roleList,empList) => {
    const {roles,employees} = parseLists(roleList,empList);
    const questions = setupQuestions(roles,employees);
    try {
        const answers = await inquirer.prompt(questions);
        return answers;
    } catch (error) {
        console.log(error);
        return;
    }
}

module.exports = askQuestions;