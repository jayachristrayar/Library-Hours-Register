# Central Library Hours Management System

A production-oriented Next.js and PostgreSQL application for secure, auditable central library-hour assignments and restricted circulation operations.

## Local development

1. Copy `.env.example` to `.env.local` and set `DATABASE_URL` and a 32+ character `AUTH_SECRET`.
2. Install dependencies: `npm install`.
3. Create the PostgreSQL schema: `psql "$DATABASE_URL" -f drizzle/0000_initial.sql`.
4. Load **clearly fake** development demo data: `npm run db:seed`.
5. Run the application: `npm run dev`.

## Demo accounts

After seeding, all demo accounts use `DemoPass!2026`: `admin@demo.local`, `staff.a@demo.local`, `staff.b@demo.local`, `phd.a@demo.local`, and `phd.b@demo.local`. Never use these accounts or password in production.

## Database setup / Neon

Create a Neon Postgres database, copy its pooled connection string into `DATABASE_URL`, then run the migration command above. The schema uses server-side timestamps, a database sequence for unique record numbers, normalized student/record/history tables, and database foreign keys.

## Environment variables

- `DATABASE_URL`: Neon/PostgreSQL connection string (required).
- `AUTH_SECRET`: cookie signing secret (required).
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob token for attachment integration (required before enabling uploads in production).

## Tests

Run `npm test`. Type checking and production compilation are verified with `npm run build`.

## Vercel deployment

Import this repository into Vercel, configure the three environment variables for Production/Preview as appropriate, run the SQL migration once against Neon, and deploy. Vercel uses the standard `npm run build` command. Never persist uploads on the Vercel filesystem; configure Vercel Blob before exposing attachments.

## Security model

Sessions are signed, HTTP-only cookies. API routes derive role and location only from the server-side session. PhD Scholar users are denied central records and student detail APIs (HTTP 403); their circulation response deliberately contains only operational visit fields and register number.
