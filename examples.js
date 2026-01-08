// FitLife API - Usage Examples
// Make sure the server is running: npm run dev

const baseURL = "http://localhost:3000";

// Helper function to make requests
async function apiRequest(endpoint, method = "GET", body = null) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" }
  };
  
  if (body) options.body = JSON.stringify(body);
  
  const response = await fetch(`${baseURL}${endpoint}`, options);
  return response.json();
}

// ========================================
// EXAMPLES - Uncomment to test
// ========================================

async function examples() {
  
  // 1. Get all users
  console.log("\n📋 All Users:");
  const users = await apiRequest("/users");
  console.log(users);

  // 2. Get user by ID (with their workouts)
  console.log("\n👤 User #1 Details:");
  const user = await apiRequest("/users/1");
  console.log(user);

  // 3. Get all categories
  console.log("\n🏷️ All Categories:");
  const categories = await apiRequest("/categories");
  console.log(categories);

  // 4. Get all workouts
  console.log("\n🏋️ All Workouts:");
  const workouts = await apiRequest("/workouts");
  console.log(workouts);

  // 5. Filter workouts by category (Cardio)
  console.log("\n🏃 Cardio Workouts:");
  const cardioWorkouts = await apiRequest("/workouts?categoryId=1");
  console.log(cardioWorkouts);

  // 6. Filter workouts by duration (30-60 minutes)
  console.log("\n⏱️ Workouts 30-60 min:");
  const mediumWorkouts = await apiRequest("/workouts?minDuration=30&maxDuration=60");
  console.log(mediumWorkouts);

  // 7. Search workouts
  console.log("\n🔍 Search 'yoga':");
  const yogaSearch = await apiRequest("/workouts?search=yoga");
  console.log(yogaSearch);

  // 8. Sort workouts by duration (descending)
  console.log("\n📊 Workouts sorted by duration:");
  const sortedWorkouts = await apiRequest("/workouts?sortBy=durationMinutes&sortOrder=desc");
  console.log(sortedWorkouts);

  // 9. Get overall statistics
  console.log("\n📈 Overall Stats:");
  const stats = await apiRequest("/stats");
  console.log(stats);

  // 10. Get user statistics (Alex - user #1)
  console.log("\n👥 Alex's Stats:");
  const userStats = await apiRequest("/stats/users/1");
  console.log(userStats);

  // 11. Create a new user
  console.log("\n➕ Creating new user:");
  const newUser = await apiRequest("/users", "POST", {
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@fitlife.com",
    age: 30
  });
  console.log(newUser);

  // 12. Create a new workout
  console.log("\n➕ Creating new workout:");
  const newWorkout = await apiRequest("/workouts", "POST", {
    title: "Evening Run",
    description: "10K run along the beach",
    durationMinutes: 55,
    userId: 1,
    categoryId: 1
  });
  console.log(newWorkout);

  // 13. Update a workout
  console.log("\n✏️ Updating workout:");
  const updatedWorkout = await apiRequest("/workouts/1", "PUT", {
    durationMinutes: 35
  });
  console.log(updatedWorkout);

  // 14. Get workouts for specific user
  console.log("\n👤 Mike's workouts:");
  const mikesWorkouts = await apiRequest("/workouts?userId=3");
  console.log(mikesWorkouts);

  // 15. Complex filter: Cardio workouts, 40+ min, sorted by date
  console.log("\n🎯 Advanced filter:");
  const advanced = await apiRequest("/workouts?categoryId=1&minDuration=40&sortBy=createdAt&sortOrder=desc");
  console.log(advanced);
}

// Run examples
examples().catch(console.error);
