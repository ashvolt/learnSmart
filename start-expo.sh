#!/bin/bash
# WSL2 -> phone Expo launcher.
# Run: bash start-expo.sh

set -e

PORT=8082

# The default route's source address. hostname -I is not usable here: it lists
# the docker bridges (172.x, often linkdown) ahead of the real interface.
LAN_IP=$(ip -4 route get 1.1.1.1 2>/dev/null | awk '{for (i = 1; i <= NF; i++) if ($i == "src") print $(i + 1)}')

if [ -z "$LAN_IP" ]; then
  echo "Could not detect this machine's IP. Enter it manually (e.g. 192.168.1.10):"
  read -r LAN_IP
fi

# In mirrored mode WSL shares the Windows network stack, so it already holds the
# LAN address and no port forwarding is involved. In NAT mode WSL sits behind a
# private 172.x address and Windows has to forward the port to it.
WSLCONFIG=$(cat /mnt/c/Users/*/.wslconfig 2>/dev/null || true)
if echo "$WSLCONFIG" | grep -qi 'networkingMode *= *mirrored'; then
  MODE=mirrored
else
  MODE=nat
fi

echo ""
echo "=== CCAT Trainer — Expo Launcher ==="
echo "Networking mode: $MODE"
echo "Serving on: $LAN_IP:$PORT"

if [ "$MODE" = "mirrored" ]; then
  # Inbound connections to a mirrored-mode VM are filtered by the Hyper-V
  # firewall, which blocks them by default. Opening it is a one-time change made
  # deliberately from an elevated PowerShell, so it is printed, not run.
  cat <<HINT

If the phone cannot connect, allow inbound traffic once from an elevated
PowerShell (this opens WSL to inbound connections from your LAN):

  Set-NetFirewallHyperVVMSetting -Name '{40E0AC32-46A5-438A-A0B2-2B479E8F2E90}' -DefaultInboundAction Allow
  New-NetFirewallRule -DisplayName 'Expo-$PORT' -Direction Inbound -Protocol TCP -LocalPort $PORT -Action Allow

HINT
else
  echo ""
  echo "Setting up port forwarding (a UAC prompt will appear — click Yes)..."

  powershell.exe -NoProfile -Command "
Start-Process powershell -Verb RunAs -Wait -ArgumentList \"-NoProfile -Command \`\"\
  netsh interface portproxy delete v4tov4 listenport=$PORT listenaddress=0.0.0.0 2>\\\$null;\
  netsh interface portproxy add v4tov4 listenport=$PORT listenaddress=0.0.0.0 connectport=$PORT connectaddress=$LAN_IP;\
  netsh advfirewall firewall delete rule name='Expo-CCAT' 2>\\\$null;\
  netsh advfirewall firewall add rule name='Expo-CCAT' dir=in action=allow protocol=TCP localport=$PORT;\
  Write-Host 'Port forwarding done. You can close this window.';\
  Start-Sleep 2\
\`\"\"
" 2>/dev/null || true

  echo "Port forwarding configured."

  # The phone connects to the Windows LAN address, which forwards to WSL.
  LAN_IP=$(powershell.exe -NoProfile -Command "
(Get-NetIPAddress -AddressFamily IPv4 |
 Where-Object {
   \$_.IPAddress -notmatch '^127\.' -and
   \$_.IPAddress -notmatch '^172\.' -and
   \$_.IPAddress -notmatch '^169\.'
 } |
 Select-Object -First 1
).IPAddress
" 2>/dev/null | tr -d '\r\n')
fi

echo ""
echo "======================================"
echo " Open Expo Go on your phone"
echo " Tap: Enter URL manually"
echo " Type: exp://$LAN_IP:$PORT"
echo "======================================"
echo ""

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"

REACT_NATIVE_PACKAGER_HOSTNAME=$LAN_IP npx expo start --port $PORT --lan --clear
