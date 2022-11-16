# 🔥 Tabas.blog 🔥

This is one of two repos for this project.  
You will find the backend repo [here](https://github.com/WildCodeSchool/2209-wns-rivest-groupe3-back)

## _Technos_

-   Frontend:

    -   React
    -   Typescript
    -   Vite
    -   Apollo Client
    -   GraphQL

-   Backend:
    -   PostgreSQL
    -   TypeORM
    -   Apollo server
    -   GraphQL
    -   Typescript

## **Directory structure**

```bash
-- yourProjectFolderName
    | -- front
          | .git
    | -- back
          | data
          | .git
```

_The `data` folder is important for database volume mapping, and data persistance in your dev process_

## **Frontend**

### **Before launching containers, install dependencies in each folder (front && back)**

<br>

### Running docker containers for development

From within the front directory run :

```bash
docker compose -f docker-compose.dev.yml up
```

_add '-d' flag to dismiss logs and free up terminal window if necessary_  
<br>
Once docker compose is up, frontend app will be accessible at [http://localhost:8080](http://localhost:8080)

## **Backend**

Once docker compose is up, backend will be accessible at [http://localhost:5000](http://localhost:5000)

## Let's Go 🚀
