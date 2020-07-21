const express = require('express');
const router = express.Router();
const {
    getPizza,
    getAllPizza,
    addPizza,
    updatePizza,
    deletePizza,
    updateAvatar
} = require('../controllers/pizza');

router.get('/', getAllPizza);
router.get('/:id', getPizza);
router.post('/', addPizza);
router.put('/:id', updatePizza);
router.delete('/:id', deletePizza);
router.put('/:id/avatar', updateAvatar);

module.exports = router;