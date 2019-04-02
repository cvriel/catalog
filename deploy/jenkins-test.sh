#!/bin/sh

set -e
set -u
set -x

SCRIPT_DIR=$(dirname $0)
DIR=${1:-$SCRIPT_DIR}
echo $DIR

dc() {
	docker-compose -p catalog -f ${DIR}/docker-compose.yml $*
}


dc stop
dc rm --force
dc down
dc pull
dc build

dc run --rm test

dc stop
dc rm --force
dc down
