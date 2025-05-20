<div align="center">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/66741904/425247566-601f601b-43bb-4aa7-b7cb-8ba5e8d57231.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250321%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250321T020850Z&X-Amz-Expires=300&X-Amz-Signature=0997d419c224db12907ffb9b6e3b7eab5b1e395b03cb34a2e174a02ff6f41376&X-Amz-SignedHeaders=host" width="30%" alt="StockSavvy Backend" />
</div>
<hr>
<div align="center" style="line-height: 1;">
  <a href="https://stocksavvy-backend.onrender.com/"><img alt="Demo"
    src="https://img.shields.io/badge/🚀%20Live%20Demo-API-2F80ED?color=2F80ED&logoColor=white"/></a>
  <a href="LICENSE-CODE"><img alt="Code License"
    src="https://img.shields.io/badge/Code%20License-Apache%202.0-00BFFF?color=00BFFF"/></a>
  <br>
</div>

## 💻 Technologies Used:

### - Drizzle ORM
Drizzle serves as both an ORM and a query builder, providing a mid-level abstraction from SQL code for improved performance. Developers are expected to have SQL knowledge, which is considered a fair trade-off by the developer, Hemit Patel.

### - NodeJS v23
NodeJS is a runtime environment for JavaScript, enabling server-side execution of JavaScript code. This allows for a unified programming language across the web app and API, enhancing developer experience. Its asynchronous features and promise-based structure add to its appeal. From NodeJS 23 and onwards, TypeScript can be natively ran, allowing developers to use it in place for JavaScript.

### - Redis Clusters
Redis is an in-memory database, storing data in RAM for faster access compared to traditional databases like SQL or NoSQL (e.g., MongoDB, Cassandra). However, this also means it is susceptible to data loss on server shutdown, making it suitable for ephemeral data like sessions and verification codes. Clusters enable horizontal sharding, improving scalability, especially for session-based authentication.

### - Swagger
Swagger is used for seamless API documentation.

### - Husky + ESLint
These are dev tools that make the code maintainable and production ready. ESLint is a linting software that ensures code follows a strict set of rules designed for longevity and production readiness. Both **ESLint** and **Husky** are configured to run automatically before each commit to the GitHub remote repository.

### - Jest
Jest is used for testing different software systems within our backend application. We specifically use it for integration and unit testing

### - Supertest
Supertest allows for the mocking of a HTTP server through creating a temporary in-memory one. This way we can test out all REST API endpoints for validity.

## 🧱 API Architecture:

The API logic is structured into three main folders. It is modelled after the MVC architecture. 

- Models (`/models`):
This includes the data structuring for all content being stored on the PostgresSQL database.

- Views (`/routes`):
Views is what the end user sees (final product). In the API, the end user would see the content being served through a **route**, hence the file with all the routes is our views folder.

- Controllers (`/controllers`):
This includes all the logic behind each route being served

## 🔑 Authentication Structure

The authentication system utilizes **session-based authentication** in conjunction with **Redis Clusters** for session storage. Each session has a role attribute which is used to power the role-based access control system, providing some permissions to Admins ans restricting them from Users.

### Current roles:
- User (can create forum questions and voew resources)

- Admin (User permissions + can create questions for the question bank)

## 📝 Endpoint Docs:

To explore the different endpoints and their intended use cases, please navigate to the route `/api-docs` from the API endpoint.

## Contributions?

Contributions are allowed only for staff. We ask that you follow certain rules whilst making contributions. All work that you do will be **voluntary** and not privy to payment. However, you can use **your** contributions as work experience for any future work you might apply for. This can only be done if you follow our rules as listed below...

#### The rules:

First, create a development branch for your work. **DO NOT COMMIT ON MAIN.** 
The branch should have the following naming structure: `YOUR NAME/GITHUB USER/1-2 WORDS ON THE CONTRIBUTION MADE` Examples of such naming structure include `hemit99123/about-page`

Now create a PR (pull request) to merge that development branch to the main branch. The naming of the PR should start off with:

- feat: (for a new feature)
- fix: (for a fix to a bug/feature not working)
- chore: (for any other task that does not fit the other 2 categories)
  
**Add all comments into the PR itself.** We will *not* accept any PRs without some sort of documentation/record of changes. Previously, all documentation was kept on issues. Therefore, if you want to look at a PR dated prior to Sunday, March 23rd, 2025 you must refer to the issues tab. **This practice is no longer in use however**.

### Developers/Credits:

- Hemit Patel

### Happy Coding 🧑🏽‍💻
