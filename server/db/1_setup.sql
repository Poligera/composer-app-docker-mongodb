DROP TABLE IF EXISTS composers;

CREATE TABLE composers (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    full_name varchar(255) NOT NULL,
    country varchar(255) NOT NULL,
    birth_year int NOT NULL,
    death_year int NOT NULL
);