# react-scripts-evaluator-action
React Scripts evaluator action for Tryber projects

This action evaluate Tryber projects with [React Scripts](https://www.npmjs.com/package/react-scripts) library.

## Inputs

- `pr_author_username`

  **Required**

  Pull Request author username.

## Outputs

### `result`

React Scripts unit tests JSON results in base64 format.

## Usage example

```yml
- name: Fetch React Scripts evaluator
  uses: actions/checkout@v2
  with:
    repository: betrybe/react-scripts-evaluator-action
    ref: v6
    token: ${{ secrets.GIT_HUB_PAT }}
    path: .github/actions/react-scripts-evaluator

- name: Run Stryker evaluation
  id: evaluator
  uses: ./.github/actions/stryker-evaluator
  with:
    pr_author_username: ${{ github.event.inputs.pr_author_username }}
```

## How to get result output
```yml
- name: Run React Scripts evaluation
  id: evaluator
  uses: ./.github/actions/react-scripts-evaluator
  with:
    pr_author_username: ${{ github.event.inputs.pr_author_username }}

- name: Next step
  uses: another-github-action
  with:
    param: ${{ steps.evaluator.outputs.result }}
```

## Project contraints

The project that want to use this action should implement unit tests grouping them using `describe` statements.
Each `describe` statement will be mapped to a requirement.

Example:

```javascript
describe('requirement #1' () => {
  it('unit test1', () => {});
  it('unit test2', () => {});
  it('unit test3', () => {});
});

describe('requirement #2' () => {
  it('unit test1', () => {});
  it('unit test2', () => {});
  it('unit test3', () => {});
});

describe('requirement #3' () => {
  it('unit test1', () => {});
  it('unit test2', () => {});
  it('unit test3', () => {});
});
```

Project repository must create a file called `requirements.json` inside `.trybe` folder.

This file should have the following structure:

```json
{
  "requirements": [{
    "description": "requirement #1",
    "bonus": false
  }, {
    "description": "requirement #2",
    "bonus": true
  }, {
    "description": "requirement #3",
    "bonus": false
  }]
}
```

where the `"requirement #1"`, `"requirement #2"` and `"requirement #3"` are the requirements and describes names.
