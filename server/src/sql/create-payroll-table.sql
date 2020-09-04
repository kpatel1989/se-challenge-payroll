drop table if exists payscale CASCADE;
create table payscale (
    job_group VARCHAR(5) PRIMARY KEY,
    pay_rate NUMERIC
);

drop table if exists payroll;
CREATE TABLE payroll (
    employee_id VARCHAR(20),
    job_group VARCHAR(5),
    date DATE NOT NULL,
    hours_worked NUMERIC NOT NULL,
    PRIMARY KEY (date, employee_id, job_group),
    FOREIGN KEY (job_group) REFERENCES payscale(job_group)
);

INSERT INTO payscale (job_group, pay_rate)
VALUES
('A', 20),
('B', 30);