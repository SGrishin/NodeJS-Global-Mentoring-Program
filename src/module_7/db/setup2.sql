SHOW server_encoding;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
	login VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
    age INTEGER NOT NULL default 4,
    is_deleted BOOLEAN NOT NULL default false,
	created_on TIMESTAMP NOT NULL default now()
);

INSERT INTO users (login, password, age) values
    ('petay@mail.ru', 'qwerty', 23),
    ('vasya@mail.ru', 'qwerty', 32),
    ('eugene@mail.ru', 'qwerty', 24);

