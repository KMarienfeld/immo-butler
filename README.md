# Welcome to my capstone project immoButler

The app automates part of the creation of a utility bill. Based on individually configured expense categories, only the total amounts need to be entered for generating a new bill. In the background, the conversion key is applied, and the utility bill is created specifically for that residential unit.

Die App automatisiert zum Teil die Erstellung einer Nebenkostenabrechnung. Anhand der individuell eingestellten Kostenstellen, müssen für die Erstellung einer neuen Abrechnung lediglich die Gesamtbeträge eingetragen werden. Im Hintergrund greift der Umrechnungsschlüssel und die Nebenkostenabrechnung wird individuell für diese Wohneinheit erstellt.


## Connect your database 
Connect your local MongoDB Database with this project.
In backend/src/main/resources/application.properties the environment variable MONGO_DB_URI needs to be defined. Set it as a connection string to a mongoDB of your choice.
### Database: immoButlerDB
### Collection: UserList

You need to add expense categories to your mongodb before you can see any products. This can be done with the add expense categories feature on the website.

## run the app

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
### `npm start`




