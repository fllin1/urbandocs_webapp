/*
# Initial Schema Setup

1. New Tables
- `cities` - Stores city information
- `id` (uuid, primary key)
- `name` (text, unique)
- `created_at` (timestamp)

- `zonings` - Stores zoning information
- `id` (uuid, primary key)
- `city_id` (uuid, foreign key)
- `name` (text)
- `created_at` (timestamp)

- `zones` - Stores zone information
- `id` (uuid, primary key)
- `zoning_id` (uuid, foreign key)
- `name` (text)
- `created_at` (timestamp)

- `documents` - Stores document information
- `id` (uuid, primary key)
- `zone_id` (uuid, foreign key)
- `file_url` (text)
- `source_date` (date)
- `created_at` (timestamp)

2. Security
- Enable RLS on all tables
- Add policies for authenticated users to read data
- Add policies for service role to manage data
 */
-- Create tables
CREATE TABLE
    IF NOT EXISTS cities (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        name text UNIQUE NOT NULL,
        created_at timestamptz DEFAULT now ()
    );

CREATE TABLE
    IF NOT EXISTS zonings (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        city_id uuid REFERENCES cities (id) ON DELETE CASCADE,
        name text NOT NULL,
        created_at timestamptz DEFAULT now (),
        UNIQUE (city_id, name)
    );

CREATE TABLE
    IF NOT EXISTS zones (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        zoning_id uuid REFERENCES zonings (id) ON DELETE CASCADE,
        name text NOT NULL,
        created_at timestamptz DEFAULT now (),
        UNIQUE (zoning_id, name)
    );

CREATE TABLE
    IF NOT EXISTS documents (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        zone_id uuid REFERENCES zones (id) ON DELETE CASCADE,
        file_url text NOT NULL,
        source_date date,
        created_at timestamptz DEFAULT now ()
    );

-- Enable Row Level Security
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

ALTER TABLE zonings ENABLE ROW LEVEL SECURITY;

ALTER TABLE zones ENABLE ROW LEVEL SECURITY;

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create policies for cities
CREATE POLICY "Cities are viewable by everyone" ON cities FOR
SELECT
    USING (true);

-- Create policies for zonings
CREATE POLICY "Zonings are viewable by everyone" ON zonings FOR
SELECT
    USING (true);

-- Create policies for zones
CREATE POLICY "Zones are viewable by everyone" ON zones FOR
SELECT
    USING (true);

-- Create policies for documents
CREATE POLICY "Documents are viewable by authenticated users only" ON documents FOR
SELECT
    TO authenticated USING (true);