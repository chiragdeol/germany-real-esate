# Hostinger Frontend-Only (Static) Deployment Guide

This guide explains how to deploy the pre-built static frontend file `frontend-deploy.zip` to a standard static Hostinger plan (e.g. Shared Hosting, WordPress hosting, etc.).

---

## What is in `frontend-deploy.zip`?
*   **Static Assets (`assets/`)**: Pre-rendered Javascript and CSS files for your page routes.
*   **`index.html`**: The entry point of your frontend.
*   **`.htaccess`**: Configures Apache URL rewriting. Since this is a Single Page Application (SPA), when users visit routes like `/about` or `/contact` directly, this file ensures the server serves `index.html` so the frontend router can handle the page instead of showing a 404.

> [!WARNING]  
> **Server-side APIs (such as the AI Chat Concierge) will not function on a static host.** The frontend code is fully operational, but if a visitor uses the Chat Concierge, the request to `/api/chat` will return a 404 because there is no Node.js backend running to process the AI stream.

---

## Deployment Steps

### Step 1: Upload and Extract files in Hostinger File Manager

1. Log in to your **Hostinger Account** and enter the website's Control Panel (**hPanel**).
2. Go to **Files** > **File Manager**.
3. Navigate to your website's root directory:
   *   For your main domain: **`public_html`**.
   *   For a subdomain: **`public_html/subdomain-folder`**.
4. If there are any default files (like a default `default.html` or `index.php`), **delete or rename them** to avoid conflicts.
5. Click **Upload** (arrow icon in the top right) > **File**.
6. Choose the **`frontend-deploy.zip`** file from your local machine.
7. Right-click the uploaded `frontend-deploy.zip` file and select **Extract**.
   *   Extract it directly into `public_html` (or your subdomain folder).
8. Once extracted, you should see the following files directly in the directory:
   ```text
   ├── assets/
   ├── .htaccess
   ├── _shell.html
   ├── index.html
   └── robots.txt
   ```
9. You can now delete the `frontend-deploy.zip` file to keep your directories clean.

### Step 2: Test the site
Open your domain in a web browser. The static site will load instantly and all client-side pages (Home, about, contact, blog) will work seamlessly!
