#!/bin/sh -l

# cp /evaluator.js /github/workspace
git clone -b feature/automatic-evaluation https://github.com/$GITHUB_REPOSITORY.git /master
rm -rf /master/.git
cp -r /master/* .
pwd
ls -lah
npm install
npm install -g react-scripts
CI=true react-scripts test --json --outputFile=evaluation.json
node /evaluator.js evaluation.json requirements_mapping.json result.json

if [ $? != 0 ]; then
  echo "Execution error"
  exit 1
fi

echo ::set-output name=result::`cat result.json | base64 -w 0`
echo ::set-output name=pr-number::$(echo "$GITHUB_REF" | awk -F / '{print $3}')
