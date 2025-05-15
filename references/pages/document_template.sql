-- This SQL script creates a table for storing documents, including their metadata,
-- and sets up triggers and functions for managing ratings and downloads.

-- Create a table for documents stats

CREATE TABLE public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    file_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    avg_rating NUMERIC(3,2) DEFAULT 0,
    downloads INTEGER DEFAULT 0
);

-- Function to update the average rating of a document
CREATE OR REPLACE FUNCTION increment_downloads(doc_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.documents
  SET downloads = downloads + 1
  WHERE id = doc_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update the average rating of a document
CREATE OR REPLACE FUNCTION update_avg_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.documents
  SET avg_rating = (
    SELECT AVG(rating)
    FROM public.ratings
    WHERE document_id = NEW.document_id
  )
  WHERE id = NEW.document_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_document_rating
AFTER INSERT OR UPDATE ON public.ratings
FOR EACH ROW
EXECUTE FUNCTION update_avg_rating();

-- Create tables for comments and ratings

CREATE TABLE public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(document_id, user_id)
);