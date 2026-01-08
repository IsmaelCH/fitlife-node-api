# 🧪 Test Data Summary

The database has been populated with sample data in English.

## 👥 Users (4)

| ID | Name | Email | Age |
|----|------|-------|-----|
| 1 | Alex Johnson | alex.johnson@fitlife.com | 28 |
| 2 | Sarah Williams | sarah.williams@fitlife.com | 32 |
| 3 | Mike Davis | mike.davis@fitlife.com | 25 |
| 4 | Emma Brown | emma.brown@fitlife.com | 29 |

## 🏷️ Categories (5)

1. **Cardio** - Running, cycling, swimming
2. **Strength Training** - Weightlifting, bodyweight exercises
3. **Yoga** - Various yoga styles
4. **HIIT** - High-intensity interval training
5. **Sports** - Basketball, tennis, etc.

## 🏋️ Workouts (15)

- **Alex** (3 workouts): Morning Run, Upper Body Strength, Evening Cycling, Stretching
- **Sarah** (2 workouts): Vinyasa Flow, Leg Day, Power Yoga
- **Mike** (4 workouts): Tabata Training, Basketball Practice, HIIT Circuit, Swimming Laps
- **Emma** (3 workouts): Core Strength, Tennis Match, Spin Class, Walking

## 🧪 Quick Test Commands

### View All Data
```bash
# Get all users
curl http://localhost:3000/users

# Get all categories
curl http://localhost:3000/categories

# Get all workouts
curl http://localhost:3000/workouts
```

### Filters & Search
```bash
# Filter by category (Cardio = ID 1)
curl http://localhost:3000/workouts?categoryId=1

# Filter by user (Mike = ID 3)
curl http://localhost:3000/workouts?userId=3

# Filter by duration (30-60 min)
curl http://localhost:3000/workouts?minDuration=30&maxDuration=60

# Search workouts
curl http://localhost:3000/workouts?search=yoga

# Sort by duration (descending)
curl http://localhost:3000/workouts?sortBy=durationMinutes&sortOrder=desc
```

### Statistics
```bash
# Overall stats
curl http://localhost:3000/stats

# User stats (Alex = ID 1)
curl http://localhost:3000/stats/users/1
```

### Create New Data
```bash
# Create a new user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@fitlife.com",
    "age": 27
  }'

# Create a new workout
curl -X POST http://localhost:3000/workouts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Morning Jog",
    "description": "Easy 3K run",
    "durationMinutes": 25,
    "userId": 1,
    "categoryId": 1
  }'
```

## 🚀 PowerShell Test Script

Run all tests at once:
```powershell
.\test-api.ps1
```

## 🔄 Reset Data

To reset the database with fresh sample data:
```bash
npm run seed
```

## 📊 Expected Results

### Overall Stats
- Total Users: 4
- Total Workouts: 15
- Total Categories: 5
- Average Duration: ~46 minutes
- Top Category: Cardio (5 workouts)

### Alex's Stats (User ID 1)
- Total Workouts: 4
- Total Minutes: 145
- This Week: 4
- By Category: Cardio (2), Strength (1), Uncategorized (1)
