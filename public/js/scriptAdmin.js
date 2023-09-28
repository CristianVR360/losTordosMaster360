(() => {
  const tableBody = document.querySelector('#hotspotTable tbody');
  const logoutButton = document.querySelector('#logoutButton');
  let currentLoteId = null;

  let hotspotsXML = [];
  const url = `${window.location.origin}/api/admin`;

  const token = getCookie('jwt') || 'logout';
  let isJWTToken = true;

  const optionsGET = {
      method: 'GET',
      headers: {
          authorization: `Bearer ${token}`,
      },
  };

  function getCookie(name) {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.startsWith(name + '=')) {
              return cookie.substring(name.length + 1);
          }
      }
      return '';
  }

  function getAvailabilityText(skinid) {
      switch (skinid) {
          case 'ht_disponible':
              return 'Disponible';
          case 'ht_noDisponible':
              return 'No Disponible';
          case 'ht_reservado':
              return 'Reservado';
          case 'ht_oferta':
              return 'Oferta';
          default:
              return '';
      }
  }

  

  const replacePage = () => {
      history.replaceState(null, null, 'loginForm.html');
      location.href = `${window.location.origin}/loginForm.html`;
  };

  fetch(`${window.location.origin}/api/login/verify`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
  })
  .then((response) => response.json())
  .then(({ isValidToken }) => {
      isJWTToken = isValidToken;
  })
  .catch((error) => console.error(error));

  logoutButton.addEventListener('click', () => {
      document.cookie = 'jwt=logout';
      replacePage();
  });

  if (token !== 'logout' && isJWTToken) {
      fetch(url, optionsGET)
          .then((response) => response.json())
          .then(({ hotspots }) => {
            hotspots = hotspots.filter(hotspot => !['Point01', 'Point02', 'Point03'].includes(hotspot.id));
              hotspotsXML = hotspots;

              hotspots.forEach((hotspot) => {
                  const row = document.createElement('tr');
                  row.innerHTML = `
                      <td>${hotspot.id}</td>
                      <td>${hotspot.description}</td>
                      <td>${hotspot.url}</td>
                      <td>${getAvailabilityText(hotspot.skinid)}</td>
                      <td><button class="btn btn-sm btn-primary modify-btn" data-bs-toggle="modal" data-bs-target="#editModal" data-lote-id="${hotspot.id}">Modificar</button></td>
                  `;
                  tableBody.appendChild(row);
              });
              setupModifyButtons();
          })
          .catch((error) => console.error(error));
  } else {
      replacePage();
  }

  function setupModifyButtons() {
    const modifyButtons = document.querySelectorAll('.modify-btn');
    const titleInput = document.getElementById('titleInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const skinIDSelect = document.getElementById('skinIDSelect');
    const modalLoteIdSpan = document.getElementById('modalLoteId');  // Obtiene el elemento <span> donde colocaremos el ID

    modifyButtons.forEach(button => {
        button.addEventListener('click', function() {
          currentLoteId = this.getAttribute('data-lote-id');  // Almacena el loteId
           
            const row = this.closest('tr');

            const loteTitle = row.querySelector('td:nth-child(3)').textContent; // Precio
            const loteDescription = row.querySelector('td:nth-child(2)').textContent; // Superficie

            titleInput.value = loteTitle; // Establece el precio en el modal
            descriptionInput.value = loteDescription; // Establece la superficie en el modal
            modalLoteIdSpan.textContent = currentLoteId;  // Establece el ID en el título del modal
 
        });
    });
}
// Captura el botón "Guardar" del modal
const saveChangesBtn = document.getElementById('saveChangesBtn');

saveChangesBtn.addEventListener('click', function() {
  // Captura los datos del modal
  const loteId = currentLoteId;
  const price = document.getElementById('titleInput').value;
  const description = document.getElementById('descriptionInput').value;
  const status = document.getElementById('skinIDSelect').value;

  // Crea el objeto de datos para enviar al backend
  const data = {
      lotId: loteId,
      status,
      newInfo: price,
      description
  };

  // Envía la solicitud PUT al backend
  fetch(url, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(`Server responded with a status of ${response.status}`);
    }
  })
  .then(data => {
      console.log('Datos actualizados correctamente');
      
      // Cerrar el modal
      const modal = document.getElementById('editModal');
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.hide();

      // Mostrar un mensaje de éxito
      alert('Guardado con éxito!');

      // Opcionalmente, puedes refrescar la página para cargar los nuevos datos
      location.reload();
  })
  .catch(error => {
      console.error('Error al actualizar:', error.message);
  });
});



})();
