CREATE DATABASE goodfoodhunting;

CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    image_url TEXT,
    user_id INTEGER
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    password_digest TEXT
);

-- ALTER TABLE dishes
-- ADD COLUMN restaurants TEXT,
-- ADD COLUMN location TEXT;

INSERT INTO dishes(title, image_url) VALUES ('cake', 'https://preppykitchen.com/wp-content/uploads/2018/04/Funfetti-cake-recipe-new.jpg');
INSERT INTO dishes(title, image_url) VALUES ('pudding', 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/121740.jpg');
INSERT INTO dishes(title, image_url) VALUES ('cake', 'https://dulcetcakessweets.com.au/wp-content/uploads/2021/11/2021.11.9-DULCET-Xmas-Cakes0266-2.jpg');

INSERT INTO users (email) VALUES ('dt@ga.co');
INSERT INTO users (email) VALUES ('dt@generalassemb.ly');

ALTER TABLE dishes ADD COLUMN user_id INTEGER;