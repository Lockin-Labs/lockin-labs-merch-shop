-- Create product_selections table for admin management
CREATE TABLE IF NOT EXISTS product_selections (
  id SERIAL PRIMARY KEY,
  product_id TEXT NOT NULL,
  section TEXT NOT NULL CHECK (section IN ('context_couture', 'engineering_accessories', 'vibe_graphics')),
  is_visible BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(product_id, section)
);

-- Enable RLS
ALTER TABLE product_selections ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users only
CREATE POLICY "Enable read for authenticated users" ON product_selections
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable write for authenticated users" ON product_selections
  FOR ALL TO authenticated USING (true);

-- Create update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_product_selections_updated_at
  BEFORE UPDATE ON product_selections
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();