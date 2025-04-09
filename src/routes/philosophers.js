const { Router } = require('../framework/Framework');
const controller = require('../controllers/philosophers');

const router = new Router();

router.get('/api/v1/philosophers', controller.getAll);
router.get('/api/v1/philosophers/:id', controller.getById);
router.post('/api/v1/philosophers', controller.create);
router.put('/api/v1/philosophers/:id', controller.update);
router.patch('/api/v1/philosophers/:id', controller.partialUpdate);
router.delete('/api/v1/philosophers/:id', controller.delete);

module.exports = router;