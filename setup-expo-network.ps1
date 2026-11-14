# Run this in PowerShell as Administrator.
# Makes the Expo dev server running in WSL2 reachable from your phone.

$port = 8082

# Read the networking mode. Mirrored mode shares the Windows network stack, so
# WSL already holds the LAN address and port forwarding does not apply -- adding
# a proxy there would bind the same port Metro is listening on.
$wslConfig = Join-Path $env:USERPROFILE ".wslconfig"
$mirrored = (Test-Path $wslConfig) -and
            ((Get-Content $wslConfig -Raw) -match '(?i)networkingMode\s*=\s*mirrored')

$winIp = (Get-NetIPAddress -AddressFamily IPv4 |
  Where-Object {
    $_.IPAddress -notmatch "^127\." -and
    $_.IPAddress -notmatch "^172\." -and
    $_.IPAddress -notmatch "^169\."
  } | Select-Object -First 1).IPAddress

if ($mirrored) {
  Write-Host "WSL networkingMode = mirrored. No port forwarding needed." -ForegroundColor Cyan
  Write-Host "Opening the Hyper-V firewall so your LAN can reach WSL..." -ForegroundColor Cyan

  # Inbound traffic to a mirrored-mode VM is blocked by default.
  Set-NetFirewallHyperVVMSetting -Name '{40E0AC32-46A5-438A-A0B2-2B479E8F2E90}' -DefaultInboundAction Allow
  Remove-NetFirewallRule -DisplayName "Expo CCAT $port" -ErrorAction SilentlyContinue
  New-NetFirewallRule -DisplayName "Expo CCAT $port" -Direction Inbound -Protocol TCP -LocalPort $port -Action Allow | Out-Null
}
else {
  # NAT mode: WSL sits on a private address, so Windows forwards the port to it.
  # Take the default route's source address; `hostname -I` lists docker bridges first.
  $wslIp = (wsl -- ip -4 route get 1.1.1.1 |
            Select-String -Pattern 'src (\S+)').Matches.Groups[1].Value

  Write-Host "WSL networkingMode = NAT. WSL2 IP: $wslIp" -ForegroundColor Cyan
  Write-Host "Forwarding Windows:$port -> WSL2:$port" -ForegroundColor Cyan

  netsh interface portproxy delete v4tov4 listenport=$port listenaddress=0.0.0.0 2>$null
  netsh interface portproxy add v4tov4 listenport=$port listenaddress=0.0.0.0 connectport=$port connectaddress=$wslIp

  netsh advfirewall firewall delete rule name="Expo CCAT $port" 2>$null
  netsh advfirewall firewall add rule name="Expo CCAT $port" dir=in action=allow protocol=TCP localport=$port
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host " Ready." -ForegroundColor Green
Write-Host " Your LAN IP: $winIp" -ForegroundColor Yellow
Write-Host " In Expo Go, open: exp://${winIp}:${port}" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Green
