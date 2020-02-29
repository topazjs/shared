#!/bin/sh

if [ -d "dist" ]; then
    rm -rf "dist"
    rm -rf "lib"
    rm -rf "es"
fi
mkdir -p dist lib es

[ -f "/tmp/app-${PWD##*/}.js" ] && rm -rf "/tmp/app-${PWD##*/}.js"

exit 0
