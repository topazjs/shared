#!/bin/sh

if [ -d "dist" ]; then
    rm -rf "dist/**/*";
else
    mkdir -p dist
fi

[ -f "/tmp/app-${PWD##*/}*.js*" ] && rm -rf "/tmp/app-${PWD##*/}*.js*"

exit 0
