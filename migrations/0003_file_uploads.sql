
CREATE TABLE IF NOT EXISTS file_uploads (

  id INTEGER PRIMARY KEY AUTOINCREMENT,

  quote_request_id INTEGER NOT NULL,

  file_name TEXT NOT NULL,

  file_size INTEGER NOT NULL,

  mime_type TEXT NOT NULL,

  r2_key TEXT NOT NULL,

  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (quote_request_id)
    REFERENCES quote_requests(id)

);