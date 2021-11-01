const Manager = require("../lib/Manager");
const Engineer = require("../lib/Engineer.js");
const Intern = require("../lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("../lib/htmlRenderer");

const teamMembers = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function getInformation() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the employees name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is your id number?",
      },
      {
        type: "input",
        name: "email",
        message: "What is your email?",
      },
      {
        type: "list",
        name: "role",
        message: "What role is this employee?",
        choices: ["Manager", "Intern", "Engineer"],
      },
    ])
    .then(function (answer) {
      switch (answer.role) {
        case "Manager":
          return inquirer.prompt([
            {
              type: "input",
              name: "officeNumber",
              message: "Please enter office number:",
            },
          ]);

        case "Engineer":
          return inquirer
            .prompt([
              {
                type: "input",
                message: "Enter Github:",
                name: "github",
              },
            ])
            .then(function (answer) {
              const Engineer = new Engineer(
                answer.name,
                answer.id,
                answer.email,
                answer.github
              );
              teamMembers.push(Engineer);
            });

        case "Intern":
          return inquirer
            .prompt([
              {
                type: "input",
                message: "Please enter your school",
                name: "school",
              },
            ])
            .then(function (answer) {
              const Intern = new Intern( 
                answer.name,
                answer.id,
                answer.email,
                answer.school
              );
              teamMembers.push(Intern);
            });
      }
    });
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
getInformation().then(function () {
  let html = render(teamMembers);

  fs.writeFile(outputPath, html, (err) => {
    if (err) throw err;
    return "SAVED";
  });
});
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