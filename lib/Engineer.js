// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, gitHub) {
    super(name, id, email);
    this.gitHub = gitHub;
  }
  getRole() {
    return "Engineer";
  }
  getGithub() {
    return this.gitHub;
  }
}

//Engineer.prototype.getRole = function () {
//  return "Engineer";
//};

//Engineer.prototype.getgitHub = function() {
//  return this.gitHib
//}

module.exports = Engineer;
