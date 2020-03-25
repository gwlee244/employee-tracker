var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "g0ldf!sh",
  database: "employee_tracker_db"
});

connection.connect(function(err) {
  if (err) throw err;
 // employeeTrack();
});

employeeTrack();

function employeeTrack() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        // "Update Employee Role",
        // "Update Employee Manager",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View All Employees":
        viewAllEmployees();
        break;

      case "View All Employees By Department":
        employeeByDept();
        break;

      case "View All Employees By Manager":
        employeeByMgr();
        break;

      case "Add Employee":
        employeeAdd();
        break;

      // case "Remove Employee":
      //   employeeRemove();
      //   break;

      // case "Update Employee Role":
      //   employeeRoleUpdate();
      //   break;

      // case "Update Employee Manager":
      //   employeeMgrUpdate();
      //   break;

      case "Exit":
        connection.end();
        break;
      }
    })
}

function viewAllEmployees() {
  var query = "select * from employee order by employee.id asc";
  connection.query(query, (err, res) => {
    if(err) throw err;
    console.log(res.length + " employees found!");
    console.table(res);
    console.log("\n");
    employeeTrack();
  })
}

function employeeByDept() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Select the department for which you want to see all the employees",
      choices: [
        "View All Sales Employees",
        "View All Engineering Employees",
        "View All Finance Employees",
        "View All Legal Employees",
        "Start Over",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View All Sales Employees":
        bySales();
        break;

      case "View All Engineering Employees":
        byEngineering();
        break;

      case "View All Finance Employees":
        byFinance();
        break;

      case "View All Legal Employees":
        byLegal();
        break;

      case "Start Over":
        employeeTrack();
        break;

        case "Exit":
        connection.end();
        break;
      }
    })
}

function bySales() {
  var query = "select employee.first_name, employee.last_name from employee where role_id = 5";
  connection.query(query, (err, res) => {
    if(err) throw err;
    console.log(res.length + " employee(s) found!");
    console.table(res);
    console.log("\n");
    employeeTrack();
  })
}

function byEngineering() {
  var query = "select employee.first_name, employee.last_name from employee where role_id = 6";
  connection.query(query, (err, res) => {
    if(err) throw err;
    console.log(res.length + " employee(s) found!");
    console.table(res);
    console.log("\n");
    employeeTrack();
  })
}

function byFinance() {
  var query = "select employee.first_name, employee.last_name from employee where role_id = 7";
  connection.query(query, (err, res) => {
    if(err) throw err;
    console.log(res.length + " employee(s) found!");
    console.table(res);
    console.log("\n");
    employeeTrack();
  })
}

function byLegal() {
  var query = "select employee.first_name, employee.last_name from employee where role_id = 8";
  connection.query(query, (err, res) => {
    if(err) throw err;
    console.log(res.length + " employee(s) found!");
    console.table(res);
    console.log("\n");
    employeeTrack();
  })
}

function employeeByMgr() {
  var query = "select employee.first_name, employee.last_name from employee where manager_id = 1";
  connection.query(query, (err, res) => {
    if(err) throw err;
    console.log(res.length + " employees found!");
    console.table(res);
    console.log("\n");
    employeeTrack();
  })
}

function employeeAdd() {
  inquirer
    .prompt([
    {
      name: "firstName",
      type: "input",
      message: "Enter the employee's first name:"
    },
    {
      name: "lastName",
      type: "input",
      message: "Enter the employee's last name:"
    },
    {
      name: "roleId",
      type: "list",
      message: "Select the employee's role(5-Manager, 6-Software Engineer, 7-Analyst, 8-Lawyer",
      choices: [
        "5",
        "6",
        "7",
        "8"
      ]},
    {
      name: "managerId",
      type: "input",
      message: "Enter the employee's manager ID:"
    }
    ])
    .then(function(answer) {
      var query = "insert into employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)";
      connection.query(query, [answer.firstName, answer.lastName, answer.roleId, answer.managerId], (err, data) => {
        if (err) throw err;
        employeeTrack();
      })
    })
};