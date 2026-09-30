import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import { OrbitControls } from
    "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js";

// ==========================================
// PHALAKA-YANTRA 3D SIMULATION
// ==========================================


// ---------- BASIC THREE.JS SETUP ----------

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x111827);


// Camera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 2, 8);





// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth - 320,
    window.innerHeight - 150
);

renderer.setPixelRatio(window.devicePixelRatio);

document
    .getElementById("simulation")
    .appendChild(renderer.domElement);

// ---------- ORBIT CONTROLS ----------

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;

controls.dampingFactor = 0.05;

controls.enableZoom = true;

controls.enablePan = true;

controls.minDistance = 4;

controls.maxDistance = 12;


// ---------- LIGHTING ----------

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1.5
);

scene.add(ambientLight);


const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    2
);

directionalLight.position.set(5, 10, 5);

scene.add(directionalLight);


// ---------- PHALAKA BOARD ----------

// Historical proportion:
// 180 x 90 angulas
//
// We scale this down for the 3D scene.

const boardWidth = 6;
const boardHeight = 3;

const boardThickness = 0.15;


// Board geometry
const boardGeometry = new THREE.BoxGeometry(
    boardWidth,
    boardHeight,
    boardThickness
);


// Board material
const boardMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b5a2b
});


// Create board
const board = new THREE.Mesh(
    boardGeometry,
    boardMaterial
);

scene.add(board);


// ---------- GRID LINES ----------

const gridMaterial = new THREE.LineBasicMaterial({
    color: 0xd6b98c
});


// 90 horizontal lines
for (let i = 0; i <= 90; i++) {

    const y =
        boardHeight / 2 -
        (i / 90) * boardHeight;

    const points = [];

    points.push(
        new THREE.Vector3(
            -boardWidth / 2,
            y,
            boardThickness / 2 + 0.01
        )
    );

    points.push(
        new THREE.Vector3(
            boardWidth / 2,
            y,
            boardThickness / 2 + 0.01
        )
    );

    const geometry =
        new THREE.BufferGeometry()
            .setFromPoints(points);

    const line =
        new THREE.Line(
            geometry,
            gridMaterial
        );

    scene.add(line);
}


// ---------- CENTRAL VERTICAL LINE ----------

const verticalPoints = [];

verticalPoints.push(
    new THREE.Vector3(
        0,
        boardHeight / 2,
        boardThickness / 2 + 0.02
    )
);

verticalPoints.push(
    new THREE.Vector3(
        0,
        -boardHeight / 2,
        boardThickness / 2 + 0.02
    )
);

const verticalGeometry =
    new THREE.BufferGeometry()
        .setFromPoints(verticalPoints);

const verticalLine =
    new THREE.Line(
        verticalGeometry,
        new THREE.LineBasicMaterial({
            color: 0xffffff
        })
    );

scene.add(verticalLine);


// ---------- PIVOT POSITION ----------

// Pin is 30 units below the top.
//
// Board height = 90 units.
// Therefore:
// 30 / 90 = 1/3 of board height.

const pivotY =
    boardHeight / 2 -
    boardHeight * (30 / 90);


// ---------- PIVOT / PIN ----------

const pinGeometry =
    new THREE.CylinderGeometry(
        0.08,
        0.08,
        0.35,
        20
    );

const pinMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x22c55e
    });

const pin =
    new THREE.Mesh(
        pinGeometry,
        pinMaterial
    );


// Cylinder normally points along Y.
// Rotate it so it sticks out from the board.

pin.rotation.x = Math.PI / 2;

pin.position.set(
    0,
    pivotY,
    0.25
);

scene.add(pin);


// ---------- GRADUATED CIRCLE ----------

// Radius = 30 angulas.
// Board height = 90 angulas.
// Therefore radius = 1/3 board height.

const radius =
    boardHeight * (30 / 90);


// Circle
const circlePoints = [];

for (
    let i = 0;
    i <= 360;
    i++
) {

    const angle =
        (i / 360) * Math.PI * 2;

    circlePoints.push(
        new THREE.Vector3(
            Math.cos(angle) * radius,
            pivotY +
                Math.sin(angle) * radius,
            boardThickness / 2 + 0.04
        )
    );
}

const circleGeometry =
    new THREE.BufferGeometry()
        .setFromPoints(circlePoints);

