CREATE TABLE basket (
  id serial PRIMARY KEY,
  basket_url VARCHAR(10)
);

-- maybe add headers and mongo_id later
CREATE TABLE request (
  id serial PRIMARY KEY,
  basket_id integer 
    NOT NULL 
    REFERENCES basket(id)
    ON DELETE CASCADE,
  method VARCHAR(4),
  time_stamp TIMESTAMP
);
