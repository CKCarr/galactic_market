import express from 'express';
const userRoute = express.Router();


//retrieves users
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRoute.get('/users', async (req, res) => {
    try {
        const [users] = await mysql_db.query('SELECT * FROM users');
        res.json(users);
    } catch (err) {
        console.error('Error fetching users from database:', err);
        res.status(500).send('Error fetching users');
    }
});

//registers user
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 */
userRoute.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email and password are required.' });
    }

    try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert the new user into the database
        const result = await mysql_db.query(
            'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// retrieves session token
/**
 * @swagger
 * /session:
 *   get:
 *     summary: Retrieve details about a user by session token
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Session details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Server error
 */
userRoute.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [user] = await mysql_db.query('SELECT * FROM Users WHERE username = ?', [username]);

        if (user && await bcrypt.compare(password, user.password)) {
            res.json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// retrieves session token details
/**
 * @swagger
 * /session:
 *   get:
 *     summary: Retrieve details about a user by session token
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Session details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Server error
 */
userRoute.get('/session', async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user details
        const [user] = await mysql_db.query('SELECT * FROM Users WHERE user_id = ?', [decoded.userId]);

        res.json({ message: 'Session details retrieved successfully', user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

//schema for users
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - user_id
 *         - username
 *         - email
 *         - password
 *       properties:
 *         user_id:
 *           type: integer
 *           description: The auto-generated ID of the user.
 *         username:
 *           type: string
 *           description: The username of the user, used for logging in.
 *         email:
 *           type: string
 *           description: The email address of the user, must be unique.
 *         password:
 *           type: string
 *           description: The hashed password of the user.
 *       example:
 *         user_id: 1
 *         username: 'Galaxy_Explorer'
 *         email: 'galaxy_explorer_1@email.com'
 *         password: 'GEpass1word'
 */


export default userRoute;
