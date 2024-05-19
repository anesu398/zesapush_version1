// controllers/areaStatusController.js

const LoadsheddingStatus = require('../models/loadsheddingStatus');

// GET /api/areas-status/:suburb
exports.getAreaStatus = async (req, res) => {
  try {
    const { suburb } = req.params;

    if (!suburb) {
      return res.status(400).json({ message: 'Suburb parameter is required' });
    }

    // Log the suburb being queried
    console.log(`Querying load shedding status for suburb: ${suburb}`);

    // Find load shedding status for the given suburb, case insensitive
    const status = await LoadsheddingStatus.find({ suburb: new RegExp(`^${suburb}$`, 'i') });

    if (status.length === 0) {
      return res.status(404).json({ message: `No status found for suburb '${suburb}'` });
    }

    res.status(200).json({ status });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
