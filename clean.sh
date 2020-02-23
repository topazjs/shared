#!/bin/sh

if [ -d "dist" ]; then
    rm -rf "dist"
fi
mkdir -p dist

[ -f "/tmp/app-${PWD##*/}.js" ] && rm -rf "/tmp/app-${PWD##*/}.js"

exit 0
