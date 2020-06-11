var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

cam.position.z += 50;

document.body.appendChild(renderer.domElement);

//color material rubik
var colours = [0x009E60, 0x0051BA, 0xC41E3A, 0xFF5800, 0xFFD500, 0xFFFFFF],
    faceMaterials = colours.map(function (c) {
        return new THREE.MeshBasicMaterial({ color: c });
    }),
    cubeMaterials = new THREE.MeshFaceMaterial(faceMaterials);

let allCubes = [];

function removechild(group, parent) {
    for (var i = group.children.length - 1; i >= 0; i--) {
        parent.add(group.children[i]);
        group.remove(group.children[i]);
    }
}

//make rubik geo
function newCube(x, y, z) {
    var cubeGeo = new THREE.BoxGeometry(3, 3, 3);
    var cube = new THREE.Mesh(cubeGeo, cubeMaterials);
    cube.position.set(x, y, z);
    allCubes.push(cube);
    scene.add(cube);
}

for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        for (var k = 0; k < 3; k++) {

            var x = (i - 1) * 3.1;
            var y = (j - 1) * 3.1;
            var z = (k - 1) * 3.1;

            newCube(x, y, z);
        }
    }
}

var group1 = new THREE.Group();
var group2 = new THREE.Group();
var group3 = new THREE.Group();
var group4 = new THREE.Group();
var group5 = new THREE.Group();
var group6 = new THREE.Group();
var group7 = new THREE.Group();
var group8 = new THREE.Group();
var group9 = new THREE.Group();

var group = new THREE.Group();

for (var i = 0; i < 27; i++) {
    group.add(allCubes[i]);
}


let move = [];
let movelist = ['R', 'R`', 'L', 'L`', 'U', 'U`', 'D', 'D`', 'F', 'F`', 'B', 'B`', 'M1', 'M1`', 'M2', 'M2`', 'M3', 'M3`']

var math;

for (var i = 0; i < 20; i++) {
    math = (Math.floor(Math.random() * 16));
    move.push(movelist[math]);
}
document.getElementById("move").innerHTML = move;
console.log(move);

scene.add(group1);
scene.add(group2);
scene.add(group3);
scene.add(group4);
scene.add(group5);
scene.add(group6);
scene.add(group7);
scene.add(group8);
scene.add(group9);
scene.add(group);

let keyboard = [];
var counter = 0;
document.body.onkeydown = function (evt) {
    keyboard[evt.key] = true;
}
document.body.onkeyup = function (evt) {
    keyboard[evt.key] = false;
    counter = 0;
}
var axis = new THREE.Vector3(1, 0, 0);

function processkeyboard() {

    //rotate bagian kiri (L or L')

    if (keyboard['1']) {
        if (counter < 10) {

            for (var i = 0; i < 9; i++) {
                if (allCubes[i].position.x < 0) {
                    group1.add(allCubes[i]);
                }
            }

            if (keyboard['a']) {
                group1.rotation.x += Math.PI / 20;
                counter += 1;
                if (counter == 10) {
                    removechild(group1, group);
                }
            }

            else {
                group1.rotation.x -= Math.PI / 20;
                counter += 1;
                if (counter == 10) {
                    removechild(group1, group);
                }
            }

        }

    }

    //rotate bagian tengah (M or M')

    if (keyboard['2']) {


        if (counter < 10) {

            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.x == 0) {
                    group2.add(allCubes[i]);
                }
            }

            if (keyboard['a']) {
                group2.rotation.x += Math.PI / 20;
                counter += 1;
                console.log(group2);
            }

            else {
                group2.rotation.x -= Math.PI / 20;
                counter += 1;
            }
        }

        else {
        }

    }

    //rotate bagian kanan (R or R')

    if (keyboard['3']) {

        if (counter < 10) {
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.x > 0) {
                    group3.add(allCubes[i]);
                }
            }

            if (keyboard['a']) {
                group3.rotation.x += Math.PI / 20;
                counter += 1;
            }

            else {
                group3.rotation.x -= Math.PI / 20;
                counter += 1;
            }
        }

        else {
        }

    }

    //U or U'

    if (keyboard['4']) {


        if (counter < 10) {
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.y > 0) {
                    group4.add(allCubes[i]);
                }
            }

            if (keyboard['a']) {
                group4.rotation.y += Math.PI / 20;
                counter += 1;
            }

            else {
                group4.rotation.y -= Math.PI / 20;
                counter += 1;
            }
        }

        else {
        }

    }

    // middle

    if (keyboard['5']) {

        if (counter < 10) {
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.y == 0) {
                    group5.add(allCubes[i]);
                }
            }
            if (keyboard['a']) {
                group5.rotation.y += Math.PI / 20;
                counter += 1;
            }

            else {
                group5.rotation.y -= Math.PI / 20;
                counter += 1;
            }
        }

        else {
        }

    }

    //D or D'
    if (keyboard['6']) {

        if (counter < 10) {
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.y < 0) {
                    group6.add(allCubes[i]);
                }
            }
            if (keyboard['a']) {
                group6.rotation.y += Math.PI / 20;
                counter += 1;
            }

            else {
                group6.rotation.y -= Math.PI / 20;
                counter += 1;
            }
        }

        else {
        }

    }

    // F or F'
    if (keyboard['7']) {


        if (counter < 10) {
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.z > 0) {
                    group7.add(allCubes[i]);
                }
            }

            if (keyboard['a']) {
                group7.rotation.z += Math.PI / 20;
                counter += 1;
            }

            else {
                group7.rotation.z -= Math.PI / 20;
                counter += 1;
            }
        }

        else {
        }

    }

    //midle

    if (keyboard['8']) {

        if (counter < 10) {
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.z == 0) {
                    group8.add(allCubes[i]);
                }
            }
            if (keyboard['a']) {
                group8.rotation.z += Math.PI / 20;
                counter += 1;
            }

            else {
                group8.rotation.z -= Math.PI / 20;
                counter += 1;
            }
        }

        else {
        }

    }

    //B or B'
    if (keyboard['9']) {

        if (counter < 10) {
            for (var i = 0; i < 27; i++) {
                if (allCubes[i].position.z < 0) {
                    group9.add(allCubes[i]);
                }
            }
            if (keyboard['a']) {
                group9.rotation.z += Math.PI / 20;
                counter += 1;
            }

            else {
                group9.rotation.z -= Math.PI / 20;
                counter += 1;
            }
        }

        else {
        }

    }
}


window.addEventListener("resize", function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.updateProjectionMatrix();
});

let control = new THREE.OrbitControls(cam, renderer.domElement);

function animate() {
    processkeyboard();

    requestAnimationFrame(animate);
    renderer.render(scene, cam);

}

animate();
