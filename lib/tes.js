var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

cam.position.z += 120;

document.body.appendChild(renderer.domElement);

//color material rubik
var colours = [0x009E60, 0x0051BA, 0xC41E3A, 0xFF5800, 0xFFD500, 0xFFFFFF],
    faceMaterials = colours.map(function (c) {
        return new THREE.MeshBasicMaterial({ color: c });
    }),
    cubeMaterials = new THREE.MeshFaceMaterial(faceMaterials);

let allCubes = [];

//make rubik geo
function newCube(x, y, z) {
    var cubeGeo = new THREE.BoxGeometry(3, 3, 3);
    var cube = new THREE.Mesh(cubeGeo, cubeMaterials);
    cube.matrixAutoUpdate = false;
    locate(x, y, z, 0, cube);
    scene.add(cube);
}


function locate(x, y, z, angle, cube) {
    var vector = new THREE.Vector3();

    let rMatrix = new THREE.Matrix4().makeRotationX(angle);
    let tMatrix = new THREE.Matrix4().makeTranslation(x, y, z);
    let result = new THREE.Matrix4().multiplyMatrices(rMatrix, tMatrix);

    vector.setFromMatrixPosition(result);
    cube.matrix.multiply(result);
    cube.position.set(vector.x, vector.y, vector.z);
    allCubes.push(cube);

    cube.updateMatrixWorld();
}

var rotObjectMatrix;
function rotateAroundObjectAxis(object, axis, radians) {
    var vector = new THREE.Vector3();

    rotObjectMatrix = new THREE.Matrix4();
    rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

    vector.setFromMatrixPosition(rotObjectMatrix);
    object.matrix.multiply(rotObjectMatrix);
    object.rotation.setFromRotationMatrix(object.matrix);

    object.updateMatrix();
    object.updateMatrixWorld();
}


for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        for (var k = 0; k < 3; k++) {

            var x = (i - 1) * 4;
            var y = (j - 1) * 4;
            var z = (k - 1) * 4;

            newCube(x, y, z);
        }
    }
}

let move = [];
let domove = [];
let movelist = [" L' ", " L ", " D' ", " D ", " B' ", " B ", " M1' ", " M1 ", " M2' ", " M2 ", " M3' ", " M3 ", " R' ", " R ", " U' ", " U ", " F' ", " F "]
var math;


for (var i = 0; i < 20; i++) {
    math = (Math.floor(Math.random() * 18));
    move.push(movelist[math]);
    domove.push(math);
}
document.getElementById("move").innerHTML = move;
console.log(domove);

var pivot = new THREE.Object3D(),
    activeGroup = [];

scene.add(pivot);
pivot.position.set(0, 0.0, 0.0);

let keyboard = [];
var counter = 0;
document.body.onkeydown = function (evt) {
    keyboard[evt.key] = true;
}
document.body.onkeyup = function (evt) {
    keyboard[evt.key] = false;
    counter = 0;
}
let condition = 0;

