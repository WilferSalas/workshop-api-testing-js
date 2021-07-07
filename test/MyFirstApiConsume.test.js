const axios = require('axios');
const statusCode = require('http-status-codes');

import 'regenerator-runtime/runtime';

describe('First Api Tests', () => {
  it('Consume GET Service', async () => {
    const response = await axios.get('https://httpbin.org/ip');

    expect(response).toMatchObject({
      status: statusCode.OK,
      data: expect.objectContaining({
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

    const response = await axios.get('https://httpbin.org/get', { params: query });

    expect(response).toMatchObject({
      status: statusCode.OK,
      data: expect.objectContaining({
        args: query
      })
    });
  });

  it('Consume HEAD Service', async () => {
    const response = await axios.get('https://httpbin.org/response-headers?freeform=');

    expect(response).toMatchObject({
      status: statusCode.OK,
      data: expect.objectContaining({
        'Content-Length': expect.any(String)
      })
    });
  });

  it('Consume PATCH Service', async () => {
    const response = await axios.patch('https://httpbin.org/patch');

    expect(response).toMatchObject({
      status: statusCode.OK,
      data: expect.objectContaining({
        origin: expect.any(String)
      })
    });
  });

  it('Consume PUT Service', async () => {
    const response = await axios.put('https://httpbin.org/put');

    expect(response).toMatchObject({
      status: statusCode.OK,
      data: expect.objectContaining({
        origin: expect.any(String)
      })
    });
  });

  it('Consume DELETE Service', async () => {
    const response = await axios.delete('https://httpbin.org/delete');

    expect(response).toMatchObject({
      status: statusCode.OK,
      data: expect.objectContaining({
        origin: expect.any(String)
      })
    });
  });
});
