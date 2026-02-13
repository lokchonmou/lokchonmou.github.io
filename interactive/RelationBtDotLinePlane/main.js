import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.19/+esm';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f172a);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.up.set(0, 0, 1);
camera.position.set(10, -10, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Grid and Axes
const gridHelper = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
gridHelper.rotation.x = Math.PI / 2;
scene.add(gridHelper);

const axesGroup = new THREE.Group();
scene.add(axesGroup);

function updateAxes(size = 2, width = 2) {
    axesGroup.clear();
    const isDark = globalSettings.backgroundMode === 'Dark';
    const colors = isDark ? [0xff4444, 0x44ff44, 0x4444ff] : [0x991b1b, 0x166534, 0x1e40af];

    const xLine = createThickLine(colors[0], width);
    updateThickLine(xLine, new THREE.Vector3(0, 0, 0), new THREE.Vector3(size, 0, 0));
    const yLine = createThickLine(colors[1], width);
    updateThickLine(yLine, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, size, 0));
    const zLine = createThickLine(colors[2], width);
    updateThickLine(zLine, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, size));
    axesGroup.add(xLine, yLine, zLine);
}

// State management
let currentTopic = '2dLines';
let gui = new GUI();
const objects = new THREE.Group();
scene.add(objects);

const globalSettings = {
    backgroundMode: 'Sky'
};

function applyBackgroundMode() {
    const mode = globalSettings.backgroundMode;
    updateAxes(2, 2);
    if (mode === 'Dark') {
        scene.background = new THREE.Color(0x0f172a);
        gridHelper.material.color.set(0x334155);
    } else if (mode === 'Light') {
        scene.background = new THREE.Color(0xf1f5f9);
        gridHelper.material.color.set(0xcbd5e1);
    } else if (mode === 'Sky') {
        const canvas = document.createElement('canvas');
        canvas.width = 2; canvas.height = 512;
        const context = canvas.getContext('2d');
        const gradient = context.createLinearGradient(0, 0, 0, 512);
        gradient.addColorStop(0, '#3b82f6');
        gradient.addColorStop(1, '#ffffff');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 2, 512);
        scene.background = new THREE.CanvasTexture(canvas);
        gridHelper.material.color.set(0x94a3b8);
    }
}

function addEnvironmentFolder() {
    const env = gui.addFolder('環境設定');
    env.add(globalSettings, 'backgroundMode', ['Dark', 'Light', 'Sky']).name('背景模式').onChange(applyBackgroundMode);
    env.open();
}

// Topic logic map
const topics = {
    'pointLine': {
        title: '2D點與直線',
        desc: '點到直線的最短距離是通過點作直線的垂線段的長度。',
        init: initPointLine
    },
    '2dLines': {
        title: '2D 直線關係',
        desc: '在二維空間中，兩條直線可以平行、相交或重合。我們用 3D 的 XY 平面來演示。',
        init: init2DLines
    },
    '3dLines': {
        title: '3D 直線關係',
        desc: '在三維空間中，除了平行與相交，還可能出現「歪斜 (Skew)」——即不平行也不相交的關係。',
        init: init3DLines
    },
    'pointPlane': {
        title: '點與平面',
        desc: '點到平面的垂直距離是空間幾何中的基本概念。',
        init: initPointPlane
    },
    'linePlane': {
        title: '直線與平面',
        desc: '直線可以穿過平面、與平面平行，或者完全隱含在平面內。',
        init: initLinePlane
    },
    'planePlane': {
        title: '平面與平面',
        desc: '兩個平面相交會形成一條直線，或者它們彼此平行重合。',
        init: initPlanePlane
    }
};

function clearScene() {
    while (objects.children.length > 0) {
        objects.remove(objects.children[0]);
    }
    if (gui) {
        gui.destroy();
        gui = new GUI();
        addEnvironmentFolder();
    }
}

function updateUI(topicKey) {
    const topic = topics[topicKey];
    document.getElementById('current-title').textContent = topic.title;
    document.getElementById('description').textContent = topic.desc;

    document.querySelectorAll('.topic-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.topic === topicKey);
    });
}

