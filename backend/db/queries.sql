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
    experience INTEGER DEFAULT 0,
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
    messages INTEGER,
    
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
    
    comment TEXT,
    pdf BYTEA,

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
    phone TEXT,
    status BOOLEAN,
    start_date TEXT,
    performance TEXT,
    comments TEXT,
    pdf BYTEA,

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

CREATE TABLE IF NOT EXISTS academic_scores (
    id SERIAL PRIMARY KEY,
    student_id INTEGER not null,

    ssc_board TEXT,
    ssc_school TEXT,
    ssc_year TEXT,
    ssc_score FLOAT,
    ssc_type TEXT,
    ssc_backlog INTEGER,

    hsc_board TEXT,
    hsc_school TEXT,
    hsc_year TEXT,
    hsc_score FLOAT,
    hsc_type TEXT,
    hsc_backlog INTEGER,

    diploma_uni TEXT,
    diploma_college TEXT,
    diploma_year TEXT,
    diploma_score FLOAT,
    diploma_type TEXT,
    diploma_backlog INTEGER,
    
    ug_uni TEXT,
    ug_college TEXT,
    ug_year TEXT,
    ug_score FLOAT,
    ug_type TEXT,
    ug_backlog INTEGER, 

    CONSTRAINT fk_student_id
    FOREIGN KEY (student_id)
    REFERENCES students(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ielts_scores (
    id SERIAL PRIMARY KEY,
    student_id INTEGER not null,

    ielts_listening_score float not null CHECK (ielts_listening_score >= 0 AND ielts_listening_score <= 9),
    ielts_reading_score float not null CHECK (ielts_reading_score >= 0 AND ielts_reading_score <= 9),
    ielts_writing_score float not null CHECK (ielts_writing_score >= 0 AND ielts_writing_score <= 9),
    ielts_speaking_score float not null CHECK (ielts_speaking_score >= 0 AND ielts_speaking_score <= 9),
    ielts_overall float not null,
    ielts_date TEXT not null,

    CONSTRAINT fk_student_id
    FOREIGN KEY (student_id)
    REFERENCES students(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pte_scores (
    id SERIAL PRIMARY KEY,
    student_id INTEGER not null,

    pte_listening_score INTEGER NOT NULL CHECK (pte_listening_score BETWEEN 0 AND 90),
    pte_reading_score INTEGER NOT NULL CHECK (pte_reading_score BETWEEN 0 AND 90),
    pte_writing_score INTEGER NOT NULL CHECK (pte_writing_score BETWEEN 0 AND 90),
    pte_speaking_score INTEGER NOT NULL CHECK (pte_speaking_score BETWEEN 0 AND 90),
    pte_overall float not null,
    pte_date TEXT not null,

    CONSTRAINT fk_student_id
    FOREIGN KEY (student_id)
    REFERENCES students(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS gre_scores (
    id SERIAL PRIMARY KEY,
    student_id INTEGER not null,

    gre_verbal_score INTEGER not null CHECK (gre_verbal_score >= 130 AND gre_verbal_score <= 170),
    gre_quant_score INTEGER not null CHECK (gre_quant_score >= 130 AND gre_quant_score <= 170),
    gre_writing_score DECIMAL(3, 1) not null CHECK (gre_writing_score >= 0 AND gre_writing_score <= 6),
    gre_overall float not null,
    gre_date TEXT not null,

    CONSTRAINT fk_student_id
    FOREIGN KEY (student_id)
    REFERENCES students(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sat_scores (
    id SERIAL PRIMARY KEY,
    student_id INTEGER not null,

    sat_math_score INTEGER NOT NULL CHECK (sat_math_score >= 200 AND sat_math_score <= 800),
    sat_english_score INTEGER NOT NULL CHECK (sat_english_score >= 200 AND sat_english_score <= 800),
    sat_essay_score INTEGER not null CHECK (sat_essay_score >= 0 AND sat_essay_score <= 24),
    sat_overall float not null,
    sat_date TEXT not null,

    CONSTRAINT fk_student_id
    FOREIGN KEY (student_id)
    REFERENCES students(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS gmat_scores (
    id SERIAL PRIMARY KEY,
    student_id INTEGER not null,

    gmat_verbal_score INTEGER not null CHECK (gmat_verbal_score >= 0 AND gmat_verbal_score <= 60),
    gmat_quant_score INTEGER not null CHECK (gmat_quant_score >= 0 AND gmat_quant_score <= 60),
    gmat_writing_score float not null CHECK (gmat_writing_score >= 0 AND gmat_writing_score <= 6),
    gmat_overall float not null,
    gmat_date TEXT not null,

    CONSTRAINT fk_student_id
    FOREIGN KEY (student_id) 
    REFERENCES students(id) 
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS toefl_scores (
    id SERIAL PRIMARY KEY,
    student_id INTEGER not null,

    toefl_listening_score float not null CHECK (toefl_listening_score >= 0 AND toefl_listening_score <= 30),
    toefl_reading_score float not null CHECK (toefl_reading_score >= 0 AND toefl_reading_score <= 30),
    toefl_writing_score float not null CHECK (toefl_writing_score >= 0 AND toefl_writing_score <= 30),
    toefl_speaking_score float not null CHECK (toefl_speaking_score >= 0 AND toefl_speaking_score <= 30),
    toefl_overall float not null CHECK (toefl_overall >= 0 AND toefl_overall <= 120),
    toefl_date TEXT not null,

    CONSTRAINT fk_student_id
    FOREIGN KEY (student_id)
    REFERENCES students(id)
    ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS suggested_programs (
    student_id INTEGER PRIMARY KEY,

    filename TEXT,
    fileurl TEXT,

    CONSTRAINT fk_student_id
    FOREIGN KEY (student_id)
    REFERENCES students(id)
    ON DELETE CASCADE
);