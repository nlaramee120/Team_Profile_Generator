const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path")
const render = require("./classes/renderHTML")
const Employee = require("./classes/employee")
const Manager = require("./classes/Manager")
const Engineer = require("./classes/Engineer")
const Intern = require("./classes/Intern")

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html")

createTeam = []




const enterEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the employee you wish to enter?"
        },
        {
            type: "input",
            name: "id",
            message: "Please enter in the employee's ID."
        },
        {
            type: "input",
            name: "email",
            message: "What is the employee's email address?",
        },
        {
            type: "list",
            name: "role",
            message: "What role does this employee have?",
            choices: ["Manager", "Engineer", "Intern"]
        }
    ])

    .then(function(answers) {
        if (answers.role === "Manager") {
            managerQS(answers)
        }
        else if (answers.role === "Engineer") {
            engineerQS(answers)
        }
        else if (answers.role === "Intern") {
            internQS(answers)
        }
    })
        
}

function managerQS(answers) {
    inquirer.prompt ([
        {
            type: "input",
            message: "What is the office number of the manager?",
            name: "officeNumber",
        },
        {
            type: "confirm",
            message: "Would you like to add another team member?",
            name: "addAnother",
        }
    ])

    .then(function (managerAnswers) {
        const newManager = new Manager(answers.name, answers.id, answers.email, managerAnswers.officeNumber)
        createTeam.push(newManager);
        if (managerAnswers.addAnother === true) {
            enterEmployee()
        }
        else {
            console.log(createTeam)
            writeToFile()
        }
    })
}

function engineerQS(answers) {
    inquirer.prompt ([
        {
            type: "input",
            message: "What is the Gihub of the engineer?",
            name: "github"
        },
        {
            type: "confirm",
            message: "Would you like to add another team member?",
            name: "addAnother",
        }
    ])

    .then(function (engineerAnswers) {
        const newEngineer = new Engineer(answers.name, answers.id, answers.email, engineerAnswers.github)
        createTeam.push(newEngineer);
        if (engineerAnswers.addAnother === true) {
            enterEmployee()
        }
        else {
            console.log(createTeam)
            writeToFile()
        }
    })
}

function internQS(answers) {
    inquirer.prompt ([
        {
            type: "input",
            message: "What school does the intern attend?",
            name: "school",
        },
        {
            type: "confirm",
            message: "Would you like to add another team member?",
            name: "addAnother",
        }
    ])

    .then(function (internAnswers) {
        const newIntern = new Intern(answers.name, answers.id, answers.email, internAnswers.school)
        createTeam.push(newIntern);
        if (internAnswers.addAnother === true) {
            enterEmployee()
        }
        else {
            console.log(createTeam)
            writeToFile()
        }
    })
}

function writeToFile() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(createTeam), "utf-8")
}

enterEmployee()