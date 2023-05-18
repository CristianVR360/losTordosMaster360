(() => {
  const price = document.querySelector('#price');
  const hotspotsSelect = document.querySelector('#loteId');
  const form = document.querySelector('#admin-form');
  const logoutButton = document.querySelector('#logoutButton');

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

  const optionsPUT = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: {},
  };

  const formatNumber = () => {
    let price = document.getElementById('price');
    let num = price.value.replace(/\./g, '');
    if (num === '') {
      price.value = '';
    } else if (/^\d+$/.test(num)) {
      price.value = parseInt(num).toLocaleString('es-ES');
    } else {
      let digits = num.match(/\d+/g);
      price.value = digits ? digits.join('') : '';
      alert('Ingrese solo números');
    }
  };

  function changeDisponibility() {
    const loteId = this.value;
    const hotspot = hotspotsXML.find((hotspot) => hotspot.id === loteId);

    if (!hotspot) document.getElementById('status').checked = false;

    if (hotspot) {
      document.getElementById('status').checked =
        hotspot.skinid === 'ht_disponible' ? true : false;
    }

    if (hotspot?.info?.info) {
      if (hotspot.info.info[0] === '$') {
        const priceLength = hotspot.info.info.length;
        hotspot.info.info = hotspot.info.info.substring(1, priceLength);
      }
      document.getElementById('price').value = hotspot.info.info;
    } else {
      document.getElementById('price').value = 0;
    }
  }

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

  const getAllFormValues = () => {
    const loteId = document.getElementById('loteId').value;
    // const title = document.getElementById('title').value;
    // const surface = document.getElementById('surface').value;
    const price = document.getElementById('price').value;
    const status = document.getElementById('status').checked;
    // const description = document.getElementById('description').value;

    return {
      lotId: loteId,
      status,
      info: `$${price}`,
    };
  };

  const cleanInputs = () => {
    document.getElementById('loteId').value = '';
    document.getElementById('title').value = '';
    document.getElementById('surface').value = '';
    document.getElementById('price').value = '';
    document.getElementById('status').checked = false;
    document.getElementById('description').value = '';
  };

  const replacePage = () => {
    history.replaceState(null, null, 'loginForm.html');
    location.href = `${window.location.origin}/loginForm.html`;
  };

  const responseAlertCreate = (message, error = false) => {
    const responseAlert = document.createElement('div');
    responseAlert.className = `alert ${
      error ? 'alert-danger' : 'alert-primary'
    }`;
    responseAlert.innerHTML = message;
    form.prepend(responseAlert);

    setTimeout(() => {
      responseAlert.remove();
    }, 2300);
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
    price.addEventListener('blur', formatNumber);

    hotspotsSelect.addEventListener('change', changeDisponibility);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const values = getAllFormValues();

      optionsPUT.body = JSON.stringify(values);

      fetch(url, optionsPUT)
        .then((response) => {
          responseAlertCreate('Actualización Exitosa');

          return response.json();
        })
        .then(() => cleanInputs())
        .catch((error) => {
          responseAlertCreate(
            'Ocurrio un error, por favor intentelo en unos minutos',
            true
          );
          console.error(error);
        });
    });

    fetch(url, optionsGET)
      .then((response) => response.json())
      .then(({ hotspots }) => {
        // Crea un option para cada hotspot
        hotspotsXML = hotspots;

        hotspots.forEach((hotspot) => {
          const option = document.createElement('option');
          option.value = hotspot.id;
          option.textContent = hotspot.id;
          hotspotsSelect.appendChild(option);
        });
      })
      .catch((error) => console.error(error));
  } else {
    replacePage();
  }
})();
