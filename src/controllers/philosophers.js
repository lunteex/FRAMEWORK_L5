const philosopherService = require('../services/philosophers');

exports.getAll = async (req, res) => {
    try {
        const philosophers = await philosopherService.getAll();
        res.json(philosophers);
    } catch (error) {
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

exports.getById = async (req, res) => {
    try {
        const philosopher = await philosopherService.getById(req.path.split('/')[3]);
        if (!philosopher) return res.status(404).json({ error: 'Philosopher не найден' });
        res.json(philosopher);
    } catch (error) {
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

exports.create = async (req, res) => {
    try {
        const philosopher = await philosopherService.create(req.body);
        res.status(201).json(philosopher);
    } catch (error) {
        res.status(400).json({ error: 'Неверные данные' });
    }
};

exports.update = async (req, res) => {
    try {
        const philosopher = await philosopherService.update(req.path.split('/')[3], req.body);
        if (!philosopher) return res.status(404).json({ error: 'Philosopher не найден' });
        res.json(philosopher);
    } catch (error) {
        res.status(400).json({ error: 'Неверные данные' });
    }
};

exports.partialUpdate = async (req, res) => {
    try {
        const philosopher = await philosopherService.partialUpdate(req.path.split('/')[3], req.body);
        if (!philosopher) return res.status(404).json({ error: 'Philosopher не найден' });
        res.json(philosopher);
    } catch (error) {
        res.status(400).json({ error: 'Неверные данные' });
    }
};

exports.delete = async (req, res) => {
    try {
        const result = await philosopherService.delete(req.path.split('/')[3]);
        res.json({ message: 'Philosopher удален' });
    } catch (error) {
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};