#!/usr/bin/env bash

set -x
set -e
set -u

cd /build/webconnector

npm run lint
npm test
