# Servidor local mínimo para ver el prototipo: http://localhost:8080
param([int]$Puerto = 8080)
$raiz = Join-Path $PSScriptRoot 'prototipo'
$tipos = @{ '.html'='text/html; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.js'='text/javascript; charset=utf-8'; '.png'='image/png'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.svg'='image/svg+xml'; '.webp'='image/webp' }
$l = New-Object System.Net.HttpListener
$l.Prefixes.Add("http://localhost:$Puerto/")
$l.Start()
Write-Host "Prototipo en http://localhost:$Puerto/"
while ($l.IsListening) {
  $ctx = $l.GetContext()
  $ruta = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
  if ($ruta -eq '') { $ruta = 'index.html' }
  $archivo = [IO.Path]::GetFullPath((Join-Path $raiz $ruta))
  if ($archivo.StartsWith($raiz) -and (Test-Path $archivo -PathType Leaf)) {
    $bytes = [IO.File]::ReadAllBytes($archivo)
    $ext = [IO.Path]::GetExtension($archivo).ToLower()
    $ctx.Response.ContentType = $(if ($tipos[$ext]) { $tipos[$ext] } else { 'application/octet-stream' })
    $ctx.Response.Headers.Add('Cache-Control', 'no-store')
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else { $ctx.Response.StatusCode = 404 }
  $ctx.Response.Close()
}
