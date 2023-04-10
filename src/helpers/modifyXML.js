const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const { decode } = require('html-entities');

const xmlFilePath = path.join(__dirname, '../../public/pano.xml');

const updateHotspotAttributes = async (
  hotspotId,
  status,
  { newTitle = '', newDescription = '', newSurface = '', newPrice = '' }
) => {
  try {
    const data = await fs.promises.readFile(xmlFilePath, 'utf-8');
    const result = await xml2js.parseStringPromise(data);
    const hotspot = result.tour.panorama[0].hotspots[0].hotspot.find(
      (h) => h.$.id === hotspotId
    );
    if (hotspot) {
      hotspot.$.title = newTitle.length !== 0 ? newTitle : hotspot.$.title;
      hotspot.$.skinid = status ? 'ht_disponible' : 'ht_noDisponible';

      const decodedDescription = decode(hotspot.$.description);
      const descriptionParts = decodedDescription.split('<br>');
      const titlePart = descriptionParts[0].replace(/<.*?>/g, '');
      const descriptionPart = descriptionParts[1].replace(/<.*?>/g, '');
      const superficiePart = descriptionParts[2].replace(/<.*?>/g, '');
      const precioPart = descriptionParts[3].replace(/<.*?>/g, '');

      const title = newTitle || titlePart;
      const surface = newSurface || superficiePart;
      const price = newPrice || precioPart;
      const description = newDescription || descriptionPart;

      hotspot.$.description = `<b>${title}</b>
      <br>
      <b>Descripción:</b> ${description} 
      <br>
      <b>Superficie:</b> ${surface}
      <br>
      <b>Precio:</b> $${price}/CLP
      `;

      const builder = new xml2js.Builder();
      const xml = builder.buildObject(result);
      await fs.promises.writeFile(xmlFilePath, xml);
      console.log('File updated correctly');
    } else {
      throw new Error(`No hotspot found with the id: ${hotspotId}`);
    }
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

const getAllHotspots = async () => {
  try {
    const data = await fs.promises.readFile(xmlFilePath, 'utf-8');
    const result = await xml2js.parseStringPromise(data);
    const hotspots = result.tour.panorama[0].hotspots[0].hotspot;

    const hotspotArray = hotspots
      .filter((hotspot) => hotspot.$.description)
      .map((hotspot) => {
        const decodedDescription = decode(hotspot.$.description);
        const descriptionParts = decodedDescription.split('<br>');
        const title = descriptionParts[0].replace(/<.*?>/g, '').trim();
        const surface = descriptionParts[2]
          .replace(/<.*?>/g, '')
          .trim()
          .replace('Superficie: ', '');
        const price = descriptionParts[3]
          .replace(/<.*?>/g, '')
          .trim()
          .replace(/[^0-9.]/g, '');
        const description = descriptionParts[1]
          .replace(/<.*?>/g, '')
          .trim()
          .replace('Descripción: ', '');

        return {
          loteId: hotspot.$.id,
          title,
          surface,
          price,
          skinId: hotspot.$.skinid,
          description,
        };
      });

    return hotspotArray;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

module.exports = { updateHotspotAttributes, getAllHotspots };
