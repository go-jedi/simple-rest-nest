CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL,
    uid VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    banned BOOLEAN NOT NULL DEFAULT 'f',
    banReason VARCHAR(255) NOT NULL DEFAULT '',
    created TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS roles(
    id SERIAL PRIMARY KEY NOT NULL,
    value VARCHAR(255) NOT NULL UNIQUE,
    created TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_roles(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER,
    role_id INTEGER,
    created TIMESTAMP NOT NULL DEFAULT now(),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(role_id) REFERENCES roles(id)
); 