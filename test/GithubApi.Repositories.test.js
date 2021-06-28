const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');

describe('Consuming GET Methods', () => {
  it('check the user name, company and location', async () => {
    const response = await agent.get('https://api.github.com/users/aperdomob')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.name).equal('Alejandro Perdomo');
    expect(response.body.company).equal('Perficient Latam');
    expect(response.body.location).equal('Colombia');
  });

  it('check if jasmine-awesome-report repo exist', async () => {
    const response = await agent.get('https://api.github.com/users/aperdomob/repos')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    const repo = response.body.find((repos) => repos.name === 'jasmine-awesome-report');

    expect(response.status).to.equal(statusCode.OK);
    expect(repo.full_name).equal('aperdomob/jasmine-awesome-report');
    expect(repo.private).equal(false);
    expect(repo.description).equal('An awesome html report for Jasmine');
  });

  it('download jasmine-awesome-report repository', async () => {
    const response = await agent.get('https://api.github.com/repos/aperdomob/jasmine-awesome-report/zipball/master')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    expect(response).to.have.property('buffered');
  });

  it('list all files in jasmine-awesome-report repository and find the README.md', async () => {
    const response = await agent.get('https://api.github.com/repos/aperdomob/jasmine-awesome-report/contents')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    const readmeFile = response.body.find((file) => file.name === 'README.md');

    expect(response.status).to.equal(statusCode.OK);
    expect(readmeFile.path).equal('README.md');
    expect(readmeFile.sha).equal('1eb7c4c6f8746fcb3d8767eca780d4f6c393c484');
  });

  it('download the README.md file', async () => {
    const response = await agent.get('https://api.github.com/repos/aperdomob/jasmine-awesome-report/contents/README.md')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.encoding).equal('base64');
  });
});
