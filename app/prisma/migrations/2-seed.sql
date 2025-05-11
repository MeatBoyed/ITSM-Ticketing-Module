-- Drop existing tables (if needed, be cautious in prod!)
DROP TABLE IF EXISTS ticketing.team_members;
DROP TABLE IF EXISTS ticketing.teams;
-- DROP TABLE IF EXISTS ticketing.users;

-- -- Create the 'users' table
-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
--     email VARCHAR(100) UNIQUE NOT NULL,
--     role VARCHAR(50) NOT NULL CHECK (role IN ('AGENT', 'TECHNICIAN'))
-- );

-- Create the 'teams' table
CREATE TABLE ticketing.teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Create the 'team_members' join table
CREATE TABLE ticketing.team_members (
    user_id INTEGER NOT NULL REFERENCES ticketing.users(id) ON DELETE CASCADE,
    team_id INTEGER NOT NULL REFERENCES ticketing.teams(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, team_id)
);

-- Seed Support Teams
INSERT INTO ticketing.teams (id, name) VALUES
    (1, 'Tier 3 Support'),
    (2, 'Tier 2 Support'),
    (3, 'Pluxnet 1st Line Support'),
    (4, 'MBVIT Tier 1 Support'),
    (5, 'DMS 1st Line Support'),
    (6, 'Tier 3 Voice Escalations'),
    (7, 'Tier 2 Voice Support'),
    (8, 'Tier 1 Voice Support'),
    (9, 'MBVIT 1st Line Voice Ticket Support'),
    (10, 'DMS 1st Line Ticket Support');

-- Seed Users
INSERT INTO ticketing.users (id, name, email, role) VALUES
    (1, 'Ray Erasmus', 'ray@mbvit.co.za', 'TECHNICIAN'),
    (2, 'Darryl Botha', 'darryl@mbvit.co.za', 'TECHNICIAN'),
    (3, 'Malcolm Banda', 'malcolm@mbvit.co.za', 'TECHNICIAN'),
    (4, 'Stanford Shonhayi', 'stanford@mbvit.co.za', 'TECHNICIAN'),
    (5, 'Thuso Gama', 'thuso@mbvit.co.za', 'TECHNICIAN'),
    (6, 'Yuran Ndlovu', 'yuran@pluxnet.co.za', 'AGENT'),
    (7, 'Dawn Mmkubjane', 'dawn@pluxnet.co.za', 'AGENT'),
    (8, 'Aviwe Dyantyi', 'aviwe@pluxnet.co.za', 'AGENT'),
    (9, 'Siyabonga Ntuli', 'siyabonga@mbvit.co.za', 'AGENT'),
    (10, 'Oda Nthangeni', 'oda@mbvit.co.za', 'AGENT'),
    (11, 'Florence Mahlalela', 'florence@mbvit.co.za', 'AGENT'),
    (12, 'Charity Masia', 'charity@dms.co.za', 'AGENT'),
    (13, 'Princess Ngakane', 'princess@dms.co.za', 'AGENT'),
    (14, 'Thokozile Modimola', 'thokozile@dms.co.za', 'AGENT'),
    (15, 'Brian Masipa', 'brian@mbvit.co.za', 'TECHNICIAN'),
    (16, 'Thulani Nkosi', 'thulani@mbvit.co.za', 'TECHNICIAN'),
    (17, 'Thembani Mashele', 'thembani@mbvit.co.za', 'TECHNICIAN'),
    (18, 'Zizipho Mbantsa', 'zizipho@mbvit.co.za', 'AGENT');

-- Map Users to Teams
INSERT INTO ticketing.team_members (user_id, team_id) VALUES
    -- Tier 3 Support
    (1, 1), (2, 1),
    -- Tier 2 Support
    (3, 2), (4, 2), (5, 2),
    -- Pluxnet 1st Line Support
    (6, 3), (7, 3), (8, 3),
    -- MBVIT Tier 1 Support
    (9, 4), (10, 4), (11, 4),
    -- DMS 1st Line Support
    (12, 5), (13, 5), (14, 5),
    -- Tier 3 Voice Escalations
    (15, 6),
    -- Tier 2 Voice Support
    (16, 7), (17, 7),
    -- Tier 1 Voice Support
    (18, 8),
    -- MBVIT Voice Ticket Support
    (9, 9), (10, 9), (11, 9),
    -- DMS Voice Ticket Support
    (12, 10), (13, 10), (14, 10);


select * from ticketing.users;