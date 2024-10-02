const multi = 8.987742438e-9;
const corE = [2, 3, 1];

let q1mag = 2e-6;
let q2mag = 4e-6;

let q1cor = [5, 4, 6];
let q2cor = [2, 1, 6];

const sumaCargas = (qcor, qmag) => {
  let newCor = [];

  // Diferiencia de coordenadas
  for (let i = 0; i < corE.length; i++) {
    newCor[i] = qcor[i] - corE[i];
  }

  // Valor del denominador
  let d1 = 0;
  for (let i = 0; i < corE.length; i++) {
    d1 += newCor[i] * newCor[i];
  }

  d1 = d1 ** (3 / 2);

  // Encontrar valores a(x,y,z)
  let resultados = [];
  for (let i = 0; i < newCor.length; i++) {
    resultados[i] = (qmag * newCor[i]) / d1;
  }

  return resultados;
};

const res1 = sumaCargas(q1cor, q1mag);
const res2 = sumaCargas(q2cor, q2mag);

const sumatioria = [];

for (let i = 0; i < corE.length; i++) {
  sumatioria[i] = res1[i] + res2[i];
}

const campoE = [];

for (let i = 0; i < corE.length; i++) {
  campoE[i] = multi * sumatioria[i];
}

console.log(campoE);
