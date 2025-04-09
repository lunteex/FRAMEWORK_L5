const fs = require('fs').promises;
const path = require('path');

class Database {
    constructor(fileName) {
        this.filePath = path.join(__dirname, `${fileName}.json`);
    }

    async read() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async write(data) {
        await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }
}

module.exports = Database;