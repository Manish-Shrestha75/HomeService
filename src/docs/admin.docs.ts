/**
 * @swagger
 * /api/admin/providers/{providerId}/approve:
 *   post:
 *     tags: [Admin]
 *     summary: Approve a service provider
 *     description: Admin approves a pending service provider
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: providerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Provider ID to approve
 *     responses:
 *       200:
 *         description: Provider approved successfully
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
 *                   example: "Provider approved successfully"
 *                 provider:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "provider-uuid-123"
 *                     name:
 *                       type: string
 *                       example: "Manish Shrestha"
 *                     email:
 *                       type: string
 *                       example: "manish@gmail.com"
 *                     providerStatus:
 *                       type: string
 *                       example: "approved"
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Provider not found
 */

/**
 * @swagger
 * /api/admin/providers/{providerId}/reject:
 *   post:
 *     tags: [Admin]
 *     summary: Reject a service provider
 *     description: Admin rejects a pending service provider
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: providerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Provider ID to reject
 *     responses:
 *       200:
 *         description: Provider rejected successfully
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
 *                   example: "Provider rejected successfully"
 *                 provider:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "provider-uuid-456"
 *                     name:
 *                       type: string
 *                       example: "Manish Shrestha"
 *                     email:
 *                       type: string
 *                       example: "manish@gmail.com"
 *                     providerStatus:
 *                       type: string
 *                       example: "rejected"
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Provider not found
 */

/**
 * @swagger
 * /api/admin/bookings:
 *   get:
 *     tags: [Admin]
 *     summary: View all bookings
 *     description: Admin views all bookings in the system
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All bookings retrieved successfully
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
 *                   example: "All bookings fetched"
 *                 count:
 *                   type: integer
 *                   example: 150
 *                 bookings:
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
 *                         type: string
 *                         example: "Manish Shrestha"
 *                       provider:
 *                         type: string
 *                         example: "CleanPro Service"
 *                       service:
 *                         type: string
 *                         example: "House Cleaning"
 *       401:
 *         description: Unauthorized - Admin access required
 */

/**
 * @swagger
 * /api/admin/report:
 *   get:
 *     tags: [Admin]
 *     summary: Get basic system report
 *     description: Admin views basic system statistics (total bookings, active providers)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Report generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalBookings:
 *                   type: integer
 *                   example: 150
 *                   description: Total number of bookings in the system
 *                 activeProviders:
 *                   type: integer
 *                   example: 25
 *                   description: Number of approved providers in the system
 *       401:
 *         description: Unauthorized - Admin access required
 */