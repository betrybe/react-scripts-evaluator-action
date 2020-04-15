# react-scripts-evaluator-action
React Scripts evaluator action for Tryber projects

This action evaluate Tryber projects with [React Scripts](https://www.npmjs.com/package/react-scripts) library.

## Inputs

## Outputs

### `result`

React Scripts unit tests JSON results in base64 format.

### `pr-number`

Pull Request number that trigger build.

## Simple usage example
```yml
uses: betrybe/react-scripts-evaluator-action
```

## How to get result output
```yml
- name: React Scripts evaluator
  id: evaluator
  uses: betrybe/react-scripts-evaluator-action
- name: Next step
  uses: another-github-action
  with:
    param: ${{ steps.evaluator.outputs.result }}
```

## Project contraints

The project that want to use this action should keep a file called `requirements_mapping.json` in root folder with this structure:

```json
{
  "describe-name-1": 17,
  "describe-name-2": 36,
}
```

where `"describe-name-1"` and `"describe-name-2"` are the `describe` blocks name and `17` and `36` are the requirements identifiers.

These `describe` blocks should be:

```js
describe('describe-name-1', () => {
  it('test1');
  it('test2');
});

describe('describe-name-2', () => {
  it('test1');
  it('test2');
  it('test3');
});
```

This custom **GitHub Action** will evaluate the describe block.

## Learn about GitHub Actions

- https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-a-docker-container-action
