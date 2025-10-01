DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public
------------------------------------------- --------
CREATE TABLE "persons" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "photo" varchar(150),
  "first_name" varchar(30) NOT NULL,
  "last_name" varchar(40) NOT NULL,
  "gender" varchar(10) NOT NULL,
  "marital_status" varchar(12),
  "id_number" varchar(12),
  "education_level" varchar(50),
  "phone" varchar(15),
  "address" varchar(150),
  "birth_date" date,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TABLE "education" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "consolidation_level" varchar(2),
  "leader_school" boolean,
  "prophetic_school" boolean,
  "person_id" int NOT NULL,
  FOREIGN KEY ("person_id") REFERENCES "persons" ("id")
);

----------------------------------------------------------------------------------

CREATE TABLE "territories" (
  "id" varchar(2) UNIQUE PRIMARY KEY NOT NULL,
  "name" varchar(17) NOT NULL,
  "male" boolean NOT NULL
);

CREATE TABLE "user_types" (
  "id" varchar(2) UNIQUE PRIMARY KEY NOT NULL,
  "title" varchar(20) NOT NULL,
  "description" varchar(150) NOT NULL
);

CREATE TABLE "users" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "username" varchar(25) NOT NULL,
  "password" varchar(65) NOT NULL,
  "email" varchar(100),
  "active" boolean NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp,
  "leader_id" int,
  "person_id" int NOT NULL,
  "user_type_id" varchar(2) NOT NULL,
  "territory_id" varchar(2) NOT NULL,
  FOREIGN KEY ("leader_id") REFERENCES "users" ("id"),
  FOREIGN KEY ("person_id") REFERENCES "persons" ("id"),
  FOREIGN KEY ("user_type_id") REFERENCES "user_types" ("id"),
  FOREIGN KEY ("territory_id") REFERENCES "territories" ("id")
);

-----------------------------------------------------------------------------------

CREATE TABLE "cell_types" (
  "id" varchar(2) UNIQUE PRIMARY KEY NOT NULL,
  "title" varchar(20) NOT NULL,
  "description" varchar(150) NOT NULL
);

CREATE TABLE "cells" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "active" boolean NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp,
  "cell_type_id" varchar(2) NOT NULL, 
  "territory_id" varchar(2) NOT NULL, 
  "user_id" int NOT NULL,
  FOREIGN KEY ("cell_type_id") REFERENCES "cell_types" ("id"),
  FOREIGN KEY ("territory_id") REFERENCES "territories" ("id"),
  FOREIGN KEY ("user_id") REFERENCES "users" ("id")
);

CREATE TABLE "member_types" (
  "id" varchar(2) UNIQUE PRIMARY KEY NOT NULL,
  "title" varchar(20) NOT NULL,
  "description" varchar(150) NOT NULL
);

CREATE TABLE "cells_persons" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "active" boolean NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp,
  "member_type_id" varchar(2) NOT NULL,
  "cell_id" int NOT NULL,
  "person_id" int NOT NULL,
  FOREIGN KEY ("member_type_id") REFERENCES "member_types" ("id"),
  FOREIGN KEY ("cell_id") REFERENCES "cells" ("id"),
  FOREIGN KEY ("person_id") REFERENCES "persons" ("id")
);

------------------------------------------------------------------------------------------------

CREATE TABLE "titles" (
  "id" varchar(2) UNIQUE PRIMARY KEY NOT NULL,
  "title" varchar(30) NOT NULL,
  "description" varchar(150) NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp,
  "user_id" int NOT NULL,
  FOREIGN KEY ("user_id") REFERENCES "users" ("id")
);

CREATE TABLE "meeting_places" (
  "id" varchar(40) UNIQUE PRIMARY KEY NOT NULL,
  "location" varchar(100),
  "details" varchar(150) NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp,
  "user_id" int NOT NULL,
  FOREIGN KEY ("user_id") REFERENCES "users" ("id")
);

-----------------------------------------------------------------------------------------

CREATE TABLE "meetings" (
  "id" varchar(40) UNIQUE PRIMARY KEY NOT NULL,
  "date" date NOT NULL,
  "start_time" time NOT NULL,
  "end_time" time,
  "completed" boolean,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp,
  "cell_id" int NOT NULL,
  "user_id" int NOT NULL,
  "meeting_place_id" varchar(40) NOT NULL,
  "title_id" varchar(2) NOT NULL,
  FOREIGN KEY ("cell_id") REFERENCES "cells" ("id"),
  FOREIGN KEY ("user_id") REFERENCES "users" ("id"),
  FOREIGN KEY ("meeting_place_id") REFERENCES "meeting_places" ("id"),
  FOREIGN KEY ("title_id") REFERENCES "titles" ("id")
);

