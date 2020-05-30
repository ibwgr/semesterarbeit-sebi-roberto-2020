DROP table if exists calender.familycalender;


CREATE table if not exists calender.familycalender

(
    id int not null AUTO_INCREMENT primary key,
    firstname VARCHAR(50),
    appointment VARCHAR(50),
    eventdate DATE
);

INSERT into calender.familycalender

(firstname, appointment, eventdate)

VALUES

('Roberto', 'Feuerwehr', '2020-04-01'),
('Sebi', 'Turnen', '2020-03-05'),
('Susi', 'Singen','2020-08-01'),
('Fredi', 'Ferien','2020-04-02')