const circle =
    new THREE.Line(
        circleGeometry,
        new THREE.LineBasicMaterial({
            color: 0x38bdf8
        })
    );

scene.add(circle);

// ---------- CIRCLE GRADUATION MARKS ----------

const tickMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff
});

for (let i = 0; i < 360; i++) {

    const angle = (i / 360) * Math.PI * 2;

    const outerRadius = radius;

    // Longer marks every 6 degrees
    const innerRadius = (i % 6 === 0)
        ? radius - 0.15
        : radius - 0.05;

    const points = [];

    points.push(
        new THREE.Vector3(
            Math.cos(angle) * innerRadius,
            pivotY + Math.sin(angle) * innerRadius,
            boardThickness / 2 + 0.05
        )
    );

    points.push(
        new THREE.Vector3(
            Math.cos(angle) * outerRadius,
            pivotY + Math.sin(angle) * outerRadius,
            boardThickness / 2 + 0.05
        )
    );

    const geometry =
        new THREE.BufferGeometry()
            .setFromPoints(points);

    const tick =
        new THREE.Line(
            geometry,
            tickMaterial
        );

    scene.add(tick);
}
// ---------- DEGREE LABELS ----------

for (let degrees = 0; degrees < 360; degrees += 30) {

    const angle = (degrees / 360) * Math.PI * 2;

    const labelRadius = radius + 0.25;

    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 64;

    const context = canvas.getContext("2d");

    context.fillStyle = "white";
    context.font = "bold 24px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";

    context.fillText(
        degrees + "°",
        canvas.width / 2,
        canvas.height / 2
    );

    const texture =
        new THREE.CanvasTexture(canvas);

    const material =
        new THREE.SpriteMaterial({
            map: texture,
            transparent: true
        });

    const label =
        new THREE.Sprite(material);

    label.scale.set(0.6, 0.3, 1);

    label.position.set(
        Math.cos(angle) * labelRadius,
        pivotY + Math.sin(angle) * labelRadius,
        boardThickness / 2 + 0.08
    );

    scene.add(label);
}

// ---------- SUN ----------

// ---------- SUN ----------

const sunGeometry =
    new THREE.SphereGeometry(0.3, 32, 32);

const sunMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xffcc33,
        emissive: 0xff9900,
        emissiveIntensity: 0.5
    });

const sun =
    new THREE.Mesh(
        sunGeometry,
        sunMaterial
    );

scene.add(sun);

// ---------- SUN OBSERVATION LINE ----------

const observationMaterial =
    new THREE.LineBasicMaterial({
        color: 0xffff00
    });

const observationGeometry =
    new THREE.BufferGeometry();

const observationLine =
    new THREE.Line(
        observationGeometry,
        observationMaterial
    );

scene.add(observationLine);

// ---------- INDEX ARM ----------

// Historical length = 60 angulas.
// We use a scaled length of 2 board units.

const armLength = 2;


// Geometry
const armGeometry =
    new THREE.BoxGeometry(
        0.06,
        armLength,
        0.08
    );


// Material
const armMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xef4444
    });


// Arm
const arm =
    new THREE.Mesh(
        armGeometry,
        armMaterial
    );

// Position the arm relative to its pivot
arm.position.set(
    0,
    armLength / 2,
    0
);

// Create a pivot group
const armPivot = new THREE.Group();

armPivot.position.set(
    0,
    pivotY,
    0.12
);

armPivot.add(arm);
scene.add(armPivot);


// ---------- ALTITUDE & ARM CONTROL ----------

const altitudeSlider =
    document.getElementById("sunAltitude");

const altitudeValue =
    document.getElementById("altitudeValue");

const angleSlider =
    document.getElementById("armAngle");

const angleValue =
    document.getElementById("angleValue");


