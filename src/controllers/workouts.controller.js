const { prisma } = require("../db");
const { validateCreateWorkout, validateUpdateWorkout } = require("../validators/workouts.validator");

function parsePagination(query) {
  const limit = query.limit !== undefined ? Number(query.limit) : 20;
  const offset = query.offset !== undefined ? Number(query.offset) : 0;

  const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.min(limit, 100) : 20;
  const safeOffset = Number.isFinite(offset) && offset >= 0 ? offset : 0;

  return { limit: safeLimit, offset: safeOffset };
}

async function listWorkouts(req, res) {
  const { limit, offset } = parsePagination(req.query);
  const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
  
  // Filtros avanzados
  const userId = req.query.userId ? Number(req.query.userId) : undefined;
  const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
  const minDuration = req.query.minDuration ? Number(req.query.minDuration) : undefined;
  const maxDuration = req.query.maxDuration ? Number(req.query.maxDuration) : undefined;
  const sortBy = req.query.sortBy || "id";
  const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

  const where = {
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } }
      ]
    }),
    ...(userId && { userId }),
    ...(categoryId !== undefined && { categoryId }),
    ...(minDuration && { durationMinutes: { gte: minDuration } }),
    ...(maxDuration && { durationMinutes: { lte: maxDuration } }),
    ...(minDuration && maxDuration && {
      durationMinutes: { gte: minDuration, lte: maxDuration }
    })
  };

  const validSortFields = ["id", "title", "durationMinutes", "createdAt"];
  const orderBy = validSortFields.includes(sortBy) ? { [sortBy]: sortOrder } : { id: "asc" };

  const [items, total] = await Promise.all([
    prisma.workout.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy,
      include: { user: true, category: true }
    }),
    prisma.workout.count({ where })
  ]);

  res.json({ limit, offset, total, items });
}

async function getWorkout(req, res) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

  const workout = await prisma.workout.findUnique({
    where: { id },
    include: { user: true, category: true }
  });

  if (!workout) return res.status(404).json({ error: "Workout not found" });
  res.json(workout);
}

async function createWorkout(req, res) {
  const errors = validateCreateWorkout(req.body);
  if (errors.length) return res.status(400).json({ errors });

  const user = await prisma.user.findUnique({ where: { id: req.body.userId } });
  if (!user) return res.status(400).json({ error: "userId does not exist" });

  if (req.body.categoryId !== undefined && req.body.categoryId !== null) {
    const category = await prisma.category.findUnique({ where: { id: req.body.categoryId } });
    if (!category) return res.status(400).json({ error: "categoryId does not exist" });
  }

  const workout = await prisma.workout.create({
    data: {
      title: req.body.title.trim(),
      description: req.body.description ? req.body.description.trim() : "",
      durationMinutes: req.body.durationMinutes,
      userId: req.body.userId,
      ...(req.body.categoryId && { categoryId: req.body.categoryId })
    }
  });

  res.status(201).json(workout);
}

async function updateWorkout(req, res) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

  const errors = validateUpdateWorkout(req.body);
  if (errors.length) return res.status(400).json({ errors });

  const existing = await prisma.workout.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ error: "Workout not found" });

  if (req.body.userId !== undefined) {
    const user = await prisma.user.findUnique({ where: { id: req.body.userId } });
    if (!user) return res.status(400).json({ error: "userId does not exist" });
  }

  if (req.body.categoryId !== undefined && req.body.categoryId !== null) {
    const category = await prisma.category.findUnique({ where: { id: req.body.categoryId } });
    if (!category) return res.status(400).json({ error: "categoryId does not exist" });
  }

  const updated = await prisma.workout.update({
    where: { id },
    data: {
      ...(req.body.title !== undefined ? { title: req.body.title.trim() } : {}),
      ...(req.body.description !== undefined ? { description: req.body.description ? req.body.description.trim() : "" } : {}),
      ...(req.body.durationMinutes !== undefined ? { durationMinutes: req.body.durationMinutes } : {}),
      ...(req.body.userId !== undefined ? { userId: req.body.userId } : {}),
      ...(req.body.categoryId !== undefined ? { categoryId: req.body.categoryId } : {})
    }
  });

  res.json(updated);
}

async function deleteWorkout(req, res) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

  const existing = await prisma.workout.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ error: "Workout not found" });

  await prisma.workout.delete({ where: { id } });
  res.status(204).send();
}

module.exports = {
  listWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout
};
