/**
 * @swagger
 * /api/bookings:
 *   post:
 *     tags: [Bookings]
 *     summary: Create a new booking
 *     description: Customer books a service with a provider
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - serviceId
 *               - bookingDate
 *               - startTime
 *             properties:
 *               customerId:
 *                 type: string
 *                 example: "cust123e4567"
 *               serviceId:
 *                 type: integer
 *                 example: 1
 *               bookingDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-20"
 *               startTime:
 *                 type: string
 *                 example: "14:00"
 *               specialInstructions:
 *                 type: string
 *                 example: "Please bring cleaning supplies"
 *     responses:
 *       201:
 *         description: Booking created successfully
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
 *                   example: "Booking created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "booking-uuid-123"
 *                     bookingDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-20T00:00:00Z"
 *                     startTime:
 *                       type: string
 *                       example: "14:00"
 *                     status:
 *                       type: string
 *                       example: "pending"
 *                     service:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "House Cleaning"
 *                     provider:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "prov123e4567"
 *                         name:
 *                           type: string
 *                           example: "CleanPro Service"
 *       400:
 *         description: Bad request
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
 *                   example: "All fields are required"
 *       404:
 *         description: Service not found
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
 *                   example: "Service not found"
 */

/**
 * @swagger
 * /api/bookings/{id}/cancel/{customerId}:
 *   put:
 *     tags: [Bookings]
 *     summary: Cancel a booking
 *     description: Customer cancels their booking before service starts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
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
 *                   example: "Booking cancelled successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "booking-uuid-123"
 *                     status:
 *                       type: string
 *                       example: "cancelled"
 *       400:
 *         description: Cannot cancel booking
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
 *                   example: "Cannot cancel booking after service start time"
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
 * /api/bookings/customer/{customerId}:
 *   get:
 *     tags: [Bookings]
 *     summary: Get customer bookings
 *     description: Retrieve all bookings for a specific customer
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by booking status (pending, accepted, completed, cancelled)
 *         example: "pending"
 *     responses:
 *       200:
 *         description: Bookings retrieved successfully
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
 *                         example: "booking-uuid-123"
 *                       bookingDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-20T00:00:00Z"
 *                       startTime:
 *                         type: string
 *                         example: "14:00"
 *                       status:
 *                         type: string
 *                         example: "pending"
 *                       totalPrice:
 *                         type: number
 *                         format: float
 *                         example: 120.00
 *                       service:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "House Cleaning"
 *                           category:
 *                             type: string
 *                             example: "Cleaning"
 *                       provider:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "prov123e4567"
 *                           name:
 *                             type: string
 *                             example: "Manish Shrestha"
 *                           email:
 *                             type: string
 *                             example: "manish@gmail.com"
 *       400:
 *         description: Invalid customer ID
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
 *                   example: "Invalid customer ID"
 */