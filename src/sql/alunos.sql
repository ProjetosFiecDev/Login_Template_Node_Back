create table alunos (
	id INT primary key auto_increment,
	rm INT unique,
	nome VARCHAR(100) NOT NULL,
	genero CHAR(10) NOT NULL,
	data_nascimento DATE NOT NULL, 
	curso VARCHAR (50) NOT NULL,
	periodo CHAR(5) NOT NULL,
	tipo_sanguineo CHAR(3) NULL,
	data_cadastro DATETIME NOT NULL
);