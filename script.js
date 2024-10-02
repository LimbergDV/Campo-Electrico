const E0 = 8.854187817e-12; // Constante de permitividad del vacío

function convertirCarga(carga, unidad) {
  if (carga) {
    document.getElementById("conversionCarga").innerHTML += `Convirtiendo carga: ${carga} ${unidad} <br>`;
  }

  switch (unidad) {
    case "coul": 
      return carga;
    case "micro":
      return carga * 1e-6;
    case "nano":
      return carga * 1e-9;
    default:
      return carga;
  }
}

function convertirDistancia(valor, unidad) {
  if (valor) {
    document.getElementById("convertirDistancia").innerHTML += `Convirtiendo distancia: ${valor} ${unidad} <br>`;
  }

  switch (unidad) {
    case "yard":
      return valor * 0.9144;
    case "inch":
      return valor * 0.0254;
    case "mm":
      return valor * 1852;
    case "feet":
      return valor * 0.3048;
    case "m":
      return valor;
    default:
      return valor;
  }
}

function calcularCampo() {
  const puntoX = parseFloat(document.getElementById("pointX").value);
  const puntoY = parseFloat(document.getElementById("pointY").value);
  const puntoZ = parseFloat(document.getElementById("pointZ").value);
  let campoTotalX = 0;
  let campoTotalY = 0;
  let campoTotalZ = 0;

  if (puntoX) {
    document.getElementById("inicio").innerHTML +=
      `Iniciando cálculo en el punto: (${puntoX}, ${puntoY}, ${puntoZ}) <br>`;
  }

  for (let i = 1; i <= 5; i++) {
    let carga = parseFloat(document.getElementById("q" + i).value);
    let unidadCarga = document.getElementById("q" + i + "Unit").value;
    let posicionX = parseFloat(
      document.getElementById("q" + i + "PositionX").value
    );
    let posicionY = parseFloat(
      document.getElementById("q" + i + "PositionY").value
    );
    let posicionZ = parseFloat(
      document.getElementById("q" + i + "PositionZ").value
    );

    if (posicionX) {
      document.getElementById("carga").innerHTML +=
        `Carga ${i}: ${carga} ${unidadCarga} en (${posicionX}, ${posicionY}, ${posicionZ}) <br>`;
    }

    // Convertir carga
    carga = convertirCarga(carga, unidadCarga);

    if (carga) {
      document.getElementById("cargaConvertida").innerHTML += `Carga convertida ${i}: ${carga} C <br>`;
    }

    // Convertir posiciones
    let unidadPosicionX = document.getElementById(
      "q" + i + "PositionXUnit"
    ).value;
    let unidadPosicionY = document.getElementById(
      "q" + i + "PositionYUnit"
    ).value;
    let unidadPosicionZ = document.getElementById(
      "q" + i + "PositionZUnit"
    ).value;

    posicionX = convertirDistancia(posicionX, unidadPosicionX);
    posicionY = convertirDistancia(posicionY, unidadPosicionY);
    posicionZ = convertirDistancia(posicionZ, unidadPosicionZ);

    if (posicionX) {
      document.getElementById("posicionConvertida").innerHTML += `Posición convertida ${i}: (${posicionX}, ${posicionY}, ${posicionZ}) <br>`;
    }

    const rX = puntoX - posicionX;
    const rY = puntoY - posicionY;
    const rZ = puntoZ - posicionZ;
    const rCuadrado = rX * rX + rY * rY + rZ * rZ;

    if (rCuadrado) {
      document.getElementById("denominador").innerHTML += `Diferiencia (${rX}, ${rY}, ${rZ},); Sumatoria al cuadrado: ${rCuadrado} <br>`;
    }

    if (rCuadrado > 0) {
      const E = (1 / (4 * Math.PI * E0)) * (carga / rCuadrado);

      const magnitud = E / Math.sqrt(rCuadrado);
      campoTotalX += magnitud * rX;
      campoTotalY += magnitud * rY;
      campoTotalZ += magnitud * rZ;

      if (campoTotalX) {
        document.getElementById("contribucion").innerHTML += 
          `Contribución al campo de la carga ${i}: ax = ${magnitud * rX}, ay = ${
            magnitud * rY
          }, az = ${magnitud * rZ} <br>`;
      }
    }
  }

  document.getElementById("result").innerText = `Resultado Total: 
    ax = ${campoTotalX.toFixed(2)} N/C, 
    ay = ${campoTotalY.toFixed(2)} N/C, 
    az = ${campoTotalZ.toFixed(2)} N/C`;
}