function updateSimulation(altitude) {

    // Keep both sliders synchronized
    altitudeSlider.value = altitude;
    angleSlider.value = altitude;

    // Update displayed values
    altitudeValue.textContent =
        altitude + "°";

    angleValue.textContent =
        altitude + "°";


    // Position the index arm
    const armAngle = altitude - 90;

    armPivot.rotation.z =
        THREE.MathUtils.degToRad(
            armAngle
        );


    // Position the Sun
    const sunDistance = 2;

    const sunAngle =
        THREE.MathUtils.degToRad(
            altitude
        );

    sun.position.set(
        Math.cos(sunAngle) * sunDistance,
        pivotY +
            Math.sin(sunAngle) * sunDistance,
        1.5
    );

    // Update observation line
const linePoints = [
    new THREE.Vector3(
        0,
        pivotY,
        0.2
    ),
    new THREE.Vector3(
        sun.position.x,
        sun.position.y,
        sun.position.z
    )
];

observationLine.geometry
    .setFromPoints(linePoints);

    document.getElementById("readingAltitude")
    .textContent = altitude + "°";

document.getElementById("readingArm")
    .textContent = altitude + "°";

    // ---------- HOUR ANGLE CALCULATION ----------

const latitude =
    Number(document.getElementById("latitude").value);

const declination =
    Number(document.getElementById("declination").value);

// Convert degrees to radians
const h =
    THREE.MathUtils.degToRad(altitude);

const phi =
    THREE.MathUtils.degToRad(latitude);

const delta =
    THREE.MathUtils.degToRad(declination);

// cos(H) =
// (sin(h) - sin(phi)sin(delta))
// / (cos(phi)cos(delta))

let cosH =
    (Math.sin(h) -
        Math.sin(phi) * Math.sin(delta)) /
    (Math.cos(phi) * Math.cos(delta));

 

// Check whether the Sun position is physically possible
if (cosH < -1 || cosH > 1) {

    document.getElementById("hourAngle")
        .textContent = "Not possible";

    document.getElementById("solarTime")
        .textContent = "Not possible";

    document.getElementById("ghatiReading")
        .textContent = "Not possible";

    return;
}

// Prevent tiny floating-point errors
cosH = THREE.MathUtils.clamp(
    cosH,
    -1,
    1
);

// Calculate hour angle
const H =
    Math.acos(cosH);

// Convert radians → degrees
const hourAngleDegrees =
    THREE.MathUtils.radToDeg(H);

// Convert degrees → minutes
// 15° = 1 hour = 60 minutes
const minutesFromNoon =
    hourAngleDegrees * 4;

// Convert degrees → ghaṭīs
// 360° = 60 ghaṭīs
const ghatis =
    hourAngleDegrees / 6;


// Display results
document.getElementById("hourAngle")
    .textContent =
        hourAngleDegrees.toFixed(1) + "°";

document.getElementById("solarTime")
    .textContent =
        minutesFromNoon.toFixed(0) + " min";

document.getElementById("ghatiReading")
    .textContent =
        ghatis.toFixed(1) + " ghaṭī";
}


// Sun Altitude slider
altitudeSlider.addEventListener(
    "input",
    function () {

        updateSimulation(
            Number(this.value)
        );

    }
);


// Index arm follows the observed Sun altitude
angleSlider.disabled = true;


// ---------- LATITUDE & DECLINATION ----------

// Latitude slider
document.getElementById("latitude")
    .addEventListener(
        "input",
        function () {

            document.getElementById("latitudeValue")
                .textContent = this.value + "°";

            updateSimulation(
                Number(altitudeSlider.value)
            );

        }
    );


// Declination slider
document.getElementById("declination")
    .addEventListener(
        "input",
        function () {

            document.getElementById("declinationValue")
                .textContent = this.value + "°";

            updateSimulation(
                Number(altitudeSlider.value)
            );

        }
    );


// Initial position
updateSimulation(45);


// ---------- RESET BUTTON ----------

document
    .getElementById("resetButton")
    .addEventListener(
        "click",
        function () {

            // Reset observation
            updateSimulation(45);

            // Reset latitude
            document.getElementById("latitude").value = 20;
            document.getElementById("latitudeValue")
                .textContent = "20°";

            // Reset solar declination
            document.getElementById("declination").value = 0;
            document.getElementById("declinationValue")
                .textContent = "0°";

            // Recalculate using reset values
            updateSimulation(45);

        }
    );





// ---------- WINDOW RESIZE ----------

window.addEventListener(
    "resize",
    function () {

        const container =
            document.getElementById(
                "simulation"
            );

        camera.aspect =
            container.clientWidth /
            container.clientHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );
    }
);


// ---------- ANIMATION LOOP ----------

function animate() {

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(
        scene,
        camera
    );
}

animate();