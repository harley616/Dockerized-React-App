CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  user_name varchar(50) NOT NULL,
  password varchar(50) NOT NULL
); 