const fs = require("fs-extra");
const { execSync } = require("child_process");
const path = require('path');

const source = './originals/';
const dest = './frames/'

const magickTransformConfig = [
    '-resize 3000x2000^',
    '-gravity Center',
    '-crop 3000x2000+0+0 +repage',
]

function getMagickConfig(file) {
    return [
        'convert',
        path.join(source, file),
        ...magickTransformConfig,
        path.join(dest, file)
    ].join(' ');
}

function getMagickConfigWithMogrify() {
    return [
        'mogrify',
        '-verbose',
        `-path ${dest}`,
        ...magickTransformConfig,
        path.join(source, '*.jpg')
    ].join(' ');
}

(function transformFrames() {
    const isAll = process.argv[2] == "--all";

    if (isAll) {
        execSync(`./magick ${getMagickConfigWithMogrify()}`, { stdio: 'inherit' });
    }
    else {
        const originals = fs.readdirSync(source).filter((file) => file.endsWith('.jpg'));
        originals.forEach((file) => {
            console.log(`Transforming: ${file}`);
            execSync(`./magick ${getMagickConfig(file)}`);
        });
    }
})();