function switchTopic(topicKey) {
    currentTopic = topicKey;
    updateUI(topicKey);
    clearScene();

    // Context-aware camera reset
    if (topicKey === 'pointLine' || topicKey === '2dLines') {
        // 2D Overhead View: x-right, y-up, z-towards camera
        camera.position.set(0, 0, 15);
        camera.up.set(0, 1, 0);
    } else {
        // 3D Perspective View: z-up
        camera.position.set(10, -10, 10);
        camera.up.set(0, 0, 1);
    }
    controls.target.set(0, 0, 0);
    camera.lookAt(0, 0, 0);
    controls.update();

    topics[topicKey].init();
}

// Helper for high-quality thick lines using Line2
function createThickLine(color, linewidth = 5, dashed = false) {
    const geometry = new LineGeometry();
    const material = new LineMaterial({
        color: color,
        linewidth: linewidth,
        dashed: dashed,
        dashSize: 0.2,
        gapSize: 0.1,
        resolution: new THREE.Vector2(window.innerWidth, window.innerHeight)
    });

    const line = new Line2(geometry, material);
    return line;
}

function updateThickLine(line, start, end) {
    const positions = [
        start.x, start.y, start.z,
        end.x, end.y, end.z
    ];
    line.geometry.setPositions(positions);
    line.computeLineDistances();
}

// --- Topic Initializers ---

