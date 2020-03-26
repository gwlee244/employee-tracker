drop database if exists employee_tracker_db;
create database employee_tracker_db;
use employee_tracker_db;

create table department(
    id int not null auto_increment,
    name varchar(30) not null,
    primary key(id)
);

create table role(
    id int not null auto_increment,
    title varchar(30) not null,
    salary decimal(9,2),
    department_id int not null,
    primary key(id)
);

create table employee(
	id int not null auto_increment,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int,
    primary key(id),
    foreign key(role_id) references role(title),
);