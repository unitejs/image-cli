#!/usr/bin/env node
'use strict';

process.title = 'unite-image';

const cliMod = require('../dist/unitejs-image-cli');

const cli = new cliMod.CLI();
cli.run(process)
    .then((result) => {
        process.exit(result);
    });
