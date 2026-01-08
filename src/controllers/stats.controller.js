const { prisma } = require("../db");

async function getOverviewStats(req, res) {
  const [totalUsers, totalWorkouts, totalCategories] = await Promise.all([
    prisma.user.count(),
    prisma.workout.count(),
    prisma.category.count()
  ]);

  const avgDuration = await prisma.workout.aggregate({
    _avg: { durationMinutes: true }
  });

  const topCategories = await prisma.category.findMany({
    include: {
      _count: {
        select: { workouts: true }
      }
    },
    orderBy: {
      workouts: {
        _count: "desc"
      }
    },
    take: 5
  });

  res.json({
    totalUsers,
    totalWorkouts,
    totalCategories,
    averageDuration: avgDuration._avg.durationMinutes || 0,
    topCategories: topCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      workoutCount: cat._count.workouts
    }))
  });
}

async function getUserStats(req, res) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return res.status(404).json({ error: "User not found" });

  const workouts = await prisma.workout.findMany({
    where: { userId: id }
  });

  const totalWorkouts = workouts.length;
  const totalMinutes = workouts.reduce((sum, w) => sum + w.durationMinutes, 0);
  const averageDuration = totalWorkouts > 0 ? totalMinutes / totalWorkouts : 0;

  // Workouts de la última semana
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const thisWeek = await prisma.workout.count({
    where: {
      userId: id,
      createdAt: { gte: oneWeekAgo }
    }
  });

  // Por categoría
  const byCategory = await prisma.workout.groupBy({
    by: ["categoryId"],
    where: { userId: id },
    _count: true,
    _sum: { durationMinutes: true }
  });

  const categoriesStats = await Promise.all(
    byCategory.map(async (item) => {
      if (!item.categoryId) {
        return {
          category: "Sin categoría",
          count: item._count,
          totalMinutes: item._sum.durationMinutes || 0
        };
      }
      const cat = await prisma.category.findUnique({ where: { id: item.categoryId } });
      return {
        category: cat?.name || "Desconocida",
        count: item._count,
        totalMinutes: item._sum.durationMinutes || 0
      };
    })
  );

  res.json({
    userId: id,
    totalWorkouts,
    totalMinutes,
    averageDuration: Math.round(averageDuration),
    thisWeek,
    byCategory: categoriesStats
  });
}

module.exports = {
  getOverviewStats,
  getUserStats
};
