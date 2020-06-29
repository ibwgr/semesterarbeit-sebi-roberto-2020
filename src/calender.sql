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

('Vater', 'Feuerwehr 19 Uhr', '2020-06-05'),
('Vater', 'Frei', '2020-06-05'),
('Mutter', 'Feuerwehr 19 Uhr', '2020-04-05'),
('Mutter', 'Turnen 20 Uhr', '2020-03-05'),
('Sohn', 'Singen 14 Uhr','2020-08-01'),
('Vater', 'Unihockey 21 Uhr','2020-08-01'),
('Tochter', 'Geburtstag','2020-06-09'),
('Vater', 'Sitzung 18 Uhr', '2020-06-17'),
('Mutter', 'Tennis 16 Uhr', '2020-03-15'),
('Sohn', 'Kino 22 Uhr','2020-04-11'),
('Vater', 'Ferien','2020-04-11'),
('Tochter', 'Reiten 12 Uhr','2020-06-24'),
('Vater', 'Frei','2020-06-25'),
('Mutter', 'Banktermin 11 Uhr','2020-06-25'),
('Vater', 'Wellness','2020-06-06'),
('Mutter', 'Wellness','2020-06-06')
