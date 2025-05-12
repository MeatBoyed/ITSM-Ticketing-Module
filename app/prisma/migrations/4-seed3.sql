-- Step 1: Seed 10 Customers
INSERT INTO ticketing.customers (name, email, phone)
VALUES
  ('Thabo Mokoena', 'thabo@example.com', '+27831234567'),
  ('Ayesha Patel', 'ayesha@example.com', '+27831234568'),
  ('Sipho Dlamini', 'sipho@example.com', '+27831234569'),
  ('Nomsa Khumalo', 'nomsa@example.com', '+27831234570'),
  ('Lebo Ndlovu', 'lebo@example.com', '+27831234571'),
  ('Mohammed Essop', 'mohammed@example.com', '+27831234572'),
  ('Chantelle Venter', 'chantelle@example.com', '+27831234573'),
  ('Sibusiso Zulu', 'sibusiso@example.com', '+27831234574'),
  ('Kabelo Molefe', 'kabelo@example.com', '+27831234575'),
  ('Lindiwe Mthembu', 'lindiwe@example.com', '+27831234576');

-- Step 2: Seed 10 Tickets linked to those customers
INSERT INTO ticketing.tickets (
  title, description, status, priority, category, team,
  customer_id, assigned_agent_id, assigned_technician_id,
  location_name, location_address, location_city, location_province, location_country, sla_due_at
)
VALUES
('Fibre Down – Johannesburg', 'Customer reports total loss of fibre connectivity.', 'NEW', 'URGENT', 'Connectivity', 'Tier 3 Support',
  (SELECT id FROM ticketing.customers WHERE email = 'thabo@example.com'),
  (SELECT id FROM ticketing.users WHERE email = 'florence@mbvit.co.za'),
  (SELECT id FROM ticketing.users WHERE email = 'ray@mbvit.co.za'),
  'Site A', '123 Joburg Rd', 'Johannesburg', 'Gauteng', 'South Africa', now() + interval '4 hours'),

('Speed Issues – Sandton', 'Speedtests report slow throughput on 100Mbps line.', 'ASSIGNED', 'HIGH', 'Speed', 'Tier 2 Support',
  (SELECT id FROM ticketing.customers WHERE email = 'ayesha@example.com'),
  (SELECT id FROM ticketing.users WHERE email = 'oda@mbvit.co.za'),
  (SELECT id FROM ticketing.users WHERE email = 'malcolm@mbvit.co.za'),
  'Office 2', '456 Mandela Ave', 'Sandton', 'Gauteng', 'South Africa', now() + interval '1 day'),

('ONT Blinking Red', 'Client reports ONT light blinking red – no service.', 'NEW', 'NORMAL', 'Hardware', 'Pluxnet 1st Line Support',
  (SELECT id FROM ticketing.customers WHERE email = 'sipho@example.com'),
  (SELECT id FROM ticketing.users WHERE email = 'aviwe@pluxnet.co.za'),
  NULL,
  'Client Home', '789 Freedom St', 'Midrand', 'Gauteng', 'South Africa', now() + interval '8 hours'),

('Password Reset Request', 'User forgot router login credentials.', 'CLOSED', 'LOW', 'Support', 'MBVIT Tier 1 Support',
  (SELECT id FROM ticketing.customers WHERE email = 'nomsa@example.com'),
  (SELECT id FROM ticketing.users WHERE email = 'brian@mbvit.co.za'),
  NULL,
  'Customer Office', '123 Techno Park', 'Centurion', 'Gauteng', 'South Africa', now() + interval '3 days'),

('Frequent Disconnections', 'Internet drops every 10 minutes.', 'IN_PROGRESS', 'HIGH', 'Stability', 'DMS 1st Line Support',
  (SELECT id FROM ticketing.customers WHERE email = 'lebo@example.com'),
  (SELECT id FROM ticketing.users WHERE email = 'princess@dms.co.za'),
  (SELECT id FROM ticketing.users WHERE email = 'stanford@mbvit.co.za'),
  'Site B', '22 Disconnect Rd', 'Polokwane', 'Limpopo', 'South Africa', now() + interval '12 hours'),

('VoIP Registration Failed', 'SIP client not registering to PBX.', 'NEW', 'URGENT', 'Voice', 'Tier 3 Voice Escalations',
  (SELECT id FROM ticketing.customers WHERE email = 'mohammed@example.com'),
  (SELECT id FROM ticketing.users WHERE email = 'charity@dms.co.za'),
  (SELECT id FROM ticketing.users WHERE email = 'brian@mbvit.co.za'),
  'Branch 4', '789 SIP Lane', 'Pretoria', 'Gauteng', 'South Africa', now() + interval '3 hours'),

('One-Way Audio', 'Customer can hear but not be heard.', 'ASSIGNED', 'HIGH', 'Voice', 'Tier 2 Voice Support',
  (SELECT id FROM ticketing.customers WHERE email = 'chantelle@example.com'),
  (SELECT id FROM ticketing.users WHERE email = 'siyabonga@mbvit.co.za'),
  (SELECT id FROM ticketing.users WHERE email = 'thulani@mbvit.co.za'),
  'Client HQ', '34 Call Center Rd', 'Cape Town', 'Western Cape', 'South Africa', now() + interval '1 day'),

('Voicemail Not Working', 'User reports voicemail system not receiving messages.', 'NEW', 'NORMAL', 'Voice', 'Tier 1 Voice Support',
  (SELECT id FROM ticketing.customers WHERE email = 'sibusiso@example.com'),
  (SELECT id FROM ticketing.users WHERE email = 'zizipho@mbvit.co.za'),
  NULL,
  'Office Z', '22 Voice Blvd', 'Durban', 'KwaZulu-Natal', 'South Africa', now() + interval '18 hours'),

('Client Portal Login Failure', 'Customer can’t log in to VoIP portal.', 'AWAITING_CUSTOMER', 'NORMAL', 'Voice', 'MBVIT 1st Line Voice Ticket Support',
  (SELECT id FROM ticketing.customers WHERE email = 'kabelo@example.com'),
  (SELECT id FROM ticketing.users WHERE email = 'oda@mbvit.co.za'),
  NULL,
  'Client Office', '100 MB Lane', 'Nelspruit', 'Mpumalanga', 'South Africa', now() + interval '2 days'),

('Echo During Calls', 'Customer reports echo on all VoIP calls.', 'IN_PROGRESS', 'HIGH', 'Voice', 'DMS 1st Line Ticket Support',
  (SELECT id FROM ticketing.customers WHERE email = 'lindiwe@example.com'),
  (SELECT id FROM ticketing.users WHERE email = 'princess@dms.co.za'),
  (SELECT id FROM ticketing.users WHERE email = 'thembani@mbvit.co.za'),
  'Client Call Center', '88 Reflection St', 'Kimberley', 'Northern Cape', 'South Africa', now() + interval '16 hours');


  

