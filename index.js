const inquirer = require('inquirer');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');


// Manager Questions Array
const managerQuestions = [
    
    {
        type: 'input',
        name: 'name',
        message: "What is the team manager's name?"
    },
    {
        type: 'input',
        name: 'id',
        message: "What is the team manager's id?",  
        validate: (input) => {
            const regEx = /^[0-9]*$/
            return regEx.test(input) ? regEx.test(input): 'Please enter only numbers!'
        }
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the team manager's email?",
        validate: (input) => {
            const regEx = /\S+@\S+\.\S+/
            return regEx.test(input) ? regEx.test(input): 'Please enter a valid email adress!'
        }
    },
    {
        type: 'input',
        name: 'number',
        message: "What is the team manager's office number?",
        validate: (input) => {
            const regEx = /^[0-9]*$/
            return regEx.test(input) ? regEx.test(input): 'Please enter only numbers!'
        }
    },
    

]

// Engineer Questions Array
const engineerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What is the engineer's name?"
    },
    {
        type: 'input',
        name: 'id',
        message: "What is the engineer's id?",
        validate: (input) => {
            const regEx = /^[0-9]*$/
            return regEx.test(input) ? regEx.test(input): 'Please enter only numbers!'
        }
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the engineer's email?",
        validate: (input) => {
            const regEx = /\S+@\S+\.\S+/
            return regEx.test(input) ? regEx.test(input): 'Please enter a valid email adress!'
        }
    },
    {
        type: 'input',
        name: 'github',
        message: "What is the engineer's Github username?"
    },
]

// Intern Questions Array
const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What is the intern's name?"
    },
    {
        type: 'input',
        name: 'id',
        message: "What is the intern's id?",
        validate: (input) => {
            const regEx = /^[0-9]*$/
            return regEx.test(input) ? regEx.test(input): 'Please enter only numbers!'
        }
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the intern's email?",
        validate: (input) => {
            const regEx = /\S+@\S+\.\S+/
            return regEx.test(input) ? regEx.test(input): 'Please enter a valid email adress!'
        }
    },
    {
        type: 'input',
        name: 'school',
        message: "What is the intern's school?"
    },
]

// Stored data
let manager;
const engineers = []
const interns = []

const generateData = (m, es, ins) => {
    const manager = new Manager(m.name, m.id, m.email, m.number)
    const engineers = es.map(e => {
        return new Engineer(e.name, e.id, e.email, e.github)
    })
    const interns = ins.map(i => {
        return new Intern(i.name, i.id, i.email, i.school)
    })
    return {
        manager:manager,
        engineers:engineers,
        interns:interns
    }
}

// Select Team Member Questions Array/Loop
const addTeamMember = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'teamMemberSelection',
            message: "What type of team member would you like to add?",
            choices: ['Engineer', 'Intern', 'Finish'],
            
        },
    ])
    .then(data => {
        if (data.teamMemberSelection === 'Engineer'){
            askEngineerQuestions()  
        }else if (data.teamMemberSelection === 'Intern'){
            askInternQuestions()
        }else {
            console.log('  All Done!')
            console.log(manager)
            console.log(engineers)
            console.log(interns)
           let pageData = generateData(manager, engineers, interns)
           console.log(pageData)
            //generateHtmlPage()
        } 
    })
}

const askEngineerQuestions = () => {
    return inquirer.prompt(engineerQuestions)
    .then(engineerAnswers => {
        engineers.push(engineerAnswers)
        return addTeamMember()
    })
}

const askInternQuestions = () => {
    return inquirer.prompt(internQuestions)
    .then(internAnswers => {
        interns.push(internAnswers)
        return addTeamMember()
    })
}
const init = () => {
    inquirer.prompt(managerQuestions)
    .then(managerAnswers => {
        manager = managerAnswers
        addTeamMember()
    })
}

init()



