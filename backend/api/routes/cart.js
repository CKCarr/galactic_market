import express from 'express';
const cartRoute = express.Router();

// Gets all items in a user's cart
/**
 * @swagger
 * /cart/{userId}:
 *   get:
 *     summary: Retrieve a user's cart along with all items in it
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user whose cart is being retrieved
 *     responses:
 *       200:
 *         description: Successfully retrieved the cart and its items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CartItem'
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Error accessing cart
 */
cartRoute.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        // Fetch the cart
        const [cart] = await mysql_db.query('SELECT * FROM Cart WHERE user_id = ?', [userId]);
        if (cart.length === 0) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Fetch items in the cart
        const [items] = await mysql_db.query('SELECT * FROM Cart_Items WHERE cart_id = ?', [cart[0].cart_id]);
        res.json({ cart: cart[0], items });
    } catch (error) {
        console.error('Error accessing cart:', error);
        res.status(500).send('Error accessing cart');
    }
});

// Adds a new item to the cart
/**
 * @swagger
 * /cart-items:
 *   post:
 *     summary: Add a new item to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       201:
 *         description: Item added to cart successfully
 *       500:
 *         description: Error adding item to cart
 */
cartRoute.post('/cart-items', async (req, res) => {
    const { cart_id, market_item_id, quantity, subtotal } = req.body;
    try {
        const result = await mysql_db.query('INSERT INTO Cart_Items (cart_id, market_item_id, quantity, subtotal) VALUES (?, ?, ?, ?)', [cart_id, market_item_id, quantity, subtotal]);
        res.status(201).json({ message: 'Item added to cart', cart_item_id: result.insertId });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).send('Error adding item to cart');
    }
});

// Updates a cart item
/**
 * @swagger
 * /cart-items/{cartItemId}:
 *   put:
 *     summary: Update a cart item
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the cart item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Error updating cart item
 */
cartRoute.put('/cart-items/:cartItemId', async (req, res) => {
    const { cartItemId } = req.params;
    const { quantity, subtotal } = req.body;
    try {
        const result = await mysql_db.query('UPDATE Cart_Items SET quantity = ?, subtotal = ? WHERE cart_item_id = ?', [quantity, subtotal, cartItemId]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Cart item not found');
        }
        res.status(200).send('Cart item updated successfully');
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).send('Error updating cart item');
    }
});

//schema for the cart
/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - cart_id
 *         - user_id
 *         - total_price
 *       properties:
 *         cart_id:
 *           type: integer
 *           description: The auto-generated ID of the cart.
 *         user_id:
 *           type: integer
 *           description: The ID of the user who owns the cart.
 *         total_price:
 *           type: number
 *           format: double
 *           description: The total price of all items in the cart.
 *       example:
 *         cart_id: 1
 *         user_id: 101
 *         total_price: 1500.00
 *
 *     CartItem:
 *       type: object
 *       required:
 *         - cart_item_id
 *         - cart_id
 *         - market_item_id
 *         - quantity
 *         - subtotal
 *       properties:
 *         cart_item_id:
 *           type: integer
 *           description: The auto-generated ID of the cart item.
 *         cart_id:
 *           type: integer
 *           description: The ID of the cart this item belongs to.
 *         market_item_id:
 *           type: integer
 *           description: The ID of the market item added to the cart.
 *         ticket_id:
 *           type: integer
 *           description: The ID of the ticket item added to the cart (if applicable).
 *         quantity:
 *           type: integer
 *           description: The quantity of the market item in the cart.
 *         subtotal:
 *           type: number
 *           format: double
 *           description: The subtotal price for this item (quantity * item price).
 *       example:
 *         cart_item_id: 15
 *         cart_id: 1
 *         market_item_id: 2
 *         ticket_id: null
 *         quantity: 3
 *         subtotal: 300.00
 */

export default cartRoute;