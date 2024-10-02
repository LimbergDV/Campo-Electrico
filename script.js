const E0 = 8.854187817e-12; 

function convertCharge(charge, unit) {
    switch (unit) {
        case 'micro':
            return charge * 1e-6; 
        case 'nano':
            return charge * 1e-9; 
        default:
            return charge;
    }
}

function convertDistance(value, unit) {
    switch (unit) {
        case 'yard':
            return value * 0.9144; 
        case 'inch':
            return value * 0.0254; 
        case 'mm':
            return value * 0.001; 
        case 'feet':
            return value * 0.3048; 
        case 'm':
            return value; 
        default:
            return value; 
    }
}


function calculateField() {
    const pointX = parseFloat(document.getElementById('pointX').value);
    const pointY = parseFloat(document.getElementById('pointY').value);
    const pointZ = parseFloat(document.getElementById('pointZ').value);
    let totalFieldX = 0;
    let totalFieldY = 0;
    let totalFieldZ = 0;

    for (let i = 1; i <= 5; i++) {
        let charge = parseFloat(document.getElementById('q' + i).value);
        let chargeUnit = document.getElementById('q' + i + 'Unit').value;
        let positionX = parseFloat(document.getElementById('q' + i + 'PositionX').value);
        let positionY = parseFloat(document.getElementById('q' + i + 'PositionY').value);
        let positionZ = parseFloat(document.getElementById('q' + i + 'PositionZ').value);

 
        charge = convertCharge(charge, chargeUnit);

        
        let positionXUnit = document.getElementById('q' + i + 'PositionXUnit').value;
        let positionYUnit = document.getElementById('q' + i + 'PositionYUnit').value;
        let positionZUnit = document.getElementById('q' + i + 'PositionZUnit').value;

        positionX = convertDistance(positionX, positionXUnit);
        positionY = convertDistance(positionY, positionYUnit);
        positionZ = convertDistance(positionZ, positionZUnit);

        
        const rX = pointX - positionX;
        const rY = pointY - positionY;
        const rZ = pointZ - positionZ;
        const rSquared = rX * rX + rY * rY + rZ * rZ;

        if (rSquared > 0) {
            const E = (1 / (4 * Math.PI * E0)) * (charge / rSquared);
            
            const magnitude = E / Math.sqrt(rSquared);
            totalFieldX += magnitude * rX;
            totalFieldY += magnitude * rY;
            totalFieldZ += magnitude * rZ;
        }
    }

    document.getElementById('result').innerText = `Resultado Total: 
    E_x = ${totalFieldX.toFixed(2)} N/C, 
    E_y = ${totalFieldY.toFixed(2)} N/C, 
    E_z = ${totalFieldZ.toFixed(2)} N/C`;
}