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

('Roberto', 'Feuerwehr', '2020-04-05'),
('Roberto', 'Frei', '2020-04-05'),
('Sebi', 'Feuerwehr', '2020-04-05'),
('Sebi', 'Turnen', '2020-03-05'),
('Susi', 'Singen','2020-08-01'),
('Roberto', 'Surfen','2020-08-01'),
('Fredi', 'Ferien','2020-04-09'),
('Roberto', 'Einkaufen', '2020-04-017'),
('Sebi', 'Tennis', '2020-03-15'),
('Susi', 'Kino','2020-04-11'),
('Roberto', 'Arbeit','2020-04-11'),
('Fredi', 'Frei','2020-04-24'),
('Roberto', 'Frei','2020-04-25'),
('Sebi', 'Ausgang','2020-07-25')