function initPointLine() {
    const params = { px: 2, py: 3, m: 1, c: 0 };
    const line = createThickLine(0x6366f1);
    const point = new THREE.Mesh(new THREE.SphereGeometry(0.12), new THREE.MeshBasicMaterial({ color: 0xff4444 }));
    const connector = createThickLine(0xffffff, 2, true);
    const projMarker = new THREE.Mesh(new THREE.SphereGeometry(0.08), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    objects.add(line, point, connector, projMarker);

    function update() {
        const pX = params.px, pY = params.py;
        const m = params.m, c = params.c;

        // Line: mx - y + c = 0
        // Line rendering on XY plane (z=0)
        updateThickLine(line, new THREE.Vector3(-10, m * -10 + c, 0), new THREE.Vector3(10, m * 10 + c, 0));
        point.position.set(pX, pY, 0);

        // Projection:
        // x' = (x + m*y - m*c) / (m*m + 1)
        // y' = (m*x + m*m*y + c) / (m*m + 1)
        const denom = m * m + 1;
        const pXPrime = (pX + m * pY - m * c) / denom;
        const pYPrime = (m * pX + m * m * pY + c) / denom;
        const projPoint = new THREE.Vector3(pXPrime, pYPrime, 0);

        projMarker.position.copy(projPoint);
        updateThickLine(connector, point.position, projPoint);

        const dist = Math.abs(m * pX - pY + c) / Math.sqrt(denom);
        document.getElementById('math-display').innerHTML = `
            直線方程: y = ${m.toFixed(2)}x + ${c.toFixed(2)}<br>
            點 P: (${pX.toFixed(2)}, ${pY.toFixed(2)})<br>
            <b>最短距離: ${dist.toFixed(2)}</b>
        `;
    }

    gui.add(params, 'px', -5, 5).name('點 Px').onChange(update);
    gui.add(params, 'py', -5, 5).name('點 Py').onChange(update);
    gui.add(params, 'm', -5, 5).name('斜率 m').onChange(update);
    gui.add(params, 'c', -5, 5).name('截距 c').onChange(update);
    update();
}

function init2DLines() {
    const params = {
        m1: 1, c1: 0,
        m2: -1, c2: 2
    };

    const line1 = createThickLine(0x6366f1);
    const line2 = createThickLine(0xf59e0b);
    objects.add(line1, line2);

    function update() {
        // 2D lines now on the XY plane (Z=0)
        const s1 = new THREE.Vector3(-10, params.m1 * -10 + params.c1, 0);
        const e1 = new THREE.Vector3(10, params.m1 * 10 + params.c1, 0);
        updateThickLine(line1, s1, e1);

        const s2 = new THREE.Vector3(-10, params.m2 * -10 + params.c2, 0);
        const e2 = new THREE.Vector3(10, params.m2 * 10 + params.c2, 0);
        updateThickLine(line2, s2, e2);

        const isParallel = Math.abs(params.m1 - params.m2) < 0.01;
        const isCoincident = isParallel && Math.abs(params.c1 - params.c2) < 0.01;

        let status = isCoincident ? "重合 (Coincident)" : (isParallel ? "平行 (Parallel)" : "相交 (Intersecting)");
        document.getElementById('math-display').innerHTML = `L1: y = ${params.m1.toFixed(1)}x + ${params.c1.toFixed(1)}<br>L2: y = ${params.m2.toFixed(1)}x + ${params.c2.toFixed(1)}<br><b>狀態: ${status}</b>`;
    }

    gui.add(params, 'm1', -5, 5).name('L1 斜率 (m1)').onChange(update);
    gui.add(params, 'c1', -5, 5).name('L1 截距 (c1)').onChange(update);
    gui.add(params, 'm2', -5, 5).name('L2 斜率 (m2)').onChange(update);
    gui.add(params, 'c2', -5, 5).name('L2 截距 (c2)').onChange(update);
    update();
}

function init3DLines() {
    const params = {
        x1: -2, y1: 0, z1: 0, dx1: 1, dy1: 1, dz1: 0,
        x2: 2, y2: 0, z2: 0, dx2: -1, dy2: 1, dz2: 1
    };

    const line1 = createThickLine(0x6366f1);
    const line2 = createThickLine(0xf59e0b);
    objects.add(line1, line2);

    const marker1 = new THREE.Mesh(new THREE.SphereGeometry(0.08), new THREE.MeshBasicMaterial({ color: 0xff4444 }));
    const marker2 = new THREE.Mesh(new THREE.SphereGeometry(0.08), new THREE.MeshBasicMaterial({ color: 0xff4444 }));
    const connector = createThickLine(0xffffff, 2, true);
    objects.add(marker1, marker2, connector);

    function update() {
        const p1 = new THREE.Vector3(params.x1, params.y1, params.z1);
        const d1 = new THREE.Vector3(params.dx1, params.dy1, params.dz1).normalize();
        const p2 = new THREE.Vector3(params.x2, params.y2, params.z2);
        const d2 = new THREE.Vector3(params.dx2, params.dy2, params.dz2).normalize();

        updateThickLine(line1, p1.clone().addScaledVector(d1, -10), p1.clone().addScaledVector(d1, 10));
        updateThickLine(line2, p2.clone().addScaledVector(d2, -10), p2.clone().addScaledVector(d2, 10));

        const n = new THREE.Vector3().crossVectors(d1, d2);
        const isParallel = n.length() < 0.001;
        let status = "", dist = 0;

        if (isParallel) {
            dist = new THREE.Vector3().subVectors(p2, p1).clone().projectOnPlane(d1).length();
            status = dist < 0.01 ? "重合 (Coincident)" : "平行 (Parallel)";
            marker1.visible = marker2.visible = connector.visible = false;
        } else {
            dist = Math.abs(new THREE.Vector3().subVectors(p2, p1).dot(n.clone().normalize()));
            const r = new THREE.Vector3().subVectors(p2, p1);
            const a = d1.dot(d1), b = d1.dot(d2), e = d2.dot(d2), d = d1.dot(r), f = d2.dot(r);
            const det = a * e - b * b;
            const s = (e * d - b * f) / det;
            const t = (b * d - a * f) / det;
            const cp1 = p1.clone().addScaledVector(d1, s);
            const cp2 = p2.clone().addScaledVector(d2, t);
            marker1.position.copy(cp1); marker2.position.copy(cp2);
            updateThickLine(connector, cp1, cp2);
            status = dist < 0.01 ? "相交 (Intersecting)" : "歪斜 (Skew)";
            marker1.visible = marker2.visible = connector.visible = dist >= 0.01;
        }

        document.getElementById('math-display').innerHTML = `
            L1: P1(${params.x1},${params.y1},${params.z1}) + s(${params.dx1},${params.dy1},${params.dz1})<br>
            L2: P2(${params.x2},${params.y2},${params.z2}) + t(${params.dx2},${params.dy2},${params.dz2})<br>
            距離: ${dist.toFixed(2)}<br><b>狀態: ${status}</b>
        `;
    }

    const f1 = gui.addFolder('直線 1');
    f1.add(params, 'x1', -5, 5).onChange(update); f1.add(params, 'y1', -5, 5).name('方向 y (前)').onChange(update); f1.add(params, 'z1', -5, 5).name('方向 z (天)').onChange(update);
    f1.add(params, 'dx1', -2, 2).name('方向 x').onChange(update); f1.add(params, 'dy1', -2, 2).name('方向 y').onChange(update); f1.add(params, 'dz1', -2, 2).name('方向 z').onChange(update);
    const f2 = gui.addFolder('直線 2');
    f2.add(params, 'x2', -5, 5).onChange(update); f2.add(params, 'y2', -5, 5).name('方向 y (前)').onChange(update); f2.add(params, 'z2', -5, 5).name('方向 z (天)').onChange(update);
    f2.add(params, 'dx2', -2, 2).name('方向 x').onChange(update); f2.add(params, 'dy2', -2, 2).name('方向 y').onChange(update); f2.add(params, 'dz2', -2, 2).name('方向 z').onChange(update);
    update();
}

function initLinePlane() {
    const params = {
        px: 0, py: 0, pz: 5,
        dx: 1, dy: 1, dz: -0.5,
        planeZ: 0, planeNormalX: 0, planeNormalY: 0,
        showProjection: false
    };

    const line = createThickLine(0x6366f1);
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshPhongMaterial({ color: 0x1e293b, transparent: true, opacity: 0.6, side: THREE.DoubleSide }));
    const marker = new THREE.Mesh(new THREE.SphereGeometry(0.1), new THREE.MeshBasicMaterial({ color: 0x10b981 }));

    // Projection group
    const projectionGroup = new THREE.Group();
    const projLine = createThickLine(0x10b981, 2, true); // Dashed projection line on plane
    objects.add(line, plane, marker, projectionGroup, projLine);

    function createProjPoint() {
        const group = new THREE.Group();
        const p = new THREE.Mesh(new THREE.SphereGeometry(0.08), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
        const connector = createThickLine(0xffffff, 2, true);
        const c1 = createThickLine(0x10b981, 2);
        const c2 = createThickLine(0x10b981, 2);
        group.add(p, connector, c1, c2);
        return { group, p, connector, c1, c2 };
    }

    const projPoints = [createProjPoint(), createProjPoint(), createProjPoint()];
    projPoints.forEach(pp => projectionGroup.add(pp.group));

    function update() {
        const pVal = new THREE.Vector3(params.px, params.py, params.pz);
        const dVal = new THREE.Vector3(params.dx, params.dy, params.dz).normalize();
        if (dVal.lengthSq() === 0) dVal.set(0, 0, -1);

        updateThickLine(line, pVal.clone().addScaledVector(dVal, -10), pVal.clone().addScaledVector(dVal, 10));

        const n = new THREE.Vector3(params.planeNormalX, params.planeNormalY, 1).normalize();
        const planePos = new THREE.Vector3(0, 0, params.planeZ);
        plane.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n);
        plane.position.copy(planePos);

        const denom = dVal.dot(n);
        let status = "";
        const planeD = n.dot(planePos);

        if (Math.abs(denom) < 0.001) {
            const dist = Math.abs(pVal.dot(n) - planeD);
            status = dist < 0.01 ? "在此平面內 (Contained)" : "與平面平行 (Parallel)";
            marker.visible = false;
        } else {
            const t = (planeD - pVal.dot(n)) / denom;
            marker.position.copy(pVal.clone().addScaledVector(dVal, t));
            marker.visible = true;
            status = "穿過平面 (Intersecting)";
        }

        const angleRad = Math.asin(Math.abs(dVal.dot(n)));
        const angleDeg = (angleRad * 180 / Math.PI).toFixed(1);

        projectionGroup.visible = params.showProjection;
        projLine.visible = params.showProjection;
        if (params.showProjection) {
            const tValues = [-10, 0, 10]; // Use full line span for projection line
            const projLinePoints = [];

            projPoints.forEach((pp, i) => {
                const sampleT = i === 0 ? -5 : (i === 1 ? 0 : 5);
                const pointOnLine = pVal.clone().addScaledVector(dVal, sampleT);
                const distToPlane = pointOnLine.dot(n) - planeD;
                const projPoint = pointOnLine.clone().addScaledVector(n, -distToPlane);

                pp.p.position.copy(projPoint);
                updateThickLine(pp.connector, pointOnLine, projPoint);

                const tangent = n.x < 0.9 ? new THREE.Vector3(1, 0, 0).cross(n).normalize() : new THREE.Vector3(0, 1, 0).cross(n).normalize();
                const bitangent = n.clone().cross(tangent).normalize();
                updateThickLine(pp.c1, projPoint.clone().addScaledVector(tangent, -0.5), projPoint.clone().addScaledVector(tangent, 0.5));
                updateThickLine(pp.c2, projPoint.clone().addScaledVector(bitangent, -0.5), projPoint.clone().addScaledVector(bitangent, 0.5));
            });

            // Update the central projection line on the plane
            const startProj = pVal.clone().addScaledVector(dVal, -10).addScaledVector(n, -(pVal.clone().addScaledVector(dVal, -10).dot(n) - planeD));
            const endProj = pVal.clone().addScaledVector(dVal, 10).addScaledVector(n, -(pVal.clone().addScaledVector(dVal, 10).dot(n) - planeD));
            updateThickLine(projLine, startProj, endProj);
        }

        document.getElementById('math-display').innerHTML = `
            平面法向: (${n.x.toFixed(2)},${n.y.toFixed(2)},${n.z.toFixed(2)})<br>
            直線方向: (${dVal.x.toFixed(2)},${dVal.y.toFixed(2)},${dVal.z.toFixed(2)})<br>
            線面夾角: ${angleDeg}°<br>
            <b>狀態: ${status}</b>
        `;
    }

    const fl = gui.addFolder('直線');
    fl.add(params, 'px', -5, 5).name('點 Px').onChange(update);
    fl.add(params, 'py', -5, 5).name('點 Py (前)').onChange(update);
    fl.add(params, 'pz', -5, 5).name('點 Pz (天)').onChange(update);
    fl.add(params, 'dx', -1, 1).name('方向 x').onChange(update);
    fl.add(params, 'dy', -1, 1).name('方向 y').onChange(update);
    fl.add(params, 'dz', -1, 1).name('方向 z').onChange(update);
    fl.add(params, 'showProjection').name('顯示投影').onChange(update);

    const fp = gui.addFolder('平面');
    fp.add(params, 'planeZ', -5, 5).name('平面 z 位置').onChange(update);
    fp.add(params, 'planeNormalX', -1, 1).onChange(update);
    fp.add(params, 'planeNormalY', -1, 1).onChange(update);

    update();
}

