CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    user_name varchar(180),
    auth_id text,
    first_name varchar(180),
    last_name varchar(180),
    friends text
)