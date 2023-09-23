#!/usr/bin/env node

const fs = require('fs');
const https = require('https');
const path = require('path');
const shell = require('shelljs');
const {execSync} = require('child_process');

function getLatestVersion() {
    return new Promise((resolve, reject) => {
        https.get('https://registry.npmjs.org/@grace-js/grace', (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                const jsonData = JSON.parse(data);
                const latestVersion = jsonData['dist-tags'].latest;
                resolve(latestVersion);
            });
        }).on("error", (err) => {
            reject(err);
        });
    });
}

function createPackageJSON(latestVersion) {
    const packageContent = {
        name: 'grace-js-app',
        version: '1.0.0',
        main: 'src/index.ts',
        scripts: {
            start: 'bun run src/index.ts',
            dev: 'bun run --watch src/index.ts'
        },
        dependencies: {
            '@grace-js/grace': latestVersion
        }
    };

    fs.writeFileSync('package.json', JSON.stringify(packageContent, null, 4));
}

function copyFilesAndFolders() {
    const srcPath = path.join(__dirname, '../template');

    shell.cp('-R', srcPath, './');
}

async function main() {
    try {
        const latestVersion = await getLatestVersion();
        createPackageJSON(latestVersion);
        copyFilesAndFolders();

        console.log('Project created successfully!');
    } catch (e) {
        console.error(e);
    }
}

main();
