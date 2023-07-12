# Welcome to my project immoButler

The app automates part of the creation of a utility bill. Based on individually configured expense categories, only the total amounts need to be entered for generating a new bill. In the background, the conversion key is applied, and the utility bill is created specifically for that residential unit.

Die App automatisiert zum Teil die Erstellung einer Nebenkostenabrechnung. Anhand der individuell eingestellten
Kostenstellen, müssen für die Erstellung einer neuen Abrechnung lediglich die Gesamtbeträge eingetragen werden. Im
Hintergrund greift der Umrechnungsschlüssel und die Nebenkostenabrechnung wird individuell für diese Wohneinheit
erstellt.

## Connect your database

Connect your local MongoDB Database with this project.
In backend/src/main/resources/application.properties the environment variable MONGO_DB_URI needs to be defined. Set it
as a connection string to a mongoDB of your choice.
Database: immoButlerDB

## run the app

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Create your first utility bill

1) First, register by creating an account. Provide your email address and a password.

2) After registration, you can log in using your email address and password.

3) Next, you need to create a new real estate. Make sure to enter all relevant information about the ral estate, such as
   tenant name and address.

4) Once the property is created, you can set up expense categories. Each expense category should have a conversion key
   associated with it. This serves as the calculation basis for the utility bill.

5) Using the defined expense categories, you can generate a new utility bill for the real estate. Select the relevant
   expense categories that should be included in the statement and specify the annual amount for each category.

6) In the background, the system will calculate the proportional amounts based on the expense categories. The result
   will be available to you and can be exported as a PDF, among other options.

## Erstelle deine erste Nebenkostenabrechnung

1) Registriere dich zuerst, indem du ein Konto erstellst. Gib dazu deine E-Mail-Adresse und ein Passwort an.

2) Nach der Registrierung kannst du dich mit deiner E-Mail-Adresse und deinem Passwort einloggen.

3) Als nächstes musst du eine neue Immobilie anlegen. Hier solltest du alle relevanten Informationen zur Immobilie
   erfassen, wie den Mietername und die Adresse.

4) Sobald die Immobilie angelegt ist, kannst du Kostenarten hinterlegen. Den Kostenarten muss ein Umrechnungsschlüssel
   hinterlegt werden. Das stellt die Berechnungsgrundlage für die Nebenkostenabrechnung dar.

5) Mit den hinterlegten Kostenarten kannst du eine neue Nebenkostenabrechnung für die Immobilie erstellen. Wähle dazu
   die entsprechenden Kostenarten aus, die in die Abrechnung einfließen sollen, und gib den Jahresbetrag für jede
   Kostenart an.

6) Im Hintergrund wird anhand der Kostenarten der anteilige Betrag errechnet. Das Ergebnis steht dir zur Verfügung und
   kann unter anderem als PDF exportiert werden.






