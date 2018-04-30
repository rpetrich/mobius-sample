CREATE SCHEMA IF NOT EXISTS mobius_todo;
CREATE TABLE IF NOT EXISTS mobius_todo.items(
    id SERIAL,
    text TEXT NOT NULL,
    PRIMARY KEY (id)
);
