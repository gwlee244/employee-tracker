use employee_tracker_db;

insert into employee(first_name, last_name, role_id, manager_id)
values ("Joe", "Smith", 1, null);

insert into employee(first_name, last_name, role_id, manager_id)
values ("Mike", "Jones", 2, 1);

insert into employee(first_name, last_name, role_id, manager_id)
values ("Steve", "Judge", 2, 1);

insert into employee(first_name, last_name, role_id, manager_id)
values ("Amy", "Gardner", 3, 1);

insert into employee(first_name, last_name, role_id, manager_id)
values ("Kurt", "Matthews", 4, null);


insert into department(id, name)
values (1, "Sales");

insert into department(id, name)
values (2, "Engineering");

insert into department(id, name)
values (3, "Finance");

insert into department(id, name)
values (4, "Legal");


insert into role(id, title, salary, department_id)
values (1, "Manager", 180000.00, 1);

insert into role(id, title, salary, department_id)
values (2, "Software Engineer", 140000.00, 2);

insert into role(id, title, salary, department_id)
values (3, "Analyst", 100000.00, 3);

insert into role(id, title, salary, department_id)
values (4, "Lawyer", 150000.00, 4);