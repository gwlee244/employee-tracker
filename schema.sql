drop database if exists employee_tracker_db;
create database employee_tracker_db;
use employee_tracker_db;

create table employee(
	id int auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int,
    primary key(id)
);

create table role(
    role_id int not null auto_increment,
    title varchar(30),
    salary decimal(9,2),
    dept_id int,
    primary key(role_id)
);

create table department(
    dept_id int auto_increment,
    dept_name varchar(30),
    primary key(dept_id)
);

