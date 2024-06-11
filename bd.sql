create database invest;
use invest;

drop table investapp;
CREATE TABLE investapp (
	id int primary key auto_increment,
	nome varchar(30),
    price int,
    opcao enum("Infra", "Desenvolvimento", "Design", "Planejamento")
);

desc investapp;

select * from investapp;

SHOW GLOBAL VARIABLES LIKE 'PORT';
