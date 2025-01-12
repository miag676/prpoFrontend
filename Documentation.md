# 📚 Dokumentacija projekta LitLink

## **Pregled projekta**

**LitLink** je porazdeljena aplikacija, osnovana na mikrostoritvah, ki uporabnikom omogoča:
- upravljanje uporabniških računov,
- personalizirane sezname knjig,
- ocene in recenzije knjig,
- prilagojena priporočila knjig.

Projekt je zasnovan za skalabilnost in ločitev odgovornosti, pri čemer je vsaka storitev modularna in osredotočena na svojo nalogo.

---

## **Arhitektura**

### **Zasnova mikrostoritev**
LitLink vključuje naslednje glavne mikrostoritve:
1. **Mikrostoritev Uporabniki**: Upravljanje uporabniških računov in preferenc.
2. **Mikrostoritev Seznami**: Ustvarjanje in upravljanje seznamov knjig.
3. **Mikrostoritev Ocene**: Upravljanje ocen in recenzij knjig.
4. **Mikrostoritev Priporočila**: Generiranje personaliziranih priporočil knjig.

### **Tehnološki sklad**
- **Zaledje (backend)**: Java z JAX-RS, CDI (Contexts and Dependency Injection)
- **Okvir**: KumuluzEE za mikrostoritve
- **Baza podatkov**: PostgreSQL
- **Uporabniški vmesnik (frontend)**: React
- **Komunikacija**: RESTful API med storitvami
- **Namestitev**: Docker, Kubernetes

---

## **Mikrostoritve**

### **1. Mikrostoritev Uporabniki**
#### **Odgovornosti**
- Upravljanje uporabniških računov (registracija, prijava).
- Shranjevanje uporabniških preferenc (npr. priljubljeni žanri).
- Povezovanje z drugimi storitvami preko REST API.

#### **Končne točke**
| Metoda | Končna točka                 | Opis                              |
|--------|------------------------------|------------------------------------|
| GET    | `/v1/users/{id}`             | Pridobi uporabnika po ID          |
| POST   | `/v1/users/register`         | Registriraj novega uporabnika     |
| POST   | `/v1/users/login`            | Avtentikacija uporabnika          |
| GET    | `/v1/users/{id}/preferences` | Pridobi uporabniške preference    |

---

### **2. Mikrostoritev Seznami**
#### **Odgovornosti**
- Uporabnikom omogoča ustvarjanje, brisanje in upravljanje seznamov knjig.
- Sledi knjigam, dodanim na vsak seznam.

#### **Končne točke**
| Metoda | Končna točka                     | Opis                              |
|--------|----------------------------------|------------------------------------|
| GET    | `/v1/lists`                     | Pridobi vse sezname                |
| POST   | `/v1/lists`                     | Ustvari nov seznam                 |
| POST   | `/v1/lists/{id}/books/{bookId}` | Dodaj knjigo na določen seznam     |
| DELETE | `/v1/lists/{id}`                | Izbriši seznam                     |
| DELETE | `/v1/lists/{id}/books/{bookId}` | Odstrani knjigo z določenega seznama |

---

### **3. Mikrostoritev Ocene**
#### **Odgovornosti**
- Uporabnikom omogoča ocenjevanje in recenziranje knjig.
- Nudi povprečne ocene in uporabniške recenzije.

#### **Končne točke**
| Metoda | Končna točka       | Opis                              |
|--------|--------------------|------------------------------------|
| GET    | `/v1/ratings`      | Pridobi vse ocene                 |
| POST   | `/v1/ratings`      | Dodaj novo oceno ali recenzijo    |
| DELETE | `/v1/ratings/{id}` | Izbriši določeno oceno ali recenzijo |


### **4. Mikrostoritev Obvestila**
#### **Odgovornosti**
- Upravljanje obvestil za uporabnike.
- Pošiljanje obvestil vsem uporabnikom ali posameznim uporabnikom.
- Pridobivanje ali brisanje obvestil za določenega uporabnika.

