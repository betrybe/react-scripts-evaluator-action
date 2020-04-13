const execSync = require('child_process').execSync;
const fs = require('fs');

const buildPath = (absolutePath, filePath) => (`${absolutePath}/${filePath}`);

describe('Evaluator', () => {
  it('', () => {
    const pwd = execSync('pwd').toString().replace('\n', '');

    const evaluatorFile = buildPath(pwd, 'evaluator.js');
    const reactScriptOutputFile = buildPath(pwd, 'tests/react-scripts-output.json');
    const requirementsMappingFile = buildPath(pwd, 'tests/requirements_mapping.json');
    const resultFile = buildPath(pwd, 'tests/result.json');

    const expectedResultJson = {
      github_username: 'no_actor',
      github_repository_name: 'no_repository',
      evaluations: [{
        requirement_id: 1,
        grade: 1,
      }, {
        requirement_id: 2,
        grade: 3
      }]
    }

    execSync(`node ${evaluatorFile} ${reactScriptOutputFile} ${requirementsMappingFile} ${resultFile}`);

    const evaluationFileContent = fs.readFileSync(resultFile);
    const resultJson = JSON.parse(evaluationFileContent);

    expect(resultJson).toMatchObject(expectedResultJson);
  });
});
