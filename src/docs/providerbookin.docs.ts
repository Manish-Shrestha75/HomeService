/**
 * @swagger
 * /api/provider-bookings/{providerId}/{bookingId}/accept:
 *   put:
 *     tags: [Provider Bookings]
 *     summary: Accept a booking (Provider only)
 *     description: Provider accepts a pending booking request
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: providerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Provider ID (must match authenticated provider)
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID to accept
 *     responses:
 *       200:
 *         description: Booking accepted successfully
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
 *                   example: "Booking accepted successfully"
 *                 booking:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "booking-uuid-123"
 *                     status:
 *                       type: string
 *                       example: "accepted"
 *       400:
 *         description: Booking already processed or invalid status
 *       401:
 *         description: Unauthorized - Provider access required or ID mismatch
 *       404:
 *         description: Booking not found
 */

/**
 * @swagger
 * /api/provider-bookings/{providerId}/{bookingId}/reject:
 *   put:
 *     tags: [Provider Bookings]
 *     summary: Reject a booking (Provider only)
 *     description: Provider rejects a pending booking request
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: providerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Provider ID (must match authenticated provider)
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID to reject
 *     responses:
 *       200:
 *         description: Booking rejected successfully
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
 *                   example: "Booking rejected successfully"
 *                 booking:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "booking-uuid-123"
 *                     status:
 *                       type: string
 *                       example: "rejected"
 *       400:
 *         description: Booking already processed or invalid status
 *       401:
 *         description: Unauthorized - Provider access required or ID mismatch
 *       404:
 *         description: Booking not found
 */

/**
 * @swagger
 * /api/provider-bookings/{providerId}/bookings:
 *   get:
 *     tags: [Provider Bookings]
 *     summary: Get all provider bookings
 *     description: Provider views all their bookings
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: providerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Provider ID (must match authenticated provider)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by booking status
 *         example: "pending"
 *     responses:
 *       200:
 *         description: Provider bookings retrieved successfully
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
 *                       customer:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "customer-uuid-456"
 *                           name:
 *                             type: string
 *                             example: "Manish Shrestha"
 *                           email:
 *                             type: string
 *                             example: "manish@gmail.com"
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
 *       401:
 *         description: Unauthorized - Provider access required or ID mismatch
 */

/**
 * @swagger
 * /api/provider-bookings/{providerId}/{bookingId}/status:
 *   put:
 *     tags: [Provider Bookings]
 *     summary: Update booking status (Provider only)
 *     description: Provider updates booking status (in_progress, completed)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: providerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Provider ID (must match authenticated provider)
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [in_progress, completed]
 *                 example: "in_progress"
 *     responses:
 *       200:
 *         description: Booking status updated successfully
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
 *                   example: "Booking status updated to in_progress"
 *                 booking:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "booking-uuid-123"
 *                     status:
 *                       type: string
 *                       example: "in_progress"
 *       400:
 *         description: Invalid status transition or validation failed
 *       401:
 *         description: Unauthorized - Provider access required or ID mismatch
 *       404:
 *         description: Booking not found
 */