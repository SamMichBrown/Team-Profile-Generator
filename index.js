const fs = require('fs');
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
           
            fs.writeFile('./dist/team.html', generateHtmlPage(pageData), err => {
                if (err) throw new Error(err);
                console.log('file written successfully');
            });
            
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


const generateEngineersHtml = (engineers) => {
    let template = ''
    for (let e of engineers){
        const card = `
        <div class="card mb-3" style="width: 18rem;">
            <div class="card-header">
                <h5 class="card-title">${e.getName()}</h5>
                <h5 class="card-subtitle mb-2 text-muted">${e.getRole()}</h5>
            </div>
            <div class="card-body">
                <p class="card-text">Id: ${e.getId()}</p>
                <p class="card-text"><a href="mailto:${e.getEmail()}">Email: ${e.getEmail()}</a></p>
                <a href="https://github.com/${e.getGithub()}" class="card-link">Github: ${e.getGithub()}</a>
            </div>
        </div>
        `
        template += card
    }
    return template
}

const generateInternsHtml = (interns) => {
    let template = ''
    for (let e of interns){
        const card = `
        <div class="card mb-3" style="width: 18rem;">
            <div class="card-header">
                <h5 class="card-title">${e.getName()}</h5>
                <h5 class="card-subtitle mb-2 text-muted">${e.getRole()}</h5>
            </div>
            <div class="card-body">
                <p class="card-text">Id: ${e.getId()}</p>
                <p class="card-text"><a href="mailto:${e.getEmail()}">Email: ${e.getEmail()}</a></p>
                <p class="card-text">School: ${e.getSchool()}</p>
            </div>
        </div>
        `
        template += card
    }
    return template
}

const generateHtmlPage = (data) => {
    return `
    <!DOCTYPE html> 
    <html lang="en"> 
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <!-- CSS only -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
        <title>Portfolio Demo</title>
        </head>
    
        <body>
            <header class="bg-danger"><h1 class="text-center">My Team<h1></header>

            <section class="container">
            <div class="card mb-3" style="width: 18rem;">
                <div class="card-header">
                    <h5 class="card-title" class="col-4">${data.manager.getName()}</h5>
                    <h5 class="card-subtitle mb-2 text-muted">${data.manager.getRole()}</h5>
                </div>
                <div class="card-body">
                    <p class="card-text">Id: ${data.manager.getId()}</p>
                    <p class="card-text"><a href="mailto:${data.manager.getEmail()}">Email: ${data.manager.getEmail()}</a></p>
                    <p class="card-text">Office Number: ${data.manager.getOfficeNumber()}</p>
                </div>
                <div>
                ${generateEngineersHtml(data.engineers)}
                </div>
                <div>
                ${generateInternsHtml(data.interns)}
                </div>
            </div>
            </section>
            </body>
    </html>
    `
  };


init()



