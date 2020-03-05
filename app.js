const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
var employeeArray = [];

const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

const Employee = require("./lib/Employee");

function askRole() {
inquirer
  .prompt([
    {
     type: 'checkbox',
     name: 'jobType',
     message: 'What is your job title?',
     choices: [
       'Intern', 'Manager', 'Engineer',
     ],
     },
  ])
   .then(answers => {     
     console.info('Answer:', answers.jobType[0]);
     if (answers.jobType[0] === "Manager") {
       askOffice()
     } else if (answers.jobType[0] === "Intern") {
       askSchool()
     } else {
       askGitHub()
     }   
   });
  }

  function askOffice() {
    inquirer
  .prompt([
    {
      name: 'officeNumber',
      message: 'What is your office number?',
    },
  ])
  .then(answers => {
    console.info('Answer:', answers.officeNumber);
    askRest("Manager", answers.officeNumber)
  });
}

  function askSchool() {
    inquirer
  .prompt([
    {
      name: 'schoolName',
      message: 'What school did you go to?',
    },
  ])
  .then(answers => {
    console.info('Answer:', answers.schoolName);
    askRest("Intern", answers.schoolName)
  });
}

  function askGitHub() {
    inquirer
  .prompt([
    {
      name: 'gitHubName',
      message: 'What is your GitHub name?',
    },
  ])
  .then(answers => {
    console.info('Answer:', answers.gitHubName);
    askRest("Engineer", answers.gitHubName)    
  });
}
    
function askRest(answerRole, answerVar) {
  inquirer
.prompt([
  {
    name: 'name',
    message: 'What is your name ?',
  },
  {
    name: 'email',
    message: 'What is your email address ?',
  },
  {
    name: 'ID',
    message: 'What is your employee ID ?',
  },
])
.then(answers => {
  console.info('Answer:', answers.name, answers.email, answers.ID, answerRole, answerVar);
  createEmployee(answerRole, answerVar, answers.name, answers.ID, answers.email);
});
}

function createEmployee(answerRole, answerVar, answerName, answerID, answerEmail) {

  if (answerRole === "Manager") {
     answerName = new Manager(answerName, answerID, answerEmail, answerVar)  
  } else if (answerRole === "Intern") {
     answerName = new Intern(answerName, answerID, answerEmail, answerVar) 
  } else {
    answerName = new Engineer(answerName, answerID, answerEmail, answerVar) 
  } 

  employeeArray.push(answerName)
  askAnyMore()
}  

function askAnyMore() {
  console.log(employeeArray);
  inquirer
    .prompt([
      {
       type: 'checkbox',
       name: 'anyMore',
       message: 'Want to enter anymore employees? Just hit ENTER for no',
       choices: [
         'Yes',
       ],
       },
    ])
     .then(answers => {     
       console.info('Answer:', answers.anyMore[0]);

       if (answers.anyMore[0] === "Yes") {
           askRole()
       } else {
            printHTML()
           //console.log(const bob = render(employeeArray))
           //fs.writeFile("orgChart.html", bob)

           //const md = generateMd(answers);
           //const bob = render(employeeArray);
           //await writeFileAsync("orgChart.html", bob);
       }      
    });
  }
  
  async function printHTML() {
    
    //console.log(const bob = render(employeeArray))
    //fs.writeFile("orgChart.html", bob)
  
    const bob = render(employeeArray);
    await writeFileAsync("orgChart.html", bob);
  }

  askRole();



////console.log (Jim = new Engineer("Jim",1,"jim@company.com","JimDenis"))
////console.log (Judy = new Intern("Judy",2,"judy@company.com","UofA"))
////console.log(Mike = new Manager("Mike",3,"mike@company.com","A4127"));
//console.log(Jim.getRole());
//console.log(Judy.getRole());
//console.log(Mike.getRole());
//console.log(Jim.getId());
//console.log(Jim.getRole(),Jim.name,Jim.id,Jim.email,Jim.getgitHub())
//console.log("in 1")
////employeeArray.push(Jim);
////employeeArray.push(Judy)
////employeeArray.push(Mike)
//console.log(employeeArray);
//console.log(Jim.getRole());
//console.log(engineer.gitRole())
////console.log(bob = render(employeeArray))
//render(Jim.name,Jim.id,Jim.email)
  



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
// for the provided `render` function to work!```
