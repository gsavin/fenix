#!/bin/bash

function abspath {
    if [[ -d "$1" ]]
    then
        pushd "$1" >/dev/null
        pwd
        popd > /dev/null
    elif [[ -e "$1" ]]
    then
        pushd "$(dirname "$1")" > /dev/null
        echo "$(pwd)/"
        popd > /dev/null
    else
        echo "$1 does not exist!" >&2
        return 127
    fi
}

HERE=`abspath $0`

pushd $HERE > /dev/null
npm start
popd > /dev/null
