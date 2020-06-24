# Semesterarbeit
Digitaler Familienkalender
## Einleitung
Diese Applikation soll es ermöglichen, online und somit unabhänging von einem physischen an nur einem Ort verfügbaren Familienkalender,
Termine für jedes Familienmitglied zu erfassen. Die Applikation besteht aus zwei Node.js Projekten. Eines für den Applikationsserver im Backend
und eines für das Frontend.
## Vorbereitung und Applikationsstart
GIT Repository clonen oder ZIP download
### Projekt in IntelliJ öffnen
1. npm install Backend
1a. Falls IntelliJ im Hauptverezeichnis fragt ob npm install ausgeführt werden soll, dies bestätigen.
1b. Alternativ manuell im Hauptverzeichnis via Terminal npm install durchführen
2. npm install Frontend
2a. Falls IntelliJ im Verzeichnis calenderView fragt ob npm install ausgeführt werden soll, dies bestätigen.
2b. Alternativ manuell im Verzeichnis calenderView via Terminal npm install durchführen
3. Im File ormconfig.json den Usernamen und das Passwort für den Zugriff auf die Datenbank eintragen
### Erstellung der benötigten Datenbank
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


## Applikation starten
1. Terminal im Hauptverzeichnis öffnen und das Backend mit dem Befehl npm run start ausführen
2. Zweite Terminalfenster im Verzeichnis calenderView öffnen und das Frontend mit dem Befhel npm run start ausführen
-> Das Frontend kann nun im Browser unter http://localhost:1234 aufgerufen werden



