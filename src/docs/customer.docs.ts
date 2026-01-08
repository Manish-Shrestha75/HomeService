/**
 * @swagger
 * /api/bookings:
 *   post:
 *     tags: [Bookings]
 *     summary: Create a new booking (Customer only)
 *     description: Customer creates a booking for a service
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serviceId
 *               - bookingDate
 *               - startTime
 *             properties:
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
 *                 example: "Please call before arriving"
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
 *                 booking:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "booking-uuid-123"
 *                     bookingDate:
 *                       type: string
 *                       example: "2024-01-20"
 *                     startTime:
 *                       type: string
 *                       example: "14:00"
 *                     status:
 *                       type: string
 *                       example: "pending"
 *                     bookingNumber:
 *                       type: string
 *                       example: "BK-123456"
 *       400:
 *         description: Invalid input or time slot already booked
 *       401:
 *         description: Unauthorized - Customer access required
 */

/**
 * @swagger
 * /api/bookings/customer/{customerId}:
 *   get:
 *     tags: [Bookings]
 *     summary: Get customer bookings
 *     description: Retrieve all bookings for a specific customer
 *     security:
 *       - bearerAuth: []
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
 *                         format: date
 *                         example: "2024-01-20"
 *                       startTime:
 *                         type: string
 *                         example: "14:00"
 *                       status:
 *                         type: string
 *                         example: "pending"
 *                       service:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "House Cleaning"
 *                           price:
 *                             type: number
 *                             format: float
 *                             example: 100.00
 *                       provider:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "provider-uuid-456"
 *                           name:
 *                             type: string
 *                             example: "Manish Shrestha"
 *                           email:
 *                             type: string
 *                             example: "manish@gmail.com"
 *       401:
 *         description: Unauthorized - Customer access required
 */

/**
 * @swagger
 * /api/bookings/categories:
 *   get:
 *     tags: [Bookings]
 *     summary: Get all service categories
 *     description: Retrieve all service categories for booking selection
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
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
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Cleaning"
 *                       description:
 *                         type: string
 *                         example: "Home and office cleaning services"
 *                       servicesCount:
 *                         type: integer
 *                         example: 5
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/bookings/{id}/cancel/{customerId}:
 *   put:
 *     tags: [Bookings]
 *     summary: Cancel a booking (Customer only)
 *     description: Customer cancels their booking before service starts
 *     security:
 *       - bearerAuth: []
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
 *         description: Customer ID (must match authenticated customer)
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
 *                 booking:
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
 *       401:
 *         description: Unauthorized - Customer access required or ID mismatch
 *       404:
 *         description: Booking not found
 */