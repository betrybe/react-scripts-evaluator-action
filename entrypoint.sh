#!/bin/sh -l
set -x

npm install
node_modules/.bin/react-scripts test --watchAll=false --json --outputFile=evaluation.json
node /evaluator.js evaluation.json .trybe/requirements.json result.json

if [ $? != 0 ]; then
  echo "Execution error"
  exit 1
fi

echo ::set-output name=result::`cat result.json | base64 -w 0`
