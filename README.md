# Semesterarbeit
Digitaler Familienkalender
## Einleitung
Diese Applikation soll es ermöglichen, online und somit unabhänging von einem physischen an nur einem Ort verfügbaren Familienkalender,
Termine für jedes Familienmitglied zu erfassen. Die Applikation besteht aus zwei Node.js Projekten. Eines für den Applikationsserver im Backend
und eines für das Frontend.
## Vorbereitung und Applikationsstart
### ERstellung der benötigten Datenbank
Verwendung einer MariaDB oder MySQL Datenbank
Folgende Schritte müssen als root (oder als User mit entsprechenden Rechten) nach dem Einloggen in SQL ausgeführt werden:
1. Erstellung einer Datenbank mit DB Name: calender
Verwendeter Befehl im Terminal:
````
create database calculator;
````
2. Erstellen der Tabelle "familycalender" 
Zum erstellen der benötigten Tabelle in der DB, inkl. vorabgefüllter Daten zur Kalender-Demonstration, kann das File calender.sql, welches im src Verzeichnis zu
zu finden ist, verwendet werden. Dazu, immer noch im Terminal der DB, das .sql File mittels dem SOURCE Befehl importieren
````
SOURCE <Pfad zur Datei>
````

**** ToDo: Weiter am Readme schreiben ****

