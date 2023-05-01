const {
  updateHotspotAttributes,
  getAllHotspots,
} = require('../helpers/modifyXML');

const updateLot = async (req, res) => {
  const { lotId, info, status = true } = req.body;

  if (!lotId) {
    return res.status(400).json({
      message: 'lotId is required',
    });
  }
  try {
    const error = await updateHotspotAttributes(lotId, status, info);

    if (error) {
      return res.status(400).json({ message: error });
    }

    res.status(200).json({
      message: 'Lot updated',
    });
  } catch (err) {
    console.log(err);
  }
};

const getLots = async (req, res) => {
  try {
    const hotspots = await getAllHotspots();
    res.status(200).json({ hotspots });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updateLot, getLots };
