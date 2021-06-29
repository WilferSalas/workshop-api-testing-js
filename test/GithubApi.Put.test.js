const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');

describe('Consuming PUT Methods', () => {
  it('follow aperdomob user', async () => {
    const response = await agent.put('https://api.github.com/user/following/aperdomob')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.NO_CONTENT);
  });

  it('check if the user aperdomob is being followed', async () => {
    const response = await agent.get('https://api.github.com/user/following/aperdomob')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.NO_CONTENT);
  });
});
