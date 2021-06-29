const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');

const username = 'WilferSalas';
const repositoryName = 'workshop-api-testing-js';
const issueNumber = 12;

describe('Consuming POST and PATCH Methods', () => {
  it('check that have at least one public repository', async () => {
    const response = await agent.get('https://api.github.com/user')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.public_repos).to.greaterThan(0);
  });

  it('check that a randon repo exist', async () => {
    const response = await agent.get('https://api.github.com/user/repos')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body[0].id).to.equals(60870742);
  });

  it('create an issue', async () => {
    const response = await agent.post(`https://api.github.com/repos/${username}/${repositoryName}/issues`, {
      owner: username,
      repo: repositoryName,
      title: 'Test'
    })
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.CREATED);
    expect(response.body.title).to.equals('Test');
  });

  it('edit an issue', async () => {
    const response = await agent.patch(`https://api.github.com/repos/${username}/${repositoryName}/issues/${issueNumber}`, {
      title: 'Changing title'
    })
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.title).to.equals('Changing title');
  });
});
