const agent = require('superagent');
const statusCode = require('http-status-codes');

import 'regenerator-runtime/runtime'

describe('First Api Tests', () => {
  it('Consume GET Service', async () => {
    const response = await agent.get('https://httpbin.org/ip');

    expect(response).toMatchObject({
      status: statusCode.OK,
      body: expect.objectContaining({
        origin: expect.any(String)
      })
    });
  });

  it('Consume GET Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };

    const response = await agent.get('https://httpbin.org/get').query(query);

    expect(response).toMatchObject({
      status: statusCode.OK,
      body: expect.objectContaining({
        args: query
      })
    });
  });

  it('Consume HEAD Service', async () => {
    const response = await agent.get('https://httpbin.org/response-headers?freeform=');

    expect(response).toMatchObject({
      status: statusCode.OK,
      body: expect.objectContaining({
        'Content-Length': expect.any(String)
      })
    });
  });

  it('Consume PATCH Service', async () => {
    const response = await agent.patch('https://httpbin.org/patch');

    expect(response).toMatchObject({
      status: statusCode.OK,
      body: expect.objectContaining({
        origin: expect.any(String)
      })
    });
  });

  it('Consume PUT Service', async () => {
    const response = await agent.put('https://httpbin.org/put');

    expect(response).toMatchObject({
      status: statusCode.OK,
      body: expect.objectContaining({
        origin: expect.any(String)
      })
    });
  });

  it('Consume DELETE Service', async () => {
    const response = await agent.delete('https://httpbin.org/delete');

    expect(response).toMatchObject({
      status: statusCode.OK,
      body: expect.objectContaining({
        origin: expect.any(String)
      })
    });
  });
});