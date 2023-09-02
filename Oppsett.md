# Oppsett av utviklingsmiljøet

Prosjektet er satt opp ved hjelp av [Next.js](https://nextjs.org/). Dette er et rammeverk for React der mye av funksjonalitet er innebygd. Noe spesielt bra med Next er hvordan de forskjellige sidene er organisert i filtreet.

## Forutsetninger

Kodelageret krever at du har Node.js installert. Dersom du ikke har det kan du installere det [herfra](https://nodejs.org/en/download/).

Dersom du bruker Visual Studio Code har jeg også lagt inn noen utvidelser som bør installeres. Disse er Prettier-formattereren og Tailwind CSS-utvidelsen.

## Kjøring av kode

Når du har klonet git-repoet kan du starte en utviklingsserver. Dette gjør du ved å bytte til `cover2cover`-mappen og kjøre `npm install`.

```bash
cd cover2cover
npm install
```

Deretter kan du starte en utviklingsserver ved å kjøre:

```bash
npm run dev
```

Da kan du åpne din favorittnettleser på [localhost:3000](http://localhost:3000) for å kjøre webappen. Legg merke til at denne versjonen ikke kjører databasen.

## Kjøring av database

For å kjøre databasen kan du bytte mappe til `pb`-mappen og kjøre `./pocketbase serve`. Per nå er databasen satt opp på en Windows-PC, derfor kan det bli noen problemer med kjøringen. Etter litt research fant jeg ut at man kan prøve å kjøre denne kommandoen for å fikse problemet: `chmod +x ./pocketbase`

```bash
cd pb
./pocketbase serve

// Eventuelt:
chmod +x ./pocketbase
./pocketbase serve
```

## Kjøring av frontend og backend samtidig

For å kjøre både frontend og backend samtidig har man to alternativer.

### Alternativ 1

I utviklingssammenheng gir det mest mening å kjøre backenden og frontenden separat. Da må man ha to terminaler åpent. Da kan man følge stegene over i hver sin terminal.

### Alternativ 2

For å kunne kjøre backend og frontend samtidig kan du legge inn de statiske HTML-filene som har blitt laget i byggeprosessen i `pb_public`-mappen. Dette gjør du ved å bygge prosjektet, og så eksportere det.

```bash
npm run build
npm run export
```

Etter dette får du en mappe som heter `out`. Legg innholdet fra denne mappen i `pb_public`. Deretter kan du kjøre PocketBase som vanlig.
