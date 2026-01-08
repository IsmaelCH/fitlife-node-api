# FitLife API - Test Commands
# Make sure server is running: npm run dev

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "FitLife API - Quick Tests" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$base = "http://localhost:3000"

# 1. Get all users
Write-Host "📋 GET /users - All Users" -ForegroundColor Yellow
curl -s "$base/users" | ConvertFrom-Json | ConvertTo-Json -Depth 5
Start-Sleep -Seconds 1

# 2. Get user #1 with workouts
Write-Host "`n👤 GET /users/1 - User Details" -ForegroundColor Yellow
curl -s "$base/users/1" | ConvertFrom-Json | ConvertTo-Json -Depth 5
Start-Sleep -Seconds 1

# 3. Get all categories
Write-Host "`n🏷️ GET /categories - All Categories" -ForegroundColor Yellow
curl -s "$base/categories" | ConvertFrom-Json | ConvertTo-Json -Depth 5
Start-Sleep -Seconds 1

# 4. Get overall stats
Write-Host "`n📈 GET /stats - Overall Statistics" -ForegroundColor Yellow
curl -s "$base/stats" | ConvertFrom-Json | ConvertTo-Json -Depth 5
Start-Sleep -Seconds 1

# 5. Get user stats (Alex)
Write-Host "`n👥 GET /stats/users/1 - Alex's Statistics" -ForegroundColor Yellow
curl -s "$base/stats/users/1" | ConvertFrom-Json | ConvertTo-Json -Depth 5
Start-Sleep -Seconds 1

# 6. Get workouts with filters
Write-Host "`n🏃 GET /workouts?categoryId=1 - Cardio Workouts" -ForegroundColor Yellow
curl -s "$base/workouts?categoryId=1" | ConvertFrom-Json | ConvertTo-Json -Depth 5
Start-Sleep -Seconds 1

# 7. Search workouts
Write-Host "`n🔍 GET /workouts?search=yoga - Search Yoga" -ForegroundColor Yellow
curl -s "$base/workouts?search=yoga" | ConvertFrom-Json | ConvertTo-Json -Depth 5
Start-Sleep -Seconds 1

# 8. Filter by duration
Write-Host "`n⏱️ GET /workouts?minDuration=45&maxDuration=90 - Workouts 45-90min" -ForegroundColor Yellow
curl -s "$base/workouts?minDuration=45&maxDuration=90" | ConvertFrom-Json | ConvertTo-Json -Depth 5
Start-Sleep -Seconds 1

# 9. Sort by duration
Write-Host "`n📊 GET /workouts?sortBy=durationMinutes&sortOrder=desc - Sorted by Duration" -ForegroundColor Yellow
curl -s "$base/workouts?sortBy=durationMinutes&sortOrder=desc&limit=5" | ConvertFrom-Json | ConvertTo-Json -Depth 5

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "✅ Tests Complete!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

Write-Host "📚 More endpoints to try:" -ForegroundColor Cyan
Write-Host "  - POST $base/users" -ForegroundColor White
Write-Host "  - POST $base/categories" -ForegroundColor White
Write-Host "  - POST $base/workouts" -ForegroundColor White
Write-Host "  - PUT $base/workouts/1" -ForegroundColor White
Write-Host "  - DELETE $base/workouts/1" -ForegroundColor White
Write-Host "`n📖 Documentation: http://localhost:3000" -ForegroundColor Cyan
