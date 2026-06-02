const router = express.Router()

router.get('/customers')
router.get('/customers/:id')
router.post('/customers')
router.put('/customers/:id')
router.delete('/customers/:id')