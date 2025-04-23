import { describe, expect, it } from 'bun:test';
import app from '../index';

describe('Server', () => {
  it('responds with "Hello Hono!" for the root route', async () => {
    const req = new Request('http://localhost/');
    const res = await app.fetch(req);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('Hello Hono!');
  });
});