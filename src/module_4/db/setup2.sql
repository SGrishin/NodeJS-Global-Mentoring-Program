SHOW server_encoding;

DROP TABLE IF EXISTS groups;

CREATE TABLE groups (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
	permissions TEXT[] NOT NULL,
    user_ids TEXT[] NOT NULL default [],
);
