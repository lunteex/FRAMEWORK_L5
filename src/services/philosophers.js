const Database = require('../db/db');

class PhilosopherService {
    constructor() {
        this.db = new Database('philosophers');
    }

    async getAll() {
        return await this.db.read();
    }

    async getById(id) {
        const philosophers = await this.db.read();
        return philosophers.find(p => p.id === parseInt(id));
    }

    async create(data) {
        const philosophers = await this.db.read();
        const newPhilosopher = {
            id: philosophers.length + 1,
            ...data,
            createdAt: new Date().toISOString()
        };
        philosophers.push(newPhilosopher);
        await this.db.write(philosophers);
        return newPhilosopher;
    }

    async update(id, data) {
        const philosophers = await this.db.read();
        const index = philosophers.findIndex(p => p.id === parseInt(id));
        if (index === -1) return null;
        philosophers[index] = { ...philosophers[index], ...data };
        await this.db.write(philosophers);
        return philosophers[index];
    }

    async partialUpdate(id, data) {
        const philosophers = await this.db.read();
        const index = philosophers.findIndex(p => p.id === parseInt(id));
        if (index === -1) return null;
        philosophers[index] = { ...philosophers[index], ...data, lastModified: new Date().toISOString() };
        await this.db.write(philosophers);
        return philosophers[index];
    }

    async delete(id) {
        const philosophers = await this.db.read();
        const filtered = philosophers.filter(p => p.id !== parseInt(id));
        await this.db.write(filtered);
        return filtered;
    }
}

module.exports = new PhilosopherService();