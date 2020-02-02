#!/bin/sh

for DIR in "$@"; do
    if [ -d "${DIR}" ]; then
        [ -d "${DIR}/css" ] && rm -rf "${DIR}/css/*.css*" || mkdir $DIR/css
        [ -d "${DIR}/js" ] && rm -rf "${DIR}/js/*.js*" || mkdir $DIR/js
        [ -d "${DIR}/img" ] && rm -rf "${DIR}/img/*" || mkdir $DIR/img
        [ -d "${DIR}/webfonts" ] && rm -rf "${DIR}/webfonts/*" || mkdir $DIR/webfonts
    else
        mkdir -p $DIR/css $DIR/js $DIR/img $DIR/webfonts
    fi
done

[ -d "styles" ] && rm -rf "styles/css";
mkdir -p styles/css

[ -f "/tmp/app-${PWD##*/}*.js*" ] && rm -rf "/tmp/app-${PWD##*/}*.js*"
[ -f "/tmp/styles-${PWD##*/}*.css*" ] && rm -rf "/tmp/styles-${PWD##*/}*.css*"
exit 0