#### **Končne točke**
| Metoda | Končna točka                  | Opis                                |
|--------|-------------------------------|-------------------------------------|
| POST   | `/v1/notifications/add`       | Doda novo obvestilo za vse uporabnike. |
| GET    | `/v1/notifications/user/{id}` | Pridobi seznam obvestil za določenega uporabnika. |
| DELETE | `/v1/notifications/user/{id}` | Izbriše vsa obvestila za določenega uporabnika. |

### **5. Mikrostoritev Priporočila**
#### **Odgovornosti**
- Generiranje personaliziranih priporočil za uporabnike.
- Integracija podatkov iz storitev Uporabniki, Seznami in Ocene za boljše priporočilne algoritme.

#### **Končne točke**
| Metoda | Končna točka                  | Opis                                |
|--------|-------------------------------|-------------------------------------|
| GET    | `/v1/recommendations/{userId}` | Pridobi seznam priporočil za določenega uporabnika. |


## **Dokumentacija API**

Vsaka mikrostoritev sledi RESTful arhitekturi, API-ji pa so samostojni in brez stanja.

### **Pogosti zaglavja API**
| Zaglavje            | Vrednost                  | Opis                            |
|---------------------|---------------------------|----------------------------------|
| `Content-Type`      | `application/json`        | Določa vrsto vsebine            |
| `Authorization`     | `Bearer <token>`          | JWT za avtentikacijo            |

### **Kode napak**
| Koda | Opis                              |
|------|------------------------------------|
| 400  | Napačna zahteva                   |
| 401  | Neavtoriziran dostop              |
| 404  | Vir ni bil najden                 |
| 500  | Napaka strežnika                  |

---

## **Namestitev**

### **1. Docker**
Vsaka mikrostoritev je vsebovana z uporabo Dockerja. `Dockerfile` za posamezno storitev je definiran v njeni osnovni mapi. Primer:
```dockerfile
FROM openjdk:11-jre
COPY target/<ime-storitve>.jar /app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## **Uporabniški vmesnik (Frontend)**

LitLink uporablja React za razvoj uporabniškega vmesnika, ki omogoča preprost in intuitiven dostop do funkcionalnosti aplikacije. Frontend je povezan z mikrostoritvami z uporabo REST API-jev.

---

### **Arhitektura React aplikacije**

#### **Struktura projektnih map**
```
src/
├── components/       # Posamezne komponente uporabniškega vmesnika
├── pages/            # Glavne strani aplikacije
├── services/         # Klici na REST API (npr. Axios)
├── context/          # Upravljanje stanja (npr. React Context)
├── hooks/            # Reusable custom hooks
├── assets/           # Statične datoteke (slike, ikone, CSS)
├── App.js            # Glavna vstopna točka aplikacije
├── index.js          # Renderiranje aplikacije v DOM
└── routes.js         # Definicije poti za navigacijo
```

## **Uporabniški vmesnik (Frontend)**

LitLink uporablja React za razvoj uporabniškega vmesnika, ki omogoča preprost in intuitiven dostop do funkcionalnosti aplikacije. Frontend je povezan z mikrostoritvami z uporabo REST API-jev.

### **Arhitektura React aplikacije**

#### **Struktura projektnih map**

Komponente
UserForm: Omogoča registracijo in prijavo uporabnika.
BookList: Prikazuje seznam knjig, ki jih uporabnik lahko ureja.
RecommendationCard: Prikazuje priporočila knjig na osnovi uporabnikovih podatkov.
Glavne strani
/login: Stran za prijavo uporabnika.
/register: Stran za registracijo novega uporabnika.
/recommendations: Stran za ogled priporočil.
Integracija z mikrostoritvami
Axios za REST API klice
V mapi services/ so datoteke, ki definirajo komunikacijo z mikrostoritvami.

Navigacija z React Router
Datoteka routes.js vsebuje vse poti v aplikaciji:

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookListPage from './pages/BookListPage';
import RecommendationsPage from './pages/RecommendationsPage';

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/lists" element={<BookListPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
        </Routes>
    </Router>
);

export default AppRoutes;
Namestitev Frontend aplikacije je opisana v README datoteki.


## **Repozitorij**

Mikrostoritve: https://github.com/miag676/LitLink
Uporabniški vmesnik: https://github.com/miag676/prpoFrontend