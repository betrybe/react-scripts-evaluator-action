const fs = require('fs');

const CORRECT_ANSWER_GRADE = 3;
const WRONG_ANSWER_GRADE = 1;

const checkIfPassed = (test) => (test === 'passed');

const isRequirementCorrect = (unitTests) => (
  unitTests.every(checkIfPassed) ? CORRECT_ANSWER_GRADE : WRONG_ANSWER_GRADE
);

const githubUsername = process.env.GITHUB_ACTOR || 'no_actor';
const githubRepositoryName = process.env.GITHUB_REPOSITORY || 'no_repository';

// https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
const evaluationFileContent = fs.readFileSync(process.argv[2]);
const testData = JSON.parse(evaluationFileContent);

const mappingFileContent = fs.readFileSync(process.argv[3]);
const mappingUnitTestsToRequirements = JSON.parse(mappingFileContent);

const tests = {}

testData.testResults.forEach((result) => {
  result.assertionResults.forEach((assertion) => {
    const describeName = assertion.ancestorTitles.join(' ');
    if (mappingUnitTestsToRequirements[describeName]) {
      const evals = tests[describeName] || [];
      evals.push(assertion.status);
      tests[describeName] = evals;
    }
  });
});

const evaluations = Object.keys(tests).map((key) => {
  return {
    requirement_id: mappingUnitTestsToRequirements[key],
    grade: isRequirementCorrect(tests[key])
  }
});

fs.writeFileSync(process.argv[4], JSON.stringify({
  github_username: githubUsername,
  github_repository_name: githubRepositoryName,
  evaluations: [...evaluations]
}));

process.exit();
