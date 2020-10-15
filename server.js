var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");
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
                        department_name: response.name,
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.table(res.affectedRows + " Department Added!\n");
                    }
                );


                console.log(query.sql);
                start()
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
                start()
            });
    }

    function addEmployee() {
        let sql = `SELECT employee.role_id, employee_role.title
        FROM employee
        inner JOIN employee_role
        ON employee_role.id=employee.role_id`
        connection.query(sql, (error, response) => {
            if (error) throw error;
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
                    message: "Add Employee with which title ID?",
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
                    start()
                });
        });


    };

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
        connection.query("SELECT department_name FROM department", function (err, res) {
            if (err) throw err;
            console.table(res);
            start()
        });
    }

    //VIEW ROLE
    function viewRole() {
        console.log("Selecting all departments...\n");
        connection.query(`SELECT employee_role.title, employee_role.salary,department.department_name
        FROM employee_role
        inner JOIN department
        ON employee_role.department_id=department.id`, function (err, res) {
            if (err) throw err;
            console.table(res);
            start()
        });
    }

    //VIEW EMPLOYEE
    function viewEmployee() {
        console.log("Selecting all departments...\n");
        connection.query(`SELECT employee.first_name, employee.last_name, title
        FROM employee
        inner JOIN employee_role
        ON employee.role_id=employee_role.department_id`, function (err, res) {
            if (err) throw err;
            console.table(res);
            start()
        });
    }




};



//UPDATE


function updatePrompts() {
    let sql = `SELECT employee.id, employee.first_name, employee.last_name, employee_role.id AS "
    role_id "
    FROM employee, employee_role, department WHERE department.id = employee_role.department_id AND employee_role.id = employee.role_id`;
    connection.query(sql, (error, response) => {
        if (error) throw error;
        let employeeNamesArray = [];
        response.forEach((response) => {
            employeeNamesArray.push(`${response.first_name} ` + ` ${response.last_name}`);
        });

        let sql1 = `SELECT employee.role_id, employee_role.title
        FROM employee
        inner JOIN employee_role
        ON employee_role.id=employee.role_id`
        connection.query(sql1, (error, response) => {
            if (error) throw error;
            let employeeRoleArray = [];
            response.forEach((response) => {
                employeeRoleArray.push(`${response.title} `);
            });

            inquirer
                .prompt([{
                    type: 'list',
                    name: 'chosenEmployee',
                    message: 'Update Which Employee?',
                    choices: employeeNamesArray,
                }, {
                    type: 'list',
                    name: 'chosenRoleId',
                    message: "Update Employee with which title?",
                    choices: employeeRoleArray,
                }])

                .then((answer) => {
                    var query = connection.query(
                        "UPDATE employee SET employee.role_id = ? WHERE employee.id = ?",
                        [answer.ChosenRoleId, answer.ChosenEmployeeId],

                        function (err, res) {
                            if (err) throw err;
                            console.table(res.affectedRows + " Employee Role Updated!\n");
                        }
                    );

                    console.log(query.sql);
                    start()


                })

        });
    });

};