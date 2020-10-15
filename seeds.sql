USE employee_managerDB;
INSERT INTO department
    (department_name)
VALUES
    ("Accounting");
INSERT INTO department
    (department_name)
VALUES
    ("Public Relations");
INSERT INTO department
    (department_name)
VALUES
    ("Merchandising");
INSERT INTO department
    (department_name)
VALUES
    ("Sales");
INSERT INTO department
    (department_name)
VALUES
    ("Customer Service");


INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Smith", "1", "0");
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Jane", "Williams", "2", "0");
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Stephen", "Jones", "3", "0");
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Sally", "Johnson", "4", "0");
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Joseph", "Moreno", "5", "0");


INSERT INTO employee_role
    (title, salary, department_id)
VALUES
    ("Accountant", "75000", "1");
INSERT INTO employee_role
    (title, salary, department_id)
VALUES
    ("PR Agent", "80000", "2");
INSERT INTO employee_role
    (title, salary, department_id)
VALUES
    ("Lead Merchant", "120000", "3");
INSERT INTO employee_role
    (title, salary, department_id)
VALUES
    ("Sales Person", "50000", "4");
INSERT INTO employee_role
    (title, salary, department_id)
VALUES
    ("CS Representative", "65000", "5");
