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
        "Add Employee",
        "View All Departments",
        "Add a Department",
        "View All Roles",
        "Add a Role",
        //"Update Employee Role",
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

      case "Add Employee":
        employeeAdd();
        break;

      //case "Remove Employee":
      //   employeeRemove();
      //   break;
      case "View All Departments":
        viewDepartments();
        break;

      case "Add a Department":
        deptAdd();
        break;
      
      case "View All Roles":
        viewRoles();
        break;

      case "Add a Role":
        roleAdd();
        break;

      // case "Update Employee Role":
      //   updateRole();
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
  // var query = "select employee.first_name, employee.last_name, role.title, role.salary, department.name from employee outer join role on employee.id = role.id outer join department on role.id = department.id";
  // connection.query(query, (err, res) => {
  //   if (err) throw err;
  //   console.table(res);
  //   employeeTrack();
  // })
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
  var query = "select employee.first_name, employee.last_name from employee where role_id = 1";
  connection.query(query, (err, res) => {
    if(err) throw err;
    console.log(res.length + " employee(s) found!");
    console.table(res);
    console.log("\n");
    employeeTrack();
  })
}

function byEngineering() {
  var query = "select employee.first_name, employee.last_name from employee where role_id = 2";
  connection.query(query, (err, res) => {
    if(err) throw err;
    console.log(res.length + " employee(s) found!");
    console.table(res);
    console.log("\n");
    employeeTrack();
  })
}

function byFinance() {
  var query = "select employee.first_name, employee.last_name from employee where role_id = 3";
  connection.query(query, (err, res) => {
    if(err) throw err;
    console.log(res.length + " employee(s) found!");
    console.table(res);
    console.log("\n");
    employeeTrack();
  })
}

function byLegal() {
  var query = "select employee.first_name, employee.last_name from employee where role_id = 4";
  connection.query(query, (err, res) => {
    if(err) throw err;
    console.log(res.length + " employee(s) found!");
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
      message: "Select the employee's role(1-Manager, 2-Software Engineer, 3-Analyst, 4-Lawyer",
      choices: [
        "1",
        "2",
        "3",
        "4"
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
function viewDepartments() {
  var query = "select * from department order by department.id asc";
  connection.query(query, (err, res) => {
    if(err) throw err;
    console.log(res.length + " departments found!");
    console.table(res);
    console.log("\n");
    employeeTrack();
  })
}

function deptAdd() {
  inquirer
    .prompt([
      {
        name: "name",
        message: "What is the department name being added?"
      }
    ])
    .then((function(answer) {
      var query = "insert into department (department.name) values (?)";
      connection.query(query, [answer.name], (err, res) => {
        if (err) throw err;
        employeeTrack();
      
      })
    }))
}

function viewRoles() {
  var query = "select * from role order by role.id asc";
  connection.query(query, (err, res) => {
    if(err) throw err;
    console.log(res.length + " roles found!");
    console.table(res);
    console.log("\n");
    employeeTrack();
  })
}

function roleAdd() {
  inquirer
    .prompt([
      {
        name: "title",
        message: "What is the role name being added?"
      },
      {
        name: "salary",
        message: "What is the salary for this role?"
      },
      {
        name: "department_id",
        message: "What department ID does the role belong to?"
      }
    ])
    .then((function(answer) {
      var query = "insert into role (role.title, role.salary, role.department_id) values (?, ?, ?)";
      connection.query(query, [answer.title, answer.salary, answer.department_id], (err, res) => {
        if (err) throw err;
        employeeTrack();
      })
    }))
}

/// working on update function....

// function updateRole() {
//   var staff = [];
//   var roles = [];
//   connection.query("select first_name from employee", (err, res) => {
//     if (err) throw err;
//     for (i = 0; i < res.length; i++) {
//       staff.push(res[i].first_name);
//     }
//     connection.query("select title from role", (err, response) => {
//       if (err) throw err;
//       for (i = 0; i < response.length; i++) {
//         roles.push(response[i].title);
//       }
//       inquirer
//         .prompt([
//           {
//             type: "list",
//             name: "employeeName",
//             message: "Choose an employee to update:",
//             choices: staff
//           },
//           {
//             type: "list",
//             name: "employeeRole",
//             message: "Choose a new role:",
//             choices: roles
//           }
//         ])
//         .then((function(answer) {
//           console.log(answer);
//           connection.query({ first_name: answer.employeeRole }, (err, res) => {
//             if (err) throw err;
//             connection.query("update employee set role_id = '+res[0].id+' where first_name = answer.employeeName", (err, res) => {
//               if (err) throw err;
              
//               employeeTrack();
//             })
//           })
//         }
//       ))
//     })
//   })
// }
