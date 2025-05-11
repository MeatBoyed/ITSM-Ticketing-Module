-- Create the schema
CREATE SCHEMA IF NOT EXISTS ticketing;

-- Enums
CREATE TYPE ticketing.user_role AS ENUM ('AGENT', 'TECHNICIAN', 'MANAGER');
CREATE TYPE ticketing.ticket_status AS ENUM ('NEW', 'ASSIGNED', 'IN_PROGRESS', 'AWAITING_CUSTOMER', 'CLOSED');
CREATE TYPE ticketing.ticket_priority AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');
CREATE TYPE ticketing.activity_type AS ENUM (
  'CREATION',
  'ASSIGNMENT',
  'STATUS_CHANGE',
  'COMMENT',
  'TECHNICIAN_ASSIGNMENT',
  'WORK_LOG'
);

-- Users table
CREATE TABLE ticketing.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar TEXT,
  role ticketing.user_role NOT NULL,
  department TEXT
);

-- Customers table
CREATE TABLE ticketing.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT
);

-- Tickets table
CREATE TABLE ticketing.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status ticketing.ticket_status NOT NULL,
  priority ticketing.ticket_priority NOT NULL,
  category TEXT NOT NULL,
  team TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- FK relationships
  customer_id UUID NOT NULL REFERENCES ticketing.customers(id),
  assigned_agent_id UUID REFERENCES ticketing.users(id),
  assigned_technician_id UUID REFERENCES ticketing.users(id),

  -- Flat location fields
  location_name TEXT,
  location_address TEXT,
  location_city TEXT,
  location_province TEXT,
  location_country TEXT,

  -- SLA tracking
  sla_due_at TIMESTAMPTZ
);

-- Activities table
CREATE TABLE ticketing.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type ticketing.activity_type NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  description TEXT NOT NULL,
  note TEXT,

  ticket_id UUID NOT NULL REFERENCES ticketing.tickets(id),
  user_id UUID NOT NULL REFERENCES ticketing.users(id)
);

-- Auto-update updated_at column
CREATE OR REPLACE FUNCTION ticketing.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ticket_updated_at
BEFORE UPDATE ON ticketing.tickets
FOR EACH ROW EXECUTE FUNCTION ticketing.update_updated_at_column();
