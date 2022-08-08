const fs = require("fs-extra");
const { execSync } = require("child_process");

function getFFMPEGConfig(fileName = 'output') {
    return [
        '-y',
        '-framerate 24',
        '-flags gray',
        '-r 4',
        '-i ./symlinks/%d.jpg',
        '-c:v libx264',
        '-pix_fmt yuv420p',
        `./output/${fileName}.mp4`
    ].join(' ');
};

function doubleSpeed(scene) {
    const newScene = [];
    for (let i = 0; i < scene.length; i++) {
        newScene.push(scene[i]);
        newScene.push(scene[i]);
    }
    return newScene;
}

const scene1 = [
    "20220412_15_ju_femke_m6_hp5_id11_1600-1",
    "20220412_15_ju_femke_m6_hp5_id11_1600-2",
    "20220412_15_ju_femke_m6_hp5_id11_1600-3",
    "20220412_15_ju_femke_m6_hp5_id11_1600-4",
    "20220412_15_ju_femke_m6_hp5_id11_1600-5",
    "20220412_15_ju_femke_m6_hp5_id11_1600-6",
    "20220412_15_ju_femke_m6_hp5_id11_1600-7",
    "20220412_15_ju_femke_m6_hp5_id11_1600-8",
    "20220412_15_ju_femke_m6_hp5_id11_1600-9",
    "20220412_15_ju_femke_m6_hp5_id11_1600-10",
    "20220412_15_ju_femke_m6_hp5_id11_1600-11",
    "20220412_15_ju_femke_m6_hp5_id11_1600-12"
]

const scene2 = [
    "20220412_12_ju_femke_m6_hp5_id11_1600-1",
    "20220412_12_ju_femke_m6_hp5_id11_1600-2",
    "20220412_12_ju_femke_m6_hp5_id11_1600-3",
    "20220412_12_ju_femke_m6_hp5_id11_1600-4",
    "20220412_12_ju_femke_m6_hp5_id11_1600-5",
    "20220412_12_ju_femke_m6_hp5_id11_1600-7",
    "20220412_12_ju_femke_m6_hp5_id11_1600-8",
    "20220412_12_ju_femke_m6_hp5_id11_1600-9"
];

const scene3 = [
    "20220412_1_ju_femke_m6_hp5_id11_1600-41",
    "20220412_1_ju_femke_m6_hp5_id11_1600-42",
    "20220412_1_ju_femke_m6_hp5_id11_1600-43",
    "20220412_1_ju_femke_m6_hp5_id11_1600-44",
    "20220412_1_ju_femke_m6_hp5_id11_1600-45",
    "20220412_1_ju_femke_m6_hp5_id11_1600-46",
    "20220412_1_ju_femke_m6_hp5_id11_1600-47",
];

const scene4 = [
    "20220412_8_ju_femke_m6_hp5_id11_800-174",
    "20220412_8_ju_femke_m6_hp5_id11_800-175",
    "20220412_8_ju_femke_m6_hp5_id11_800-176",
    "20220412_8_ju_femke_m6_hp5_id11_800-177",
    "20220412_8_ju_femke_m6_hp5_id11_800-178",
    "20220412_8_ju_femke_m6_hp5_id11_800-179",
    "20220412_8_ju_femke_m6_hp5_id11_800-180",
    "20220412_8_ju_femke_m6_hp5_id11_800-181",
    "20220412_8_ju_femke_m6_hp5_id11_800-182",
    "20220412_8_ju_femke_m6_hp5_id11_800-183",
    "20220412_8_ju_femke_m6_hp5_id11_800-184",
    "20220412_8_ju_femke_m6_hp5_id11_800-185",
    "20220412_8_ju_femke_m6_hp5_id11_800-186",
    "20220412_8_ju_femke_m6_hp5_id11_800-187",
    "20220412_8_ju_femke_m6_hp5_id11_800-188",
];

const scene = [
    ...[...scene3].reverse(),
    ...scene3,
    ...[...scene3].reverse(),
    ...scene1,
    ...scene1,
    ...scene2,
    ...[...scene2].reverse(),
    ...doubleSpeed(scene4),
];

async function createSymlinks(scene) {
    console.log("Generating symlinks...");
    await fs.remove('./symlinks');
    for (let i = 0; i < scene.length; i++) {
        await fs.ensureSymlink(`./frames/${scene[i]}.jpg`, `./symlinks/${i}.jpg`);
    }
}

(async () => {
    await createSymlinks(scene);
    execSync("ffmpeg " + getFFMPEGConfig(), { stdio: 'inherit'});
})();