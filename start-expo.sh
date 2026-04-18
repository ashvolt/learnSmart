#!/bin/bash
# Full WSL2 → Phone Expo launcher
# Run: bash start-expo.sh

set -e

PORT=8082
WSL_IP=$(hostname -I | awk '{print $1}')

echo ""
echo "=== CCAT Trainer — Expo Launcher ==="
echo "WSL2 IP: $WSL_IP"

# Step 1: Get Windows LAN IP via PowerShell
WIN_IP=$(powershell.exe -NoProfile -Command "
(Get-NetIPAddress -AddressFamily IPv4 |
 Where-Object {
   \$_.IPAddress -notmatch '^127\.' -and
   \$_.IPAddress -notmatch '^172\.' -and
   \$_.IPAddress -notmatch '^169\.' -and
   \$_.IPAddress -notmatch '^::1'
 } |
 Select-Object -First 1
).IPAddress
" 2>/dev/null | tr -d '\r\n')

if [ -z "$WIN_IP" ]; then
  echo "Could not detect Windows IP. Enter it manually (e.g. 192.168.1.10):"
  read WIN_IP
fi

echo "Windows LAN IP: $WIN_IP"

# Step 2: Set up port forwarding via elevated PowerShell
# Using -Command (not -File) so execution policy doesn't apply
echo ""
echo "Setting up port forwarding (a UAC prompt will appear — click Yes)..."

powershell.exe -NoProfile -Command "
Start-Process powershell -Verb RunAs -Wait -ArgumentList \"-NoProfile -Command \`\"\
  netsh interface portproxy delete v4tov4 listenport=$PORT listenaddress=0.0.0.0 2>\\\$null;\
  netsh interface portproxy add v4tov4 listenport=$PORT listenaddress=0.0.0.0 connectport=$PORT connectaddress=$WSL_IP;\
  netsh advfirewall firewall delete rule name='Expo-CCAT' 2>\\\$null;\
  netsh advfirewall firewall add rule name='Expo-CCAT' dir=in action=allow protocol=TCP localport=$PORT;\
  Write-Host 'Port forwarding done. You can close this window.';\
  Start-Sleep 2\
\`\"\"
" 2>/dev/null || true

echo "Port forwarding configured."

# Step 3: Start Expo with the Windows IP advertised to the phone
echo ""
echo "======================================"
echo " Open Expo Go on your phone"
echo " Tap: Enter URL manually"
echo " Type: exp://$WIN_IP:$PORT"
echo "======================================"
echo ""

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"

# Key fix: tell Metro to advertise the Windows IP, not the WSL2 IP
REACT_NATIVE_PACKAGER_HOSTNAME=$WIN_IP npx expo start --port $PORT --lan --clear
