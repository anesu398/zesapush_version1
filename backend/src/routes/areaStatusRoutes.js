// src/routes/areaStatusRoutes.js

const express = require('express');
const { getAreaStatus } = require('../controllers/areaStatusController');

const router = express.Router();

/**
 * @swagger
 * /areas-status/{suburb}:
 *   get:
 *     summary: Get the load shedding status for a specific suburb
 *     tags: [AreaStatus]
 *     parameters:
 *       - in: path
 *         name: suburb
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the suburb
 *     responses:
 *       200:
 *         description: The load shedding status for the suburb
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 suburb:
 *                   type: string
 *                   description: The name of the suburb
 *                 status:
 *                   type: string
 *                   description: The load shedding status
 *                 stage:
 *                   type: string
 *                   description: The stage of the load shedding
 *                 startTime:
 *                   type: string
 *                   format: date-time
 *                   description: The start time of the load shedding
 *                 endTime:
 *                   type: string
 *                   format: date-time
 *                   description: The end time of the load shedding
 *               example:
 *                 suburb: "Khumalo"
 *                 status: "Scheduled"
 *                 stage: "2"
 *                 startTime: "2024-05-20T08:00:00Z"
 *                 endTime: "2024-05-20T12:00:00Z"
 *       404:
 *         description: No status found for the suburb
 *       500:
 *         description: Some error happened
 */
router.get('/:suburb', getAreaStatus);

module.exports = router;
