const { updateHotspotAttributes } = require('../helpers/modifyXML');

const updateLot = async (req, res) => {
  const {
    lotId,
    title = '',
    description = '',
    surface = '',
    price = '',
    status = true,
  } = req.body;

  if (!lotId) {
    return res.status(400).json({
      message: 'lotId is required',
    });
  }
  try {
    const error = await updateHotspotAttributes(lotId, status, {
      newTitle: title,
      newDescription: description,
      newSurface: surface,
      newPrice: price,
    });

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

module.exports = { updateLot };
