const { prisma } = require("../db");
const { validateCreateUser, validateUpdateUser } = require("../validators/users.validator");

function parsePagination(query) {
  const limit = query.limit !== undefined ? Number(query.limit) : 20;
  const offset = query.offset !== undefined ? Number(query.offset) : 0;

  const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.min(limit, 100) : 20;
  const safeOffset = Number.isFinite(offset) && offset >= 0 ? offset : 0;

  return { limit: safeLimit, offset: safeOffset };
}

async function listUsers(req, res) {
  const { limit, offset } = parsePagination(req.query);
  const search = typeof req.query.search === "string" ? req.query.search.trim() : "";

  const where = search
    ? {
        OR: [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } }
        ]
      }
    : {};

  const [items, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { id: "asc" }
    }),
    prisma.user.count({ where })
  ]);

  res.json({ limit, offset, total, items });
}

async function getUser(req, res) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

  const user = await prisma.user.findUnique({
    where: { id },
    include: { workouts: true }
  });

  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
}

async function createUser(req, res) {
  const errors = validateCreateUser(req.body);
  if (errors.length) return res.status(400).json({ errors });

  try {
    const user = await prisma.user.create({
      data: {
        firstName: req.body.firstName.trim(),
        lastName: req.body.lastName.trim(),
        email: req.body.email.trim(),
        age: req.body.age
      }
    });
    res.status(201).json(user);
  } catch (e) {
    // email unique
    return res.status(400).json({ error: "Could not create user (maybe email already exists)" });
  }
}

async function updateUser(req, res) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

  const errors = validateUpdateUser(req.body);
  if (errors.length) return res.status(400).json({ errors });

  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ error: "User not found" });

  try {
    const updated = await prisma.user.update({
      where: { id },
      data: {
        ...(req.body.firstName !== undefined ? { firstName: req.body.firstName.trim() } : {}),
        ...(req.body.lastName !== undefined ? { lastName: req.body.lastName.trim() } : {}),
        ...(req.body.email !== undefined ? { email: req.body.email.trim() } : {}),
        ...(req.body.age !== undefined ? { age: req.body.age } : {})
      }
    });
    res.json(updated);
  } catch (e) {
    return res.status(400).json({ error: "Could not update user (maybe email already exists)" });
  }
}

async function deleteUser(req, res) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ error: "User not found" });

  await prisma.user.delete({ where: { id } });
  res.status(204).send();
}

module.exports = {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