function moving(){
    while (domove.length != 0){
        condition = domove.pop()

        if (condition == 0){
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.x < 0) {
                    rotateAroundObjectAxis(allCubes[i], new THREE.Vector3(3.1, 0, 0), 90 * Math.PI / 180);
                }
            }
        }

        if (condition == 1){
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.x < 0) {
                    rotateAroundObjectAxis(allCubes[i], new THREE.Vector3(-3.1, 0, 0), 90 * Math.PI / 180);
                }
            }
        }
        
        if (condition == 2){
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.y < 0) {
                    rotateAroundObjectAxis(allCubes[i], new THREE.Vector3(0, 3.1, 0), 90 * Math.PI / 180);
                }
            }
        }

        if (condition == 3){
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.y < 0) {
                    rotateAroundObjectAxis(allCubes[i], new THREE.Vector3(0, -3.1, 0), 90 * Math.PI / 180);
                }
            }
        }

        if (condition == 4){
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.z < 0) {
                    rotateAroundObjectAxis(allCubes[i], new THREE.Vector3(0, 0, 3.1), 90 * Math.PI / 180);
                }
            }
        }

        if (condition == 5){
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.z < 0) {
                    rotateAroundObjectAxis(allCubes[i], new THREE.Vector3(0, 0, -3.1), 90 * Math.PI / 180);
                }
            }
        }

        if (condition == 6){
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.x == 0) {
                    rotateAroundObjectAxis(allCubes[i], new THREE.Vector3(3.1, 0, 0), 90 * Math.PI / 180);
                }
            }
        }

        if (condition == 7){
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.x == 0) {
                    rotateAroundObjectAxis(allCubes[i], new THREE.Vector3(-3.1, 0, 0), 90 * Math.PI / 180);
                }
            }
        }
        
        if (condition == 8){
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.y == 0) {
                    rotateAroundObjectAxis(allCubes[i], new THREE.Vector3(0, 3.1, 0), 90 * Math.PI / 180);
                }
            }
        }

        if (condition == 9){
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.y == 0) {
                    rotateAroundObjectAxis(allCubes[i], new THREE.Vector3(0, -3.1, 0), 90 * Math.PI / 180);
                }
            }
        }

        if (condition == 10){
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.z == 0) {
                    rotateAroundObjectAxis(allCubes[i], new THREE.Vector3(0, 0, 3.1), 90 * Math.PI / 180);
                }
            }
        }

        if (condition == 11){
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.z == 0) {
                    rotateAroundObjectAxis(allCubes[i], new THREE.Vector3(0, 0, -3.1), 90 * Math.PI / 180);
                }
            }
        }

        if (condition == 12){
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.x > 0) {
                    rotateAroundObjectAxis(allCubes[i], new THREE.Vector3(3.1, 0, 0), 90 * Math.PI / 180);
                }
            }
        }

        if (condition == 13){
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.x > 0) {
                    rotateAroundObjectAxis(allCubes[i], new THREE.Vector3(-3.1, 0, 0), 90 * Math.PI / 180);
                }
            }
        }
        
        if (condition == 14){
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.y > 0) {
                    rotateAroundObjectAxis(allCubes[i], new THREE.Vector3(0, 3.1, 0), 90 * Math.PI / 180);
                }
            }
        }

        if (condition == 15){
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.y > 0) {
                    rotateAroundObjectAxis(allCubes[i], new THREE.Vector3(0, -3.1, 0), 90 * Math.PI / 180);
                }
            }
        }

        if (condition == 16){
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.z > 0) {
                    rotateAroundObjectAxis(allCubes[i], new THREE.Vector3(0, 0, 3.1), 90 * Math.PI / 180);
                }
            }
        }

        if (condition == 17){
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.z > 0) {
                    rotateAroundObjectAxis(allCubes[i], new THREE.Vector3(0, 0, -3.1), 90 * Math.PI / 180);
                }
            }
        }

    }
}

function processkeyboard() {

    if (keyboard['1']) {
        if (counter < 1) {
            if (keyboard['a']) {
                domove.push(0);
                counter +=1;
            }
            else {
                domove.push(1);
                counter +=1;
            }
        }
    }

    if (keyboard['2']) {
        if (counter < 1) {
            if (keyboard['a']) {
                domove.push(2);
                counter +=1;
            }
            else {
                domove.push(3);
                counter +=1;
            }
        }
    }

    if (keyboard['3']) {
        if (counter < 1) {
            if (keyboard['a']) {
                domove.push(4);
                counter +=1;
            }
            else {
                domove.push(5);
                counter +=1;
            }
        }
    }

    if (keyboard['4']) {
        if (counter < 1) {
            if (keyboard['a']) {
                domove.push(6);
                counter +=1;
            }
            else {
                domove.push(7);
                counter +=1;
            }
        }
    }

    if (keyboard['5']) {
        if (counter < 1) {
            if (keyboard['a']) {
                domove.push(8);
                counter +=1;
            }
            else {
                domove.push(9);
                counter +=1;
            }
        }
    }

    if (keyboard['6']) {
        if (counter < 1) {
            if (keyboard['a']) {
                domove.push(10);
                counter +=1;
            }
            else {
                domove.push(11);
                counter +=1;
            }
        }
    }

    if (keyboard['7']) {
        if (counter < 1) {
            if (keyboard['a']) {
                domove.push(12);
                counter +=1;
            }
            else {
                domove.push(13);
                counter +=1;
            }
        }
    }

    if (keyboard['8']) {
        if (counter < 1) {
            if (keyboard['a']) {
                domove.push(14);
                counter +=1;
            }
            else {
                domove.push(15);
                counter +=1;
            }
        }
    }
    
    if (keyboard['9']) {
        if (counter < 1) {
            if (keyboard['a']) {
                domove.push(16);
                counter +=1;
            }
            else {
                domove.push(17);
                counter +=1;
            }
        }
    }
};


window.addEventListener("resize", function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.updateProjectionMatrix();
});

let control = new THREE.OrbitControls(cam, renderer.domElement);

let angle = 0;

let opening = 0; 
function animate() {
    if (cam.position.z != 35 && opening != 1){
        cam.position.z -= 1;
    }
    else{
        opening = 1;
    }
    moving();
    processkeyboard();
    requestAnimationFrame(animate);
    renderer.render(scene, cam);

}

animate();
