# Caddy Server Setup for Hybrid Next.js Deployment

This guide explains how to set up Caddy server for a hybrid Next.js deployment, where static assets are served directly by Caddy and dynamic routes are proxied to the Next.js server.

## Installation

### macOS
```bash
brew install caddy
```

### Ubuntu/Debian
```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
```

### Other platforms
Visit [https://caddyserver.com/download](https://caddyserver.com/download) for installation instructions.

## Configuration for Hybrid Deployment

Create a `Caddyfile` with the following configuration:

```caddyfile
yourdomain.com {
    # Serve static assets directly
    @static {
        path /_next/static/*
        path /images/*
        path /favicon.ico
        path /robots.txt
        path *.css
        path *.js
        path *.png
        path *.jpg
        path *.svg
    }
    
    # Serve pre-rendered pages directly
    @prerendered {
        path /
        path /docs
        path /docs/*
    }
    
    # Proxy dynamic routes to Next.js server
    @dynamic {
        path /contact*
        path /api/*
        not path @static
        not path @prerendered
    }
    
    # Handle static assets
    handle @static {
        root * /path/to/your/app/.next
        file_server
        header Cache-Control "public, max-age=31536000, immutable"
    }
    
    # Handle pre-rendered pages
    handle @prerendered {
        root * /path/to/your/app/.next/server/pages
        try_files {path}.html {path}/index.html
        file_server
        header Cache-Control "public, max-age=3600"
    }
    
    # Handle dynamic routes
    handle @dynamic {
        reverse_proxy localhost:3000
    }
    
    # Fallback to Next.js server
    handle {
        reverse_proxy localhost:3000
    }
    
    # Enable compression
    encode gzip zstd
    
    # Enable HTTPS
    tls your@email.com
}
```

## Testing Configuration

For local testing, use the included `test-hybrid.sh` script which sets up a local Caddy server with a test configuration.

```bash
./test-hybrid.sh
```

## Production Deployment

1. Build your Next.js application:
   ```bash
   npm run build
   ```

2. Start your Next.js server:
   ```bash
   npm start
   ```

3. Start Caddy with your production Caddyfile:
   ```bash
   caddy run --config Caddyfile
   ```

## Performance Benefits

The hybrid deployment approach offers several benefits:

- Static assets are served directly by Caddy, reducing load on the Next.js server
- Pre-rendered pages load faster as they don't require server processing
- Dynamic routes still work through the Next.js server
- Automatic HTTPS with Caddy's built-in certificate management
- Efficient caching with appropriate Cache-Control headers

## Monitoring and Maintenance

- Check Caddy logs: `journalctl -u caddy`
- Reload Caddy config: `caddy reload --config Caddyfile`
- Stop Caddy: `systemctl stop caddy`
- Start Caddy: `systemctl start caddy`