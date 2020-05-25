DROP table if exists calender.familycalender;


CREATE table if not exists calender.familycalender

(
    id int not null AUTO_INCREMENT primary key,
    firstname VARCHAR(50),
    appointment VARCHAR(50)
);

INSERT into calender.familycalender

(firstname, appointment)

VALUES

('Roberto', 'Feuerwehr'),
('Sebi', 'Turnen'),
('Susi', 'Singen'),
('Fredi', 'Ferien')
