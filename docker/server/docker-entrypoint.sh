#!/bin/bash

cd /var/www/cats

if [ ! -d /var/www/cats/node_modules ]; then
  npm cache clean -f  &&  npm install
fi;

npm run start:watch
