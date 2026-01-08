const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  await prisma.workout.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log("📦 Creating categories...");
  const cardio = await prisma.category.create({
    data: { name: "Cardio" }
  });

  const strength = await prisma.category.create({
    data: { name: "Strength Training" }
  });

  const yoga = await prisma.category.create({
    data: { name: "Yoga" }
  });

  const hiit = await prisma.category.create({
    data: { name: "HIIT" }
  });

  const sports = await prisma.category.create({
    data: { name: "Sports" }
  });

  console.log("👥 Creating users...");
  const alex = await prisma.user.create({
    data: {
      firstName: "Alex",
      lastName: "Johnson",
      email: "alex.johnson@fitlife.com",
      age: 28
    }
  });

  const sarah = await prisma.user.create({
    data: {
      firstName: "Sarah",
      lastName: "Williams",
      email: "sarah.williams@fitlife.com",
      age: 32
    }
  });

  const mike = await prisma.user.create({
    data: {
      firstName: "Mike",
      lastName: "Davis",
      email: "mike.davis@fitlife.com",
      age: 25
    }
  });

  const emma = await prisma.user.create({
    data: {
      firstName: "Emma",
      lastName: "Brown",
      email: "emma.brown@fitlife.com",
      age: 29
    }
  });

  console.log("🏋️ Creating workouts...");
  
  // Alex's workouts
  await prisma.workout.create({
    data: {
      title: "Morning Run",
      description: "5K run in the park, felt great!",
      durationMinutes: 30,
      userId: alex.id,
      categoryId: cardio.id
    }
  });

  await prisma.workout.create({
    data: {
      title: "Upper Body Strength",
      description: "Bench press, rows, and shoulder press",
      durationMinutes: 45,
      userId: alex.id,
      categoryId: strength.id
    }
  });

  await prisma.workout.create({
    data: {
      title: "Evening Cycling",
      description: "15km bike ride around the city",
      durationMinutes: 40,
      userId: alex.id,
      categoryId: cardio.id
    }
  });

  // Sarah's workouts
  await prisma.workout.create({
    data: {
      title: "Vinyasa Flow",
      description: "Relaxing yoga session focusing on breathing",
      durationMinutes: 60,
      userId: sarah.id,
      categoryId: yoga.id
    }
  });

  await prisma.workout.create({
    data: {
      title: "Leg Day",
      description: "Squats, lunges, and deadlifts",
      durationMinutes: 50,
      userId: sarah.id,
      categoryId: strength.id
    }
  });

  await prisma.workout.create({
    data: {
      title: "Power Yoga",
      description: "Intense yoga workout with challenging poses",
      durationMinutes: 55,
      userId: sarah.id,
      categoryId: yoga.id
    }
  });

  // Mike's workouts
  await prisma.workout.create({
    data: {
      title: "Tabata Training",
      description: "20 seconds on, 10 seconds off - full body workout",
      durationMinutes: 25,
      userId: mike.id,
      categoryId: hiit.id
    }
  });

  await prisma.workout.create({
    data: {
      title: "Basketball Practice",
      description: "Pick-up game at the local court",
      durationMinutes: 90,
      userId: mike.id,
      categoryId: sports.id
    }
  });

  await prisma.workout.create({
    data: {
      title: "HIIT Circuit",
      description: "Burpees, mountain climbers, jump squats",
      durationMinutes: 30,
      userId: mike.id,
      categoryId: hiit.id
    }
  });

  await prisma.workout.create({
    data: {
      title: "Swimming Laps",
      description: "40 laps in the pool, working on technique",
      durationMinutes: 45,
      userId: mike.id,
      categoryId: cardio.id
    }
  });

  // Emma's workouts
  await prisma.workout.create({
    data: {
      title: "Core Strength",
      description: "Planks, crunches, and Russian twists",
      durationMinutes: 35,
      userId: emma.id,
      categoryId: strength.id
    }
  });

  await prisma.workout.create({
    data: {
      title: "Tennis Match",
      description: "Doubles match with friends",
      durationMinutes: 75,
      userId: emma.id,
      categoryId: sports.id
    }
  });

  await prisma.workout.create({
    data: {
      title: "Spin Class",
      description: "High-intensity cycling class at the gym",
      durationMinutes: 45,
      userId: emma.id,
      categoryId: cardio.id
    }
  });

  // Some workouts without categories
  await prisma.workout.create({
    data: {
      title: "Stretching Session",
      description: "Full body stretching and mobility work",
      durationMinutes: 20,
      userId: alex.id,
      categoryId: null
    }
  });

  await prisma.workout.create({
    data: {
      title: "Walking",
      description: "Casual walk in the neighborhood",
      durationMinutes: 30,
      userId: emma.id,
      categoryId: null
    }
  });

  console.log("✅ Seed completed successfully!");
  console.log(`
📊 Summary:
  - Users: 4
  - Categories: 5
  - Workouts: 15
  
🔗 Try these endpoints:
  - GET http://localhost:3000/users
  - GET http://localhost:3000/workouts?categoryId=1
  - GET http://localhost:3000/stats
  - GET http://localhost:3000/stats/users/1
  `);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
