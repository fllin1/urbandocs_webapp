CREATE TABLE
    public.contacts (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT NOW (),
            is_read BOOLEAN DEFAULT FALSE
    );