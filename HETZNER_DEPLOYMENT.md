# Infrastructure Setup Guide: Hetzner ARM64 + Cloudflare Tunnels

**OS:** Debian 13 ("Trixie")
**Architecture:** ARM64 (Ampere / CAX11)
**Location:** Hetzner (Germany - Nuremberg/Falkenstein)
**Core Philosophy:** The "Rust Developer" Way (No Nginx, No Certbot, No open web ports, local compilation on Mac M4).

## 1. Network Security & Firewall

All public web ports are closed. The server communicates exclusively via outbound connections to Cloudflare's edge network.

**Hetzner Cloud Firewall Rules:**

* **Inbound TCP 22 (SSH):** Restricted exclusively to your home IP address.
* **Inbound TCP 80 / 443:** Deleted / Blocked.
* **Outbound:** Allow all.

## 2. User Authentication (Bypassing Root)

Because Hetzner's Debian image locks password logins if an SSH key is attached during creation, initial setup requires using the Hetzner Web Console to establish a secure user.

1. Open Hetzner Web Console, log in as `root` using the rescued/emailed password.
2. Create the standard user and grant `sudo` privileges:

```bash
adduser ricardo
usermod -aG sudo ricardo

```

3. From the local Mac (iTerm2), push the SSH key to the new user:

```bash
ssh-copy-id ricardo@<HETZNER_IP>

```

4. Log in permanently via: `ssh ricardo@<HETZNER_IP>`

## 3. Cloudflared Tunnel Installation

Traffic is routed securely using Cloudflare Tunnels (`cloudflared`), eliminating the need for a reverse proxy.

**Install the ARM64 Daemon:**

```bash
wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb
sudo dpkg -i cloudflared-linux-arm64.deb

```

**Authenticate & Route:**

```bash
cloudflared tunnel login
cloudflared tunnel create rustilian-node
cloudflared tunnel route dns rustilian-node qltsys.rustilian.com
cloudflared tunnel route dns rustilian-node app.rustilian.com

```

**Configure the Tunnel:**

```bash
micro ~/.cloudflared/config.yml

```

```yaml
tunnel: rustilian-node
credentials-file: /home/ricardo/.cloudflared/<YOUR-UUID-HERE>.json

ingress:
  - hostname: qltsys.rustilian.com
    service: http://localhost:3000
  - hostname: app.rustilian.com
    service: http://localhost:4000
  - service: http_status:404

```

## 4. System Optimization (QUIC Buffers)

To prevent `quic-go` UDP buffer warnings and maximize tunnel performance, the Linux network limits were increased.

```bash
echo -e "net.core.rmem_max=2500000\nnet.core.wmem_max=2500000" | sudo tee /etc/sysctl.d/99-cloudflared.conf
sudo sysctl -p /etc/sysctl.d/99-cloudflared.conf

```

## 5. Enable Background Services & Updates

**Install Cloudflared as a Systemd Service:**

```bash
sudo mkdir -p /etc/cloudflared
sudo cp ~/.cloudflared/config.yml /etc/cloudflared/
sudo cp ~/.cloudflared/*.json /etc/cloudflared/
sudo cloudflared service install
sudo systemctl enable --now cloudflared

```

**Configure APT for Automatic Updates:**
*(Note: Uses `bookworm` repository as `trixie` is not yet officially published by Cloudflare).*

```bash
wget -qO- https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared bookworm main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt update

```

## 6. Rust App Deployment Environment (QLTSYS)

The server relies on the Mac M4 for cross-compilation. Only the final binaries and static files are pushed to the server.

**Directory Structure:**

```bash
sudo mkdir -p /opt/qltsys/{bin,site,data}
sudo chown -R ricardo:ricardo /opt/qltsys

```

**Systemd Service Definition:**

```bash
sudo micro /etc/systemd/system/qltsys.service

```

```ini
[Unit]
Description=QLTSYS Pool Maintenance App
After=network.target

[Service]
User=ricardo
Group=ricardo
WorkingDirectory=/opt/qltsys

Environment="LEPTOS_SITE_ADDR=127.0.0.1:3000"
Environment="LEPTOS_SITE_ROOT=/opt/qltsys/site"
Environment="LEPTOS_ENV=PROD"
Environment="DATABASE_URL=sqlite:///opt/qltsys/data/qltsys.db"

ExecStart=/opt/qltsys/bin/qltsys

Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target

```

**Activate the Service:**

```bash
sudo systemctl daemon-reload
sudo systemctl enable qltsys

```
