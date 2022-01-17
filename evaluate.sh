#!/bin/bash
set -x

npm install
node_modules/.bin/react-scripts test --watchAll=false --json --outputFile=/tmp/evaluation.json

node "$EVALUATOR_FILE/evaluator.js" /tmp/evaluation.json .trybe/requirements.json /tmp/result.json

if [ $? != 0 ]; then
  echo "Execution error"
  echo "$?"
  exit 1
fi

echo ::set-output name=result::`cat /tmp/result.json | base64 -w 0`