CREATE TABLE "meeting_details" (
  "id" varchar(40) UNIQUE PRIMARY KEY NOT NULL,
  "dynamic" boolean,
  "praise" boolean,
  "message" boolean,
  "offering" NUMERIC,
  "consolidation" boolean,
  "guests" varchar(3),
  "meeting_id" varchar(40) NOT NULL,
  FOREIGN KEY ("meeting_id") REFERENCES "meetings" ("id")
);

CREATE TABLE "attendance_types" (
  "id" varchar(2) UNIQUE PRIMARY KEY NOT NULL,
  "title" varchar(20) NOT NULL,
  "description" varchar(100) NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TABLE "attendances" (
  "person_id" int NOT NULL,
  "meeting_id" varchar(40) NOT NULL,
  "attendance_type_id" varchar(2) NOT NULL,
  "attended" boolean,
  FOREIGN KEY ("person_id") REFERENCES "persons" ("id"),
  FOREIGN KEY ("meeting_id") REFERENCES "meetings" ("id"),
  FOREIGN KEY ("attendance_type_id") REFERENCES "attendance_types" ("id")
);


------------------------------------------------------------------------------------------------------
-------------------------------INSERT EXAMPLE-----------------------------------------------------
--------------------------------------------------------------------------------------------------

INSERT INTO territories (id, name, male) VALUES
('RD', 'Red', true),
('RF', 'Red', false),
('BL', 'Blue', true),
('BF', 'Blue', false),
('GR', 'Green', true),
('GF', 'Green', false),
('YL', 'Yellow', true),
('YF', 'Yellow', false);


INSERT INTO user_types (id, title, description) VALUES
('PA', 'Pastor', 'Church pastor responsible for spiritual guidance'),
('L1', 'Leader of 12', 'Leader responsible for a group of 12 members'),
('LI', 'Leader', 'General group leader'),
('DI', 'Disciple', 'Member who follows teachings and participates actively');


INSERT INTO persons (photo, first_name, last_name, gender, marital_status, id_number, education_level, phone, address, birth_date, created_at, updated_at) VALUES
('photos/john_pastor.jpg', 'John', 'Pastor', 'Male', 'Married', '1000000001', 'Master', '555-0001', '1 Church St', '1970-01-01', NOW(), NULL),
('photos/mary_leader12.jpg', 'Mary', 'Leader12', 'Female', 'Married', '1000000002', 'Bachelor', '555-0002', '2 Church St', '1980-02-02', NOW(), NULL),
('photos/paul_leader.jpg', 'Paul', 'Leader', 'Male', 'Single', '1000000003', 'Bachelor', '555-0003', '3 Church St', '1990-03-03', NOW(), NULL),
('photos/lisa_disciple.jpg', 'Lisa', 'Disciple', 'Female', 'Single', '1000000004', 'High School', '555-0004', '4 Church St', '2000-04-04', NOW(), NULL);


-- Insert Pastor (top of hierarchy, no leader_id)
INSERT INTO users (username, password, email, active, created_at, updated_at, leader_id, person_id, user_type_id, territory_id) VALUES
('johnpastor', 'pass123', 'john.pastor@example.com', true, NOW(), NULL, NULL, 1, 'PA', 'RD');  -- Male Pastor in Red Male territory

-- Insert Leader of 12 (leader_id = Pastor)
INSERT INTO users (username, password, email, active, created_at, updated_at, leader_id, person_id, user_type_id, territory_id) VALUES
('maryleader12', 'pass234', 'mary.leader12@example.com', true, NOW(), NULL, 1, 2, 'L1', 'RF');  -- Female Leader of 12 in Red Female territory, leader is John Pastor (id=1)

-- Insert Leader (leader_id = Leader of 12)
INSERT INTO users (username, password, email, active, created_at, updated_at, leader_id, person_id, user_type_id, territory_id) VALUES
('paulleader', 'pass345', 'paul.leader@example.com', true, NOW(), NULL, 2, 3, 'LI', 'BL');  -- Male Leader in Blue Male territory, leader is Mary Leader12 (id=2)

-- Insert Disciple (leader_id = Leader)
INSERT INTO users (username, password, email, active, created_at, updated_at, leader_id, person_id, user_type_id, territory_id) VALUES
('lisadisciple', 'pass456', 'lisa.disciple@example.com', true, NOW(), NULL, 3, 4, 'DI', 'BF');  -- Female Disciple in Blue Female territory, leader is Paul Leader (id=3)

