CREATE TABLE IF NOT EXISTS admins
(
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
);

CREATE TABLE IF NOT EXISTS counsellors
(
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT,
    name TEXT,
    salary INTEGER,
    address TEXT,
    bank_name TEXT,
    bank_ifsc TEXT,
    bank_ac TEXT,
    bank_micr TEXT,
    phone TEXT,
    experience INTEGER,
    qualifiction TEXT
);

CREATE TABLE IF NOT EXISTS students 
(
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    counsellor_id INTEGER,
    phone TEXT,
    whatsapp TEXT,
    city TEXT,
    address TEXT,
    pincode INTEGER,
    parent_added BOOLEAN NOT NULL DEFAULT FALSE,
    gender TEXT,
    paid BOOLEAN NOT NULL DEFAULT FALSE,
    
    CONSTRAINT fk_counsellor_id
    FOREIGN KEY (counsellor_id)
    REFERENCES counsellors(id)
    ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS parents
(
    id SERIAL PRIMARY KEY,
    student_id INTEGER ,
    email TEXT UNIQUE,
    password TEXT,
    no_of_childs INTEGER,
    occupation TEXT,
    family_type TEXT,
    salary INTEGER,
    name TEXT,
    gender TEXT,
    phone TEXT,

    CONSTRAINT fk_student_id
    FOREIGN KEY (student_id)
    REFERENCES students(id)
    ON DELETE SET NULL
);


CREATE TABLE IF NOT EXISTS receipts (
    student_id INTEGER NOT NULL,
    pdf BYTEA NOT NULL,
    date_issued TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_student_id
    FOREIGN KEY (student_id)
    REFERENCES students(id)
    ON DELETE SET NULL
)