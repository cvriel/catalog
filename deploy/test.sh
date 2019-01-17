#!/usr/bin/env bash

set -x
set -e
set -u

npm run lint
npm test
