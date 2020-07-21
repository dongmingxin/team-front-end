const express = require('express');
const router = express.Router();
const staffRoutes = require('./routes/staff');
const customerRoutes = require('./routes/customer');
const cartRoutes = require('./routes/cart');
const pizzaRoutes = require('./routes/pizza');
const pizzaGenreRoutes = require('./routes/pizzaGenre');
const sideRoutes = require('./routes/sideGenre');
const drinkRoutes = require('./routes/drinkGenre');
const dessertRoutes = require('./routes/dessertGenre');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const authGuard = require('./middleware/authGuard');
const admin = require('./middleware/admin');


router.use('/staffs', staffRoutes);
router.use('/customers', customerRoutes);
router.use('/carts', cartRoutes);
router.use('/pizzas', pizzaRoutes);
router.use('/pizzaGenres', pizzaGenreRoutes);
router.use('/sideGenres', sideRoutes);
router.use('/drinkGenres', drinkRoutes);
router.use('/dessertGenres', dessertRoutes);
router.use('/auth', authRoutes);
router.use('/products', productRoutes);


module.exports = router;

