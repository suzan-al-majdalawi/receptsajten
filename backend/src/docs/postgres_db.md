## Kontrollera om PostgreSQL finns
I terminalen, kör:
psql --version  .................18.3
## Öppna file och andra till trust om glommde lösenord
C:\Program Files\PostgreSQL\18\data\pg_hba.conf
## Starta om PostgreSQL
Öppna PowerShell som administratör och kör:
Restart-Service postgresql-x64-18
## Logga in utan lösenord
Kör:
psql -U postgres -h localhost
## Byt lösenord
Kör inne i psql:
ALTER USER postgres WITH PASSWORD 'DittNyaLösenord123';
Du får: ALTER ROLE
## Viktigt: ändra tillbaka pg_hba.conf
Gå tillbaka till:
C:\Program Files\PostgreSQL\18\data\pg_hba.conf
och ändra: trust - tillbaka till: scram-sha-256
## kör:
Restart-Service postgresql-x64-18
psql -U postgres -h localhost  -- skriv dittNyaLösenord123!
## När du kommer in:
postgres=#
är PostgreSQL redo.
## Sedan kan vi gå vidare till ditt backend
När du har postgres=#, kör:
CREATE DATABASE recipes;
Du bör få:   CREATE DATABASE

Node/Express backend
        ↓
   PostgreSQL
        ↓
      recipes

## Om du har kört:
CREATE DATABASE recipes;

och fått: CREATE DATABASE

så är databasen skapad. Nästa steg är att ansluta till recipes och skapa tabellerna.

# 1. Anslut till databasen
Om du fortfarande ser:
postgres=#

kör:
\c recipes

Du ska få något liknande:
You are now connected to database "recipes" as user "postgres".
Prompten ändras då till:
recipes=#
# 2. Skapa tabellerna
Kopiera hela detta och kör när du ser recipes=#:
´´´
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructions TEXT,
    image TEXT,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    quantity VARCHAR(100)
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
´´´
# 3. Kontrollera tabellerna

Kör:
\dt

Du ska se ungefär:

 Schema |    Name     | Type  | Owner
--------+-------------+-------+--------
 public | categories  | table | postgres
 public | comments    | table | postgres
 public | ingredients | table | postgres
 public | ratings     | table | postgres
 public | recipes     | table | postgres