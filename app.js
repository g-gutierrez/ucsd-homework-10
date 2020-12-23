const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function managerPrompt() {
    inquirer
       .prompt([
            {
                type: "input",
                message: "Manager name: ",
                name: "managerName"
            },
            {
                type: "input",
                message: "Manager email address?",
                name: "managerEmail"
            },
            {
                type: "input",
                message: "Manager office number?",
                name: "managerOffice"
            }
       ])
       .then(function(response) {
            let managerName = response.managerName;
            let managerEmail = response.managerEmail;
            let managerOffice = response.managerOffice;
            let manager = new Manager(
                managerName,
                employeeID,
                managerEmail,
                managerOffice
            );
 
            employeeList.push(manager);
            employeeID++;
            console.log(`Enter employee information...`);
            employeePrompt();
       });
}

function employeePrompt() {
    inquirer
       .prompt([
            {
                type: "list",
                message: "What is the employee's role?",
                choices: ["Engineer", "Intern"],
                name: "employeeType"
            },
            {
                type: "input",
                message: "What is the employee's name?",
                name: "employeeName"
            },
            {
                type: "input",
                message: "What is the employee's email address?",
                name: "employeeEmail"
            }
       ])
       .then(function(response) {
            let employeeType = response.employeeType;
            let employeeName = response.employeeName;
            let employeeEmail = response.employeeEmail;
 
            if (employeeType === "Engineer") {
                engineerPrompt();
            } else {
                internPrompt();
            }
       });
}

function engineerPrompt() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your employee's GitHub username?",
                name: "gitHubUN"
            },
            {
                type: "list",
                message: "Do you have more employees you'd like to add?",
                choices: ["Yes", "No"],
                name: "moreEmployees"
            }
        ])
        .then(function(response) {
            let employeeGitHub = response.gitHubUN;
            let engineer = new Engineer(
                employeeName,
                employeeID,
                employeeEmail,
                employeeGitHub
            );
   
            employeeList.push(engineer);
            employeeID++;
   
            if (response.moreEmployees === "Yes") {
                employeePrompts();
            } else {
                generatePage();
                return;
            }
        });
}

function internPrompt() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Where does the intern go to school?",
                name: "internSchool"
            },
            {
                type: "list",
                message: "Do you have more employees you'd like to add?",
                choices: ["Yes", "No"],
                name: "moreEmployees"
            }
        ])
        .then(function(response) {
            let employeeSchool = response.internSchool;
            let intern = new Intern(
                employeeName,
                employeeID,
                employeeEmail,
                employeeSchool
            );
   
            employeeList.push(intern);
            employeeID++;
   
            if (response.moreEmployees === "Yes") {
                employeePrompts();
            } else {
                generatePage();
                return;
            }
        });
}

function generatePage() {
    let allCards = "";
 
    employeeList.forEach(item => {
       let cardString = item.createCard();
       allCards += cardString;
    });
 
    let fullHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossorigin="anonymous"
        />
        <script>
            src="https://kit.fontawesome.com/ab3fd93a87.js"
            crossorigin="anonymous"
        </script>
        <title>My Team</title>
    </head>
    <body>
        <div class="container-fluid bg-danger text-center d-flex align-items-center justify-content-center" style="height: 20vh">
            <div class="h1 text-white" style="display: inline-block;">
                My Team
            </div>
        </div>
        <div class="container mt-5">
            <div class="card-deck d-inline-flex justify-content-center">
                ${allCards}
            </div>
        </div>
    </body>
    </html>
    `;
 
    fs.writeFile("./output/roster.html", fullHTML, function(err) {
       if (err) {
          return console.log(err);
       }
    });
 }
 
 managerPrompt();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
