# OM SWASTIK BUILDHOMES — ENHANCE / HOSTINGRAJA DEPLOYMENT GUIDE
**Domain:** `omswastikbuildhomes.com`  
**Database:** `omswasti1_omswastik_main`  
**Host:** `69.57.172.212` / `localhost`  
**Panel:** Enhance Control Panel (`e5539.bom1.stableserver.net`)

---

## 📁 Files Generated on Your Computer

1. **MySQL Database Dump File:**
   - Path: `E:\Antigravity\omswastikbuildhomes\omswastik_database_dump.sql`
   - Contains: All 15 MySQL tables, foreign keys, utf8mb4 collation, and full seed data (4 admin users, Riddhi project, 24 plots, FAQs, testimonials, company contact settings).

2. **Complete Deployment ZIP:**
   - Path: `E:\Antigravity\omswastikbuildhomes\omswastikbuildhomes_deploy.zip` (5.1 MB)
   - Contains: Entire source code (`src/`), high-resolution brand assets (`public/`), Prisma schemas, package configurations, and instructions.

---

## STEP 1: Import Database on Enhance (2 Minutes)

1. Open your browser tab where you have this screen open:  
   👉 **`Home > My Websites > omswastikbuildhomes.com > Databases > omswasti1_omswastik_main`**
2. On that page, locate the **`Import SQL File`** option.
3. Click the **`Upload`** button.
4. Select the file from your computer:  
   📁 `E:\Antigravity\omswastikbuildhomes\omswastik_database_dump.sql`
5. Click **Upload / Import**.
6. Once finished, click on **phpMyAdmin** from the **Quick links** on your dashboard to verify:
   - You will see 15 tables: `User`, `Project`, `Plot`, `Lead`, `Booking`, `Customer`, etc.
   - All 24 plots and admin users are now in your MySQL database!

---

## STEP 2: Database Credentials Connection String

Your MySQL connection URL for the application will look like this:

```text
DATABASE_URL="mysql://<DB_USER>:<DB_PASSWORD>@localhost:3306/omswasti1_omswastik_main"
```

*Note: Replace `<DB_USER>` and `<DB_PASSWORD>` with the username and password listed under **Database Users (2 Users)** in your Enhance screen.*

---

## STEP 3: Upload Website Files via Enhance File Manager

1. In Enhance, click the **`Files`** tab at the top of `omswastikbuildhomes.com`.
2. Navigate to your website folder (usually `public_html`).
3. Click **Upload** and upload:  
   📁 `E:\Antigravity\omswastikbuildhomes\omswastikbuildhomes_deploy.zip`
4. Once uploaded, right-click the zip file and choose **Extract**.
5. Create or edit the `.env` file in that directory with:
   ```env
   DATABASE_URL="mysql://<DB_USER>:<DB_PASSWORD>@localhost:3306/omswasti1_omswastik_main"
   JWT_SECRET="omswastik_super_secret_jwt_key_2026_production_grade"
   NEXT_PUBLIC_APP_URL="https://omswastikbuildhomes.com"
   NODE_ENV="production"
   ```

---

## STEP 4: Running the App & Restarting Container

1. In Enhance, check the top navigation under **`Apps`** or **`Advanced`**:
   - If Node.js is configured: Select Node version **20.x** or **22.x**, Run Script: `npm run start` or `node server.js`.
2. Go back to the **Home / Overview** of `omswastikbuildhomes.com`.
3. Under **Quick links**, click:  
   🔄 **`Restart container`**
4. Open **`https://omswastikbuildhomes.com`** in your browser!

---

## 🔑 Default Admin CRM Login Credentials

Once deployed, access the CRM portal at **`https://omswastikbuildhomes.com/admin/login`**:

- **Super Admin:** `admin@omswastikbuildhomes.com` / `Admin@12345`
- **Director (Rahul Bisht):** `rahulbisht@omswastikbuildhomes.com` / `Admin@12345`
- **Director (Praful Singh):** `prafulsingh@omswastikbuildhomes.com` / `Admin@12345`
- **Director (Santosh Gupta):** `santoshgupta@omswastikbuildhomes.com` / `Admin@12345`
