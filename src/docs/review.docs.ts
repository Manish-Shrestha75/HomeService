/**
 * @swagger
 * /api/review/customer/{customerId}:
 *   post:
 *     tags: [Reviews]
 *     summary: Submit a review for a completed service
 *     description: Customer can submit review only after service is completed
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookingId
 *               - rating
 *             properties:
 *               bookingId:
 *                 type: string
 *                 example: "booking-uuid-123"
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Excellent service, very professional!"
 *     responses:
 *       201:
 *         description: Review submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean 
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Review submitted successfully"
 *                 review:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "review-uuid-123"
 *                     rating:
 *                       type: integer
 *                       example: 5
 *                     comment:
 *                       type: string
 *                       example: "Excellent service"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-20T10:30:00Z"
 *       400:
 *         description: Cannot submit review
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "You can only review completed services"
 *       404:
 *         description: Booking not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Booking not found"
 */

/**
 * @swagger
 * /api/review/customer/{customerId}:
 *   get:
 *     tags: [Reviews]
 *     summary: Get all reviews by a customer
 *     description: Retrieve all reviews submitted by a specific customer
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Reviews retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean 
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "review-uuid-123"
 *                       rating:
 *                         type: integer
 *                         example: 5
 *                       comment:
 *                         type: string
 *                         example: "Great service!"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-20T10:30:00Z"
 *                       provider:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "provider-uuid-456"
 *                           name:
 *                             type: string
 *                             example: "John Doe"
 *                       booking:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "booking-uuid-789"
 *                           service:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 example: "House Cleaning"
 *       404:
 *         description: Customer not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Customer not found"
 */

/**
 * @swagger
 * /api/review/providers/{providerId}/rating:
 *   get:
 *     tags: [Reviews]
 *     summary: Get provider's average rating
 *     description: Retrieve the average rating of a service provider
 *     parameters:
 *       - in: path
 *         name: providerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Provider ID
 *     responses:
 *       200:
 *         description: Provider rating retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean 
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     providerId:
 *                       type: string
 *                       example: "provider-uuid-456"
 *                     averageRating:
 *                       type: number
 *                       format: float
 *                       example: 4.5
 *                     totalReviews:
 *                       type: integer
 *                       example: 10
 *                     ratingBreakdown:
 *                       type: object
 *                       properties:
 *                         5:
 *                           type: integer
 *                           example: 6
 *                         4:
 *                           type: integer
 *                           example: 3
 *                         3:
 *                           type: integer
 *                           example: 1
 *                         2:
 *                           type: integer
 *                           example: 0
 *                         1:
 *                           type: integer
 *                           example: 0
 *       404:
 *         description: Provider not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Provider not found"
 */