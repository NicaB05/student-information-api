# Student Management REST API

A REST API built with Node.js, Express, TypeScript, and PostgreSQL for **ITE 303 — Web Systems and Technologies 2**. The `GET /students` endpoint reads student records from the configured database. The student-by-ID and POST endpoints are currently demonstration handlers and do not read or write database records.

## Endpoints

| Method | Endpoint | Description | Success status |
| --- | --- | --- | --- |
| `GET` | `/` | Return API information | `200 OK` |
| `GET` | `/students` | Retrieve student records from the database, ordered by ID | `200 OK` |
| `GET` | `/students/:id` | Demonstration response containing the requested ID; does not query the database | `200 OK` |
| `POST` | `/students` | Validate and echo `name` and `course`; does not create a database record | `200 OK` |

`POST /students` requires both `name` and `course` in its JSON body; otherwise it returns `400 Bad Request`. `PUT /students/:id` and `DELETE /students/:id` are not currently implemented.

## Local setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy `.env.example` to `.env` and set `DATABASE_URL` to your private Supabase Session pooler connection string. Keep real credentials out of source control. `PORT` is optional and defaults to `4000`.
3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Build and start the production server:

   ```bash
   pnpm build
   pnpm start
   ```

The production server uses the `PORT` environment variable when provided (as on Render).
