CREATE TABLE customer_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    quote_id INTEGER NOT NULL,

    token TEXT NOT NULL UNIQUE,

    expires_at TEXT NOT NULL,

    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);