/*
  # Initial Schema Setup for Global Enterprises

  1. New Tables
    - users (for authentication)
    - enquiries (for lead form submissions)
    - properties (base table for all property types)
    - resale_properties (for resale listings)
    - primary_sale_properties (for new property listings)
    - rental_properties (for rental listings)
    - plots (for gated community plots)
    - construction_services (for construction portfolio)
    - interior_designs (for interior design portfolio)
    - developers (for developer partnerships)
    - awards (for company awards)
    - team (for team members)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
*/

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  requirement TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create enquiries"
  ON enquiries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read enquiries"
  ON enquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Base properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  builder_name TEXT NOT NULL,
  project TEXT NOT NULL,
  location TEXT NOT NULL,
  size TEXT NOT NULL,
  possession_date DATE,
  units INTEGER,
  towers INTEGER,
  floors INTEGER,
  flat_per_floor INTEGER,
  type TEXT NOT NULL,
  price NUMERIC NOT NULL,
  images TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Resale Properties
CREATE TABLE IF NOT EXISTS resale_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  builder_name TEXT NOT NULL,
  project TEXT NOT NULL,
  location TEXT NOT NULL,
  size TEXT NOT NULL,
  possession_date DATE,
  units INTEGER,
  towers INTEGER,
  floors INTEGER,
  flat_per_floor INTEGER,
  type TEXT NOT NULL,
  price NUMERIC NOT NULL,
  images TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE resale_properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read resale properties"
  ON resale_properties
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage resale properties"
  ON resale_properties
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- Primary Sale Properties
CREATE TABLE IF NOT EXISTS primary_sale_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  builder_name TEXT NOT NULL,
  project TEXT NOT NULL,
  location TEXT NOT NULL,
  size TEXT NOT NULL,
  possession_date DATE,
  units INTEGER,
  towers INTEGER,
  floors INTEGER,
  flat_per_floor INTEGER,
  type TEXT NOT NULL,
  price NUMERIC NOT NULL,
  images TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE primary_sale_properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read resale properties"
  ON primary_sale_properties
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage resale properties"
  ON primary_sale_properties
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Rental Properties
CREATE TABLE IF NOT EXISTS rental_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  builder_name TEXT NOT NULL,
  project TEXT NOT NULL,
  location TEXT NOT NULL,
  size TEXT NOT NULL,
  possession_date DATE,
  units INTEGER,
  towers INTEGER,
  floors INTEGER,
  flat_per_floor INTEGER,
  type TEXT NOT NULL,
  price NUMERIC NOT NULL,
  images TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE rental_properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read resale properties"
  ON rental_properties
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage resale properties"
  ON rental_properties
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- Plots
CREATE TABLE IF NOT EXISTS plots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  builder_name TEXT NOT NULL,
  project TEXT NOT NULL,
  location TEXT NOT NULL,
  price_per_sqft NUMERIC NOT NULL,
  total_price NUMERIC NOT NULL,
  images TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE plots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read plots"
  ON plots
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage plots"
  ON plots
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Construction Services
CREATE TABLE IF NOT EXISTS construction_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  images TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE construction_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read construction services"
  ON construction_services
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage construction services"
  ON construction_services
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Interior Designs
CREATE TABLE IF NOT EXISTS interior_designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  images TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE interior_designs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read interior designs"
  ON interior_designs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage interior designs"
  ON interior_designs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Developers
CREATE TABLE IF NOT EXISTS developers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE developers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read developers"
  ON developers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage developers"
  ON developers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Awards
CREATE TABLE IF NOT EXISTS awards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE awards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read awards"
  ON awards
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage awards"
  ON awards
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Team
CREATE TABLE IF NOT EXISTS team (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE team ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read team"
  ON team
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage team"
  ON team
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for specific tables
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_resale_properties_updated_at
  BEFORE UPDATE ON resale_properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_primary_sale_properties_updated_at
  BEFORE UPDATE ON primary_sale_properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_rental_properties_updated_at
  BEFORE UPDATE ON rental_properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_plots_updated_at
  BEFORE UPDATE ON plots
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_construction_services_updated_at
  BEFORE UPDATE ON construction_services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_interior_designs_updated_at
  BEFORE UPDATE ON interior_designs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_developers_updated_at
  BEFORE UPDATE ON developers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_awards_updated_at
  BEFORE UPDATE ON awards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_team_updated_at
  BEFORE UPDATE ON team
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();