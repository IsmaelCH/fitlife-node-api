const { prisma } = require("../db");

async function listCategories(req, res) {
  const limit = parseInt(req.query.limit) || 20;
  const offset = parseInt(req.query.offset) || 0;

  const [items, total] = await Promise.all([
    prisma.category.findMany({
      include: {
        _count: {
          select: { workouts: true }
        }
      },
      orderBy: { name: "asc" },
      skip: offset,
      take: limit
    }),
    prisma.category.count()
  ]);

  res.json({ limit, offset, total, items });
}

async function getCategory(req, res) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      workouts: {
        include: { user: true }
      }
    }
  });

  if (!category) return res.status(404).json({ error: "Category not found" });
  res.json(category);
}

async function createCategory(req, res) {
  const { name, description } = req.body;
  
  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "name is required" });
  }

  try {
    const data = { name: name.trim() };
    if (description && typeof description === "string" && description.trim()) {
      data.description = description.trim();
    }
    
    const category = await prisma.category.create({ data });
    res.status(201).json(category);
  } catch (e) {
    return res.status(400).json({ error: "Category name already exists" });
  }
}

async function updateCategory(req, res) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

  const { name, description } = req.body;
  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "name is required" });
  }

  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ error: "Category not found" });

  try {
    const data = { name: name.trim() };
    if (description !== undefined) {
      data.description = description && typeof description === "string" ? description.trim() : null;
    }
    
    const updated = await prisma.category.update({
      where: { id },
      data
    });
    res.json(updated);
  } catch (e) {
    return res.status(400).json({ error: "Category name already exists" });
  }
}

async function deleteCategory(req, res) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ error: "Category not found" });

  await prisma.category.delete({ where: { id } });
  res.status(204).send();
}

module.exports = {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
};
