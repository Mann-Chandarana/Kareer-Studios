CREATE TABLE IF NOT EXISTS admins
(
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    createdat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
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
    qualifiction TEXT,
    createdat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
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
    createdat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
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
    createdat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_student_id
    FOREIGN KEY (student_id)
    REFERENCES students(id)
    ON DELETE SET NULL
);


CREATE TABLE IF NOT EXISTS receipts (
    id TEXT PRIMARY KEY, 
    student_id INTEGER NOT NULL,
    amount FLOAT4 DEFAULT 0,
    pdf BYTEA NOT NULL,
    date_issued TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_student_id
    FOREIGN KEY (student_id)
    REFERENCES students(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS student_feedbacks (
    id SERIAL PRIMARY KEY,
    student_id INTEGER,
    counsellor_id INTEGER,
    
    referral TEXT,
    rating INTEGER,
    overall_experience TEXT,

    CONSTRAINT fk_student_id
    FOREIGN KEY (student_id)
    REFERENCES students(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_counsellor_id
    FOREIGN KEY (counsellor_id)
    REFERENCES counsellors(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS counsellor_feedbacks(
    id SERIAL PRIMARY KEY,
    student_id INTEGER,
    counsellor_id INTEGER,
    performance TEXT,
    planning TEXT,
    feedback TEXT,

    CONSTRAINT fk_student_id
    FOREIGN KEY (student_id)
    REFERENCES students(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_counsellor_id
    FOREIGN KEY (counsellor_id)
    REFERENCES counsellors(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reports(
    id SERIAL PRIMARY KEY,
    student_id INTEGER,

    scp_leadership FLOAT,
    scp_management FLOAT,
    scp_bodybalance FLOAT,
    scp_logic FLOAT,
    scp_bodymovement FLOAT,
    scp_senses FLOAT,
    scp_rhythm FLOAT,
    scp_visual FLOAT,
    scp_observation FLOAT,
    scp_communication FLOAT,

    tp_right TEXT,   
    tp_left TEXT,

    as_follower FLOAT,
    as_experimental FLOAT,
    as_different FLOAT,
    as_thoughtful FLOAT,    

    lc_auditory FLOAT,
    lc_visual FLOAT,
    lc_physical FLOAT,

    wa_intelligent FLOAT,
    wa_emotional FLOAT,
    wa_visionary FLOAT,
    wa_creative FLOAT,
    wa_adverse FLOAT,

    pt_name TEXT,
    pt_info TEXT,

    sc_careers TEXT,
    sc_stream TEXT,
    sc_subjects TEXT,

    additional_note TEXT,
    createdat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_student_id
    FOREIGN KEY (student_id)
    REFERENCES students(id)
    ON DELETE CASCADE
    
);