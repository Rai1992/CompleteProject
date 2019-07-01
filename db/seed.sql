CREATE TABLE users (
  email VARCHAR(60) NOT NULL,
  first_name VARCHAR(40) NOT NULL,
  last_name VARCHAR(40) NOT NULL, 
  username VARCHAR(30) NOT NULL, 
  hash TEXT NOT NULL,
  CONSTRAINT users_pk PRIMARY KEY (username)
);

CREATE TABLE listings (
  list_id SERIAL,
  list_name VARCHAR(40) NOT NULL, 
  seller VARCHAR(40) NOT NULL, 
  condition VARCHAR(40) NOT NULL, 
  price VARCHAR(40) NOT NULL, 
  available BOOLEAN NOT NULL,
  city VARCHAR(40) NOT NULL,
  contact_info VARCHAR(60) NOT NULL, 
  category VARCHAR(40) NOT NULL
);