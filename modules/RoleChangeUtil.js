const inquirer = require('inquirer');

const getQuestions = (e,r) => {
    return[
        {
            type: 'list',
            name: 'employee',
            message: "Which employee is getting a new role?",
            choices: e,

        },
        {
            type: 'list',
            name: 'role',
            message: "What is their new role?",
            choices: r,
        }
    ];
};

const parseLists = (empListRaw,roleListRaw) => {
    const roles = [];
    const employs = [];
    for(let obj of empListRaw){
        employs.push(obj.Employee);
    }

    for(let item of roleListRaw){
        roles.push(item.title);
    }

    return [employs,roles];
};

const roleQuestions = async (employeeList,roleList) => {
    const [employees,roles] = parseLists(employeeList,roleList);
    const questions = getQuestions(employees,roles);
    try {
        const answers = inquirer.prompt(questions);
        return answers;
    } catch (error) {
        console.log(error);
        return;
    }
}

module.exports = roleQuestions;