function initPointPlane() {
    const params = { px: 2, py: 2, pz: 3, planeZ: 0, planeNormalX: 0, planeNormalY: 0 };
    const point = new THREE.Mesh(new THREE.SphereGeometry(0.1), new THREE.MeshBasicMaterial({ color: 0x6366f1 }));
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshPhongMaterial({ color: 0x1e293b, transparent: true, opacity: 0.6, side: THREE.DoubleSide }));
    const projection = new THREE.Mesh(new THREE.SphereGeometry(0.08), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
    const connector = createThickLine(0xffffff, 2, true);

    // Projection cross lines
    const cross1 = createThickLine(0x10b981, 2);
    const cross2 = createThickLine(0x10b981, 2);
    objects.add(point, plane, projection, connector, cross1, cross2);

    function update() {
        const p = new THREE.Vector3(params.px, params.py, params.pz);
        point.position.copy(p);
        const n = new THREE.Vector3(params.planeNormalX, params.planeNormalY, 1).normalize();
        const planePos = new THREE.Vector3(0, 0, params.planeZ);
        const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), n);
        plane.quaternion.copy(q);
        plane.position.copy(planePos);

        const planeD = n.dot(planePos);
        const dist = p.dot(n) - planeD;
        const projPoint = p.clone().addScaledVector(n, -dist);
        projection.position.copy(projPoint);
        updateThickLine(connector, p, projPoint);

        // Update cross lines at projection point
        const tangent = n.x < 0.9 ? new THREE.Vector3(1, 0, 0).cross(n).normalize() : new THREE.Vector3(0, 1, 0).cross(n).normalize();
        const bitangent = n.clone().cross(tangent).normalize();
        updateThickLine(cross1, projPoint.clone().addScaledVector(tangent, -1), projPoint.clone().addScaledVector(tangent, 1));
        updateThickLine(cross2, projPoint.clone().addScaledVector(bitangent, -1), projPoint.clone().addScaledVector(bitangent, 1));

        document.getElementById('math-display').innerHTML = `點 P: (${params.px},${params.py},${params.pz})<br>平面法向: (${n.x.toFixed(2)},${n.y.toFixed(2)},${n.z.toFixed(2)})<br><b>距離: ${Math.abs(dist).toFixed(2)}</b>`;
    }
    gui.add(params, 'px', -5, 5).onChange(update);
    gui.add(params, 'py', -5, 5).name('Py (前)').onChange(update);
    gui.add(params, 'pz', -5, 5).name('Pz (天)').onChange(update);
    gui.add(params, 'planeZ', -5, 5).name('平面 z 位置').onChange(update);
    gui.add(params, 'planeNormalX', -1, 1).onChange(update);
    gui.add(params, 'planeNormalY', -1, 1).onChange(update);
    update();
}

