CREATE TABLE baskets (
  id serial PRIMARY KEY,
  basket_url CHAR(22)
);

-- maybe add headers and mongo_id later
CREATE TABLE requests (
  id serial PRIMARY KEY,
  basket_id integer 
    NOT NULL 
    REFERENCES baskets(id)
    ON DELETE CASCADE,
  mongo_id CHAR(24),
  method CHAR(4),
  time_stamp TIMESTAMP
);
