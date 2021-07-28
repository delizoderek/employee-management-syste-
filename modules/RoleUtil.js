const inquirer = require('inquirer');

const setupQuestions = (d) => {
    return[
        {
            type: 'input',
            name: 'title',
            message: "What is the title of the role?"
        },
        {
            type: 'number',
            name: 'salary',
            message: "What is the salary for the role?"
        },
        {
            type: 'list',
            name: 'depart',
            message: "Which department is this role in?",
            choices: d
        },
    ];
}

const parseList = (departList) => {
    const departments = [];
    for(let depart of departList){
        departments.push(depart.name);
    }
    return departments;
}

const addRole = async (departList) => {
    const depart = parseList(departList);
    const questions = setupQuestions(depart);
    try {
        const answers = await inquirer.prompt(questions);
        return answers;
    } catch (error) {
        console.log(error);
        return;
    }
}

module.exports = addRole;