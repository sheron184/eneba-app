# Eneba App — Game List (Next.js 16 + NestJS + Prisma + MySQL)

### What it is

Eneba App is a game-listing web application:

- Frontend: Next.js 16 (React) + shadcn/ui for UI primitives.
- Backend API: NestJS (TypeScript) exposing REST endpoints.
- ORM: Prisma with MySQL.
- Hosted on DigitalOcean; production apps are served behind Nginx with PM2 managing the Node processes.

## Architecture (high level)

Frontend (Next.js) <--> API (NestJS + Prisma) <--> MySQL

    --> Redis (optional: cache / sessions)

- Next.js handles SSR/SSG where needed and fetches data from the NestJS API.
- NestJS validates requests, applies auth (JWT), and runs Prisma for DB access.
- Prisma manages schema/migrations against MySQL.

## Tech stack

- Frontend: Next.js 16, React, TypeScript, shadcn/ui
- API: NestJS, TypeScript
- ORM/DB: Prisma, MySQL
- Package manager: pnpm
- Hosting / infra: DigitalOcean droplets (or App Platform)
- Production process & proxy: PM2 (process manager) + Nginx reverse proxy
- Optional: Redis for caching, backups for MySQL

## Local development (quick)

Prereqs:

- Node.js (recommended LTS)
- pnpm
- MySQL (local) or a remote MySQL instance
- Prisma CLI (installed via pnpm scripts)

1. Clone

```
git clone https://github.com/sheron184/eneba-app.git
cd eneba-app
```

1. Install (root or per-package depending on repo layout)

```
pnpm install
# If monorepo with client/server folders:
cd client && pnpm install
cd ../server && pnpm install
```

1. Environment

- Create env files for each service.

Frontend (/client/.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:3001    # API origin
NEXT_PUBLIC_APP_NAME="Eneba App"
```

API (/server/.env)

```
NODE_ENV=development
PORT=3001
DATABASE_URL="mysql://user:password@localhost:3306/eneba_db"
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379    # optional
```

1. Prepare database & Prisma

```
# from server/
pnpm prisma generate
pnpm prisma migrate dev --name init   # runs migrations and creates DB schema
```

1. Run services

- API (NestJS)

```
cd server
pnpm dev   # or pnpm start:dev (depends on package.json)
# API default: http://localhost:3001
```

- Frontend (Next.js)

```
cd client
pnpm dev   # default: http://localhost:3000
```

## Build & production (local test)

- Frontend:

```
cd client
pnpm build
pnpm start   # run production server (Next.js)
```

- API:

```
cd server
pnpm build
pnpm start:prod   # or `node dist/main.js`
```

## Deployment (DigitalOcean + Nginx + PM2)

This describes a common deployment flow to a DigitalOcean droplet.

1. Provision

- Create a droplet (Ubuntu), attach firewall, and provision a managed MySQL or run MySQL on a separate droplet.
- Optionally use DigitalOcean Managed Databases and allow droplet IP.

1. Build on server or CI

- Either build on the droplet or build in CI and deploy artifacts.
- Recommended: push code, run pnpm install, run pnpm build on server (or deploy Docker images).

1. Use PM2 to run Node processes

- Install PM2 globally:

```
pnpm dlx pm2@latest install pm2
# or
sudo pnpm dlx pm2@latest
```

- Example ecosystem file (server/ecosystem.config.js)

```
module.exports = {
  apps: [
    {
      name: "eneba-server",
      script: "dist/main.js",
      cwd: "/var/www/eneba/server",
      instances: 1,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
    {
      name: "eneba-client",
      script: "node server.js", // if using a custom Next.js server, otherwise serve via Next start
      cwd: "/var/www/eneba/client",
      instances: 1,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
```

- Start with PM2:

```
cd /var/www/eneba/server
pnpm install
pnpm build
pm2 start ecosystem.config.js --only eneba-server

cd /var/www/eneba/client
pnpm install
pnpm build
pm2 start ecosystem.config.js --only eneba-client
pm2 save
```

1. Nginx reverse proxy

- Install Nginx and create a site config routing domains to PM2-managed ports.

Example Nginx config (/etc/nginx/sites-available/eneba.conf)

```
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location /server/ {
        proxy_pass http://127.0.0.1:3001/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass http://127.0.0.1:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Optional: Gzip, security headers, rate limiting, etc.
}
```

- Enable site and reload:

```
sudo ln -s /etc/nginx/sites-available/eneba.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

1. Process monitoring & logs

- PM2 provides logs: `pm2 logs eneba-server`
- Ensure PM2 restarts on reboot:

```
pm2 startup systemd
pm2 save
```

1. TLS

- Use Certbot to add HTTPS:

```
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Notes & best practices

- Keep .env values out of source control; use DigitalOcean Secrets or environment variables.
- Back up MySQL and Prisma migrations. Use `prisma migrate deploy` in CI/production.
- Use a process manager (PM2) and monitor uptime; consider Autoscale / Load Balancer for higher availability.
- Restrict CORS in NestJS to your client domain.
- Use a CDN for static assets (Next.js static export or image CDN).

## Useful commands (summary)

- Install: `pnpm install`
- API dev: `cd server && pnpm dev`
- Frontend dev: `cd client && pnpm dev`
- Prisma generate/migrate: `cd server && pnpm prisma generate && pnpm prisma migrate dev`
- Build client: `cd client && pnpm build`
- Build server: `cd server && pnpm build`
- PM2 start: `pm2 start ecosystem.config.js`
