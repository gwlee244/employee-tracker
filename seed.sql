use employee_tracker_db;

insert into role(title, salary, dept_id)
values ("Manager", 180000.00, 1);

insert into role(title, salary, dept_id)
values ("Software Engineer", 140000.00, 2);

insert into role(title, salary, dept_id)
values ("Analyst", 100000.00, 3);

insert into role(title, salary, dept_id)
values ("Lawyer", 150000.00, 4);



insert into employee(first_name, last_name, role_id, manager_id)
values ("Joe", "Smith", 1, null);

insert into employee(first_name, last_name, role_id, manager_id)
values ("Mike", "Jones", 2, 1);

insert into employee(first_name, last_name, role_id, manager_id)
values ("Steve", "Judge", 2, 2);

insert into employee(first_name, last_name, role_id, manager_id)
values ("Amy", "Gardner", 3, 1);

insert into employee(first_name, last_name, role_id, manager_id)
values ("Kurt", "Matthews", 4, null);

insert into department(dept_name)
values ("Sales");

insert into department(dept_name)
values ("Engineering");

insert into department(dept_name)
values ("Finance");

insert into department(dept_name)
values ("Legal");