const Database = require('../db/db');

class BookService {
    constructor() {
        this.db = new Database('books');
    }

    async getAll() {
        return await this.db.read();
    }

    async getById(id) {
        const books = await this.db.read();
        return books.find(b => b.id === parseInt(id));
    }

    async create(data) {
        const books = await this.db.read();
        const newBook = {
            id: books.length + 1,
            ...data,
            createdAt: new Date().toISOString()
        };
        books.push(newBook);
        await this.db.write(books);
        return newBook;
    }

    async update(id, data) {
        const books = await this.db.read();
        const index = books.findIndex(b => b.id === parseInt(id));
        if (index === -1) return null;
        books[index] = { ...books[index], ...data };
        await this.db.write(books);
        return books[index];
    }

    async partialUpdate(id, data) {
        const books = await this.db.read();
        const index = books.findIndex(b => b.id === parseInt(id));
        if (index === -1) return null;
        books[index] = { ...books[index], ...data, lastModified: new Date().toISOString() };
        await this.db.write(books);
        return books[index];
    }

    async delete(id) {
        const books = await this.db.read();
        const filtered = books.filter(b => b.id !== parseInt(id));
        await this.db.write(filtered);
        return filtered;
    }
}

module.exports = new BookService();