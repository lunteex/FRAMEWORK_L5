const bookService = require('../services/books');

exports.getAll = async (req, res) => {
    try {
        const books = await bookService.getAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

exports.getById = async (req, res) => {
    try {
        const book = await bookService.getById(req.path.split('/')[3]);
        if (!book) return res.status(404).json({ error: 'Book не найден' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

exports.create = async (req, res) => {
    try {
        const book = await bookService.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error: 'Неверные данные' });
    }
};

exports.update = async (req, res) => {
    try {
        const book = await bookService.update(req.path.split('/')[3], req.body);
        if (!book) return res.status(404).json({ error: 'Book не найден' });
        res.json(book);
    } catch (error) {
        res.status(400).json({ error: 'Неверные данные' });
    }
};

exports.partialUpdate = async (req, res) => {
    try {
        const book = await bookService.partialUpdate(req.path.split('/')[3], req.body);
        if (!book) return res.status(404).json({ error: 'Book не найден' });
        res.json(book);
    } catch (error) {
        res.status(400).json({ error: 'Неверные данные' });
    }
};

exports.delete = async (req, res) => {
    try {
        const result = await bookService.delete(req.path.split('/')[3]);
        res.json({ message: 'Book удален' });
    } catch (error) {
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};