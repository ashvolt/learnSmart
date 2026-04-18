# Run this in PowerShell as Administrator
# This sets up port forwarding so your phone can reach the Expo server in WSL2

$wslIp = (wsl hostname -I).Trim().Split(" ")[0]
$port = 8082

Write-Host "WSL2 IP: $wslIp" -ForegroundColor Cyan
Write-Host "Forwarding Windows:$port -> WSL2:$port" -ForegroundColor Cyan

# Remove existing rule if any
netsh interface portproxy delete v4tov4 listenport=$port listenaddress=0.0.0.0 2>$null

# Add port forwarding: Windows -> WSL2
netsh interface portproxy add v4tov4 listenport=$port listenaddress=0.0.0.0 connectport=$port connectaddress=$wslIp

# Add firewall rule to allow inbound on this port
netsh advfirewall firewall delete rule name="Expo CCAT $port" 2>$null
netsh advfirewall firewall add rule name="Expo CCAT $port" dir=in action=allow protocol=TCP localport=$port

# Show Windows LAN IP (what your phone should connect to)
$winIp = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notmatch "^127\." -and $_.IPAddress -notmatch "^172\." } | Select-Object -First 1).IPAddress

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host " Port forwarding active!" -ForegroundColor Green
Write-Host " Your Windows LAN IP: $winIp" -ForegroundColor Yellow
Write-Host " In Expo Go, open: exp://$winIp:$port" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Green
