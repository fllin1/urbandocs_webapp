/*
  # Create PLU summary related tables

  1. New Tables
    - `comments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `document_id` (uuid, references documents)
      - `content` (text)
      - `created_at` (timestamp)
    
    - `ratings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `document_id` (uuid, references documents)
      - `rating` (integer, 1-5)
      - `created_at` (timestamp)
    
    - `view_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `document_id` (uuid, references documents)
      - `viewed_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  document_id uuid REFERENCES documents NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all comments"
  ON comments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own comments"
  ON comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  document_id uuid REFERENCES documents NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, document_id)
);

ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all ratings"
  ON ratings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create/update their own ratings"
  ON ratings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- View history table
CREATE TABLE IF NOT EXISTS view_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  document_id uuid REFERENCES documents NOT NULL,
  viewed_at timestamptz DEFAULT now()
);

ALTER TABLE view_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own view history"
  ON view_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own view history"
  ON view_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Add new columns to documents table if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'documents' AND column_name = 'plu_summary_markdown_content'
  ) THEN
    ALTER TABLE documents ADD COLUMN plu_summary_markdown_content text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'documents' AND column_name = 'pdf_storage_path'
  ) THEN
    ALTER TABLE documents ADD COLUMN pdf_storage_path text;
  END IF;
END $$;