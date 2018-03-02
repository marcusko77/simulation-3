INSERT INTO users
(user_name, auth_id, first_name, last_name)
values
($1, $2, $3, $4)
returning *