-- Step 1: Add the case_number column
ALTER TABLE ticketing.tickets
ADD COLUMN case_number TEXT UNIQUE;

-- Step 2: Create a function to generate "PX-XXXX" style case numbers
CREATE OR REPLACE FUNCTION ticketing.generate_case_number()
RETURNS TEXT AS $$
DECLARE
    hex_part TEXT;
    candidate TEXT;
BEGIN
    LOOP
        -- Generate random 4-digit hex
        hex_part := lpad(to_hex(trunc(random() * 65535)::int), 4, '0');
        candidate := 'PX-' || upper(hex_part);

        -- Ensure uniqueness
        IF NOT EXISTS (SELECT 1 FROM ticketing.tickets WHERE case_number = candidate) THEN
            RETURN candidate;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Step 3: Trigger to set case_number before insert
CREATE OR REPLACE FUNCTION ticketing.set_case_number_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.case_number IS NULL THEN
        NEW.case_number := ticketing.generate_case_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_case_number
BEFORE INSERT ON ticketing.tickets
FOR EACH ROW EXECUTE FUNCTION ticketing.set_case_number_trigger();

-- Step 4: Seed 10 dummy tickets (adjust user & customer IDs as per your actual seeded UUIDs)
-- Note: Replace UUIDs with actual existing IDs if necessary
INSERT INTO ticketing.tickets (
  title, description, status, priority, category, team,
  customer_id, assigned_agent_id, assigned_technician_id,
  location_name, location_address, location_city, location_province, location_country, sla_due_at
)
VALUES
-- Ticket 1: Tier 3 Support
('Fibre Down – Johannesburg', 'Customer reports total loss of fibre connectivity.', 'NEW', 'URGENT', 'Connectivity', 'Tier 3 Support',
  (SELECT id FROM ticketing.customers LIMIT 1),
  (SELECT id FROM ticketing.users WHERE email = 'florence@mbvit.co.za'),
  (SELECT id FROM ticketing.users WHERE email = 'ray@mbvit.co.za'),
  'Site A', '123 Joburg Rd', 'Johannesburg', 'Gauteng', 'South Africa', now() + interval '4 hours'),

-- Ticket 2: Tier 2 Support
('Speed Issues – Sandton', 'Speedtests report slow throughput on 100Mbps line.', 'ASSIGNED', 'HIGH', 'Speed', 'Tier 2 Support',
  (SELECT id FROM ticketing.customers LIMIT 1 OFFSET 1),
  (SELECT id FROM ticketing.users WHERE email = 'oda@mbvit.co.za'),
  (SELECT id FROM ticketing.users WHERE email = 'malcolm@mbvit.co.za'),
  'Office 2', '456 Mandela Ave', 'Sandton', 'Gauteng', 'South Africa', now() + interval '1 day'),

-- Ticket 3: Pluxnet 1st Line
('ONT Blinking Red', 'Client reports ONT light blinking red – no service.', 'NEW', 'NORMAL', 'Hardware', 'Pluxnet 1st Line Support',
  (SELECT id FROM ticketing.customers LIMIT 1 OFFSET 2),
  (SELECT id FROM ticketing.users WHERE email = 'aviwe@pluxnet.co.za'),
  NULL,
  'Client Home', '789 Freedom St', 'Midrand', 'Gauteng', 'South Africa', now() + interval '8 hours'),

-- Ticket 4: MBVIT Tier 1
('Password Reset Request', 'User forgot router login credentials.', 'CLOSED', 'LOW', 'Support', 'MBVIT Tier 1 Support',
  (SELECT id FROM ticketing.customers LIMIT 1 OFFSET 3),
  (SELECT id FROM ticketing.users WHERE email = 'brian@mbvit.co.za'),
  NULL,
  'Customer Office', '123 Techno Park', 'Centurion', 'Gauteng', 'South Africa', now() + interval '3 days'),

-- Ticket 5: DMS 1st Line
('Frequent Disconnections', 'Internet drops every 10 minutes.', 'IN_PROGRESS', 'HIGH', 'Stability', 'DMS 1st Line Support',
  (SELECT id FROM ticketing.customers LIMIT 1 OFFSET 4),
  (SELECT id FROM ticketing.users WHERE email = 'princess@dms.co.za'),
  (SELECT id FROM ticketing.users WHERE email = 'stanford@mbvit.co.za'),
  'Site B', '22 Disconnect Rd', 'Polokwane', 'Limpopo', 'South Africa', now() + interval '12 hours'),

-- Ticket 6: Tier 3 Voice
('VoIP Registration Failed', 'SIP client not registering to PBX.', 'NEW', 'URGENT', 'Voice', 'Tier 3 Voice Escalations',
  (SELECT id FROM ticketing.customers LIMIT 1 OFFSET 5),
  (SELECT id FROM ticketing.users WHERE email = 'charity@dms.co.za'),
  (SELECT id FROM ticketing.users WHERE email = 'brian@mbvit.co.za'),
  'Branch 4', '789 SIP Lane', 'Pretoria', 'Gauteng', 'South Africa', now() + interval '3 hours'),

-- Ticket 7: Tier 2 Voice
('One-Way Audio', 'Customer can hear but not be heard.', 'ASSIGNED', 'HIGH', 'Voice', 'Tier 2 Voice Support',
  (SELECT id FROM ticketing.customers LIMIT 1 OFFSET 6),
  (SELECT id FROM ticketing.users WHERE email = 'siyabonga@mbvit.co.za'),
  (SELECT id FROM ticketing.users WHERE email = 'thulani@mbvit.co.za'),
  'Client HQ', '34 Call Center Rd', 'Cape Town', 'Western Cape', 'South Africa', now() + interval '1 day'),

-- Ticket 8: Tier 1 Voice
('Voicemail Not Working', 'User reports voicemail system not receiving messages.', 'NEW', 'NORMAL', 'Voice', 'Tier 1 Voice Support',
  (SELECT id FROM ticketing.customers LIMIT 1 OFFSET 7),
  (SELECT id FROM ticketing.users WHERE email = 'zizipho@mbvit.co.za'),
  NULL,
  'Office Z', '22 Voice Blvd', 'Durban', 'KwaZulu-Natal', 'South Africa', now() + interval '18 hours'),

-- Ticket 9: MBVIT 1st Line Voice
('Client Portal Login Failure', 'Customer can’t log in to VoIP portal.', 'AWAITING_CUSTOMER', 'NORMAL', 'Voice', 'MBVIT 1st Line Voice Ticket Support',
  (SELECT id FROM ticketing.customers LIMIT 1 OFFSET 8),
  (SELECT id FROM ticketing.users WHERE email = 'oda@mbvit.co.za'),
  NULL,
  'Client Office', '100 MB Lane', 'Nelspruit', 'Mpumalanga', 'South Africa', now() + interval '2 days'),

-- Ticket 10: DMS Voice
('Echo During Calls', 'Customer reports echo on all VoIP calls.', 'IN_PROGRESS', 'HIGH', 'Voice', 'DMS 1st Line Ticket Support',
  (SELECT id FROM ticketing.customers LIMIT 1 OFFSET 9),
  (SELECT id FROM ticketing.users WHERE email = 'princess@dms.co.za'),
  (SELECT id FROM ticketing.users WHERE email = 'thembani@mbvit.co.za'),
  'Client Call Center', '88 Reflection St', 'Kimberley', 'Northern Cape', 'South Africa', now() + interval '16 hours');