function initPlanePlane() {
    const params = {
        z1: 1, nx1: 0.5, ny1: 0,
        z2: -1, nx2: 0, ny2: 0.5,
        makeParallel: function () {
            params.nx2 = params.nx1;
            params.ny2 = params.ny1;
            gui.controllersRecursive().forEach(c => {
                if (c.property === 'nx2' || c.property === 'ny2') c.updateDisplay();
            });
            update();
        }
    };
    const p1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshPhongMaterial({ color: 0x6366f1, transparent: true, opacity: 0.5, side: THREE.DoubleSide }));
    const p2 = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshPhongMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.5, side: THREE.DoubleSide }));
    const interLine = createThickLine(0xffffff, 8);
    const angleLine1 = createThickLine(0x6366f1, 4);
    const angleLine2 = createThickLine(0xf59e0b, 4);
    objects.add(p1, p2, interLine, angleLine1, angleLine2);

    function update() {
        const n1 = new THREE.Vector3(params.nx1, params.ny1, 1).normalize();
        const pos1 = new THREE.Vector3(0, 0, params.z1);
        p1.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n1);
        p1.position.copy(pos1);
        const n2 = new THREE.Vector3(params.nx2, params.ny2, 1).normalize();
        const pos2 = new THREE.Vector3(0, 0, params.z2);
        p2.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n2);
        p2.position.copy(pos2);

        const cross = new THREE.Vector3().crossVectors(n1, n2);
        const isParallel = cross.length() < 0.01;
        let status = "";
        if (isParallel) {
            const dist = Math.abs(new THREE.Vector3().subVectors(pos2, pos1).dot(n1));
            status = dist < 0.01 ? "重合 (Coincident)" : "平行 (Parallel)";
            interLine.visible = angleLine1.visible = angleLine2.visible = false;
        } else {
            status = "相交 (Intersecting)";
            interLine.visible = angleLine1.visible = angleLine2.visible = true;

            // Planes: n1.x*x + n1.y*y + n1.z*z = d1
            const d1 = n1.dot(pos1), d2 = n2.dot(pos2);
            const dir = cross.clone().normalize();
            // Find point on line closest to origin using Lagrange multipliers or projection
            const dot11 = n1.dot(n1), dot12 = n1.dot(n2), dot22 = n2.dot(n2);
            const det = dot11 * dot22 - dot12 * dot12;
            const c1 = (d1 * dot22 - d2 * dot12) / det;
            const c2 = (d2 * dot11 - d1 * dot12) / det;
            const pointOnLine = n1.clone().multiplyScalar(c1).add(n2.clone().multiplyScalar(c2));

            updateThickLine(interLine, pointOnLine.clone().addScaledVector(dir, -10), pointOnLine.clone().addScaledVector(dir, 10));

            const v1 = dir.clone().cross(n1).normalize();
            const v2 = dir.clone().cross(n2).normalize();
            updateThickLine(angleLine1, pointOnLine, pointOnLine.clone().addScaledVector(v1, 2));
            updateThickLine(angleLine2, pointOnLine, pointOnLine.clone().addScaledVector(v2, 2));
        }
        const angle = (Math.acos(Math.abs(n1.dot(n2))) * 180 / Math.PI).toFixed(1);
        document.getElementById('math-display').innerHTML = `平面夾角 (Angle): ${angle}°<br><b>狀態: ${status}</b>`;
    }
    const f1 = gui.addFolder('平面 1');
    f1.add(params, 'z1', -5, 5).name('z 位置').onChange(update); f1.add(params, 'nx1', -1, 1).onChange(update); f1.add(params, 'ny1', -1, 1).onChange(update);
    const f2 = gui.addFolder('平面 2');
    f2.add(params, 'z2', -5, 5).name('z 位置').onChange(update); f2.add(params, 'nx2', -1, 1).onChange(update); f2.add(params, 'ny2', -1, 1).onChange(update);
    gui.add(params, 'makeParallel').name('令平面 2 平行平面 1');
    update();
}

// --- Event Listeners ---

document.querySelectorAll('.topic-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTopic(btn.dataset.topic));
});

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

    // Update line resolution
    scene.traverse(obj => {
        if (obj.material && obj.material.isLineMaterial) {
            obj.material.resolution.set(width, height);
        }
    });
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Start
switchTopic('pointLine');
applyBackgroundMode();
animate();
