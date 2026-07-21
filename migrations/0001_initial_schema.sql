-- Quote requests
CREATE TABLE IF NOT EXISTS quote_requests (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    reference_number TEXT NOT NULL UNIQUE,

    status TEXT NOT NULL DEFAULT 'NEW',

    lead_score INTEGER DEFAULT 0,

    lead_temperature TEXT DEFAULT 'COLD',

    name TEXT NOT NULL,

    email TEXT NOT NULL,

    phone TEXT,

    postcode TEXT,

    address TEXT,

    property_type TEXT,

    room_types TEXT,

    room_dimensions TEXT,

    number_of_units INTEGER,

    existing_ac TEXT,

    preferred_manufacturer TEXT,

    budget_range TEXT,

    timeframe TEXT,

    notes TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

);


-- Quote timeline
CREATE TABLE IF NOT EXISTS quote_updates (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    quote_id INTEGER NOT NULL,

    status TEXT NOT NULL,

    note TEXT,

    customer_visible INTEGER DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (quote_id)
        REFERENCES quote_requests(id)
        ON DELETE CASCADE

);


-- Uploaded files
CREATE TABLE IF NOT EXISTS file_uploads (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    quote_id INTEGER NOT NULL,

    filename TEXT NOT NULL,

    r2_key TEXT NOT NULL,

    mime_type TEXT,

    file_size INTEGER,

    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (quote_id)
        REFERENCES quote_requests(id)
        ON DELETE CASCADE

);


-- Admin users
CREATE TABLE IF NOT EXISTS admins (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    email TEXT NOT NULL UNIQUE,

    name TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);


-- Audit history
CREATE TABLE IF NOT EXISTS audit_logs (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user TEXT,

    action TEXT NOT NULL,

    entity TEXT,

    entity_id INTEGER,

    details TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);


-- Site settings / branding
CREATE TABLE IF NOT EXISTS settings (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    key TEXT NOT NULL UNIQUE,

    value TEXT,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

);


-- Analytics events
CREATE TABLE IF NOT EXISTS analytics_events (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    event_name TEXT NOT NULL,

    page TEXT,

    metadata TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);