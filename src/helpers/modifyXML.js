const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
// const { decode } = require('html-entities');

const xmlFilePath = path.join(__dirname, '../../public/pano.xml');

const getData = async () => {
  try {
    const data = await fs.promises.readFile(xmlFilePath, 'utf-8');
    const result = await xml2js.parseStringPromise(data);
    
    return result;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

const updateHotspotAttributes = async (hotspotId, description, status, newInfo) => {
  try {
      const result = await getData();

      const hotspots = result.panorama.hotspots[0].hotspot;
      const hotspot = hotspots.find(
          (h) => h.$.id.toLowerCase() === hotspotId
      );

      if (hotspot) {
          hotspot.$.description = description;
          hotspot.$.skinid = status; // Asegúrate de que el valor enviado desde el frontend sea uno de: 'ht_disponible', 'ht_noDisponible', 'ht_reservado', o 'ht_oferta'.
          hotspot.$.url = newInfo;

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
    const result = await getData();

    // Acceder directamente a los hotspots basado en la estructura del XML
    const hotspots = result.panorama.hotspots[0].hotspot;

    const excludedIds = ['point01', 'point02', 'point03'];

const hotspotArray = hotspots
  .filter(hotspot => !excludedIds.includes(hotspot.$.id))
  .map(hotspot => {
    return {
      id: hotspot.$.id || '',
      tilt: hotspot.$.tilt || '',
      url: hotspot.$.url || '',
      skinid: hotspot.$.skinid || '',
      title: hotspot.$.title || '',
      pan: hotspot.$.pan || '',
      description: hotspot.$.description || ''  // Se devuelve un string vacío si no hay descripción
    };
  })
  .sort((a, b) => +a.title - +b.title);

   
    return hotspotArray;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};




module.exports = {
  updateHotspotAttributes,
  getAllHotspots,
};


