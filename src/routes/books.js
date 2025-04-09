const { Router } = require('../framework/Framework');
const controller = require('../controllers/books');

const router = new Router();

router.get('/api/v1/books', controller.getAll);
router.get('/api/v1/books/:id', controller.getById);
router.post('/api/v1/books', controller.create);
router.put('/api/v1/books/:id', controller.update);
router.patch('/api/v1/books/:id', controller.partialUpdate);
router.delete('/api/v1/books/:id', controller.delete);

module.exports = router;