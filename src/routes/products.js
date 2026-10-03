const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// GET списка всех продуктов
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении списка' });
  }
});

// GET одного продукта по ID
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!product) return res.status(404).json({ error: 'Продукт не найден' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении продукта' });
  }
});

// POST создание продукта (ЗАЩИЩЁН middleware)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await prisma.product.create({ data: { name, price } });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Ошибка при создании продукта' });
  }
});

// PUT обновление продукта
router.put('/:id', async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: { name, price },
    });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: 'Ошибка при обновлении' });
  }
});

// DELETE удаление продукта
router.delete('/:id', async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: parseInt(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Ошибка при удалении' });
  }
});

module.exports = router;