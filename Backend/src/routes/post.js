const express = require("express");
const {
  allPosts,
  create,
  deleteData,
  editData,
} = require("../controllers/post.controller");
const uploadData = require("../controllers/bulkUpload.controller");
const upload = require("../middleware/multerUpload");
const authorization = require("../middleware/authorization");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CarDetails:
 *       type: object
 *       required:
 *         - Make
 *         - Model
 *         - Year
 *         - Color
 *         - Price
 *         - Mileage
 *         - Transmission
 *         - FuelType
 *       properties:
 *         Make:
 *           type: string
 *         Model:
 *           type: string
 *         Year:
 *           type: number
 *         Color:
 *           type: string
 *         Price:
 *           type: number
 *         Mileage:
 *           type: number
 *         Transmission:
 *           type: string
 *         FuelType:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts managing API
 */

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a file
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successfully uploaded the file
 *       401:
 *         description: Unauthorized
 */
router.post("/upload", authorization, upload.single("file"), uploadData);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/create:
 *   post:
 *     summary: Create a new car detail entry
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CarDetails'
 *     responses:
 *       201:
 *         description: Upload successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: UploadSuccessfully
 *                 carsData:
 *                   type: object
 *                   properties:
 *                     make:
 *                       type: string
 *                     model:
 *                       type: string
 *                     year:
 *                       type: integer
 *                     color:
 *                       type: string
 *       400:
 *         description: JWT token not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token not found
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not authenticated
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

router.post("/create", authorization, create);

/**
 * @swagger
 * /api/delete/{_id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Successfully deleted the post
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
router.delete("/delete/:_id", authorization, deleteData);

/**
 * @swagger
 * /api/edit/{_id}:
 *   post:
 *     summary: Edit a post
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CarDetails'
 *     responses:
 *       200:
 *         description: Successfully edited the post
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
router.post("/edit/:_id", authorization, editData);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Page size for pagination
 *       - in: query
 *         name: file
 *         schema:
 *           type: string
 *         description: File name to filter errors
 *       - in: query
 *         name: check
 *         schema:
 *           type: string
 *           enum: [bulk, cardetails, error]
 *         description: Type of data to fetch
 *     responses:
 *       200:
 *         description: Successfully fetched the posts
 *       400:
 *         description: No data found
 *       500:
 *         description: Server error
 */
router.get("/posts", allPosts);

module.exports = router;
