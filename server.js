var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");
//const Department = require("/js/Department.js");
//const Employee = require("/js/Employee.js");
//const Role = require("/js/Role.js");
require("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: process.env.MYSQLPW,
    database: "employee_managerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});
//STARTING PROMPTS
function start() {
    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: 'welcome, What Would you like to do?',
            choices: ['Add', 'View', 'Update'],
        }).then((answers) => {
            if (answers.action === 'Add') {
                addPrompts();
            } else if (answers.action === 'View') {
                viewPrompts();
            } else {
                updatePrompts();
            }

        })
};
//ADD
function addPrompts() {
    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: 'Add Department? Add Role? Add Employee?',
            choices: ['Add Departments', 'Add Roles', 'Add Employees'],
        }).then((answers) => {
            if (answers.action === 'Add Departments') {
                addDepartment();
            } else if (answers.action === 'Add Roles') {
                addRole();
            } else {
                addEmployee();
            }

        })

    function addDepartment() {
        inquirer
            .prompt([{
                type: 'input',
                message: 'Department name?',
                name: 'name'
            }])

            .then((response) => {

                var query = connection.query(
                    "INSERT INTO department SET ?", {
                        name: response.name,
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.table(res.affectedRows + " Department Added!\n");
                    }
                );


                console.log(query.sql);
            });
    }

    function addRole() {
        inquirer
            .prompt([{
                type: 'input',
                message: 'Title?',
                name: 'title'
            }, {
                type: 'input',
                message: 'Salary?',
                name: 'salary'
            }, {
                type: 'input',
                message: 'Department ID?',
                name: 'depId'
            }, ])

            .then((response) => {

                var query = connection.query(
                    "INSERT INTO employee_role SET ?", {
                        title: response.title,
                        salary: response.salary,
                        department_id: response.depId,
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.table(res.affectedRows + " Role Added!\n");
                    }
                );


                console.log(query.sql);
            });
    }

    function addEmployee() {
        inquirer
            .prompt([{
                type: 'input',
                message: 'First Name?',
                name: 'firstName'
            }, {
                type: 'input',
                message: 'Last Name?',
                name: 'lastName'
            }, {
                type: 'input',
                message: 'Role ID?',
                name: 'roleId'
            }, {
                type: 'input',
                message: 'Manager ID?',
                name: 'mngrId'
            }])

            .then((response) => {

                var query = connection.query(
                    "INSERT INTO employee SET ?", {
                        first_name: response.firstName,
                        last_name: response.lastName,
                        role_id: response.roleId,
                        manager_id: response.mngrId
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.table(res.affectedRows + " Employee Added!\n");
                    }
                );


                console.log(query.sql);
            });
    }




};

//VIEW
function viewPrompts() {
    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: 'View Department? View Role? View Employee?',
            choices: ['View Departments', 'View Roles', 'View Employees'],
        }).then((answers) => {
            if (answers.action === 'View Departments') {
                viewDepartment();
            } else if (answers.action === 'View Roles') {
                viewRole();
            } else {
                viewEmployee();
            }

        })

    //VIEW DEPARTMENTS
    function viewDepartment() {
        console.log("Selecting all departments...\n");
        connection.query("SELECT * FROM department", function (err, res) {
            if (err) throw err;
            console.table(res);
        });
    }




};



//UPDATE
/*function updatePrompts() {
    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: 'Update Department? Update Role? Update Employee?',
            choices: ['Update Departments', 'Update Roles', 'Update Employees'],
        }).then((answers) => {
            if (answers.action === 'Update Departments') {
                UpdateDepartment();
            } else if (answers.action === 'Update Roles') {
                UpdateRole();
            } else {
                UpdateEmployee();
            }

        })
};*/