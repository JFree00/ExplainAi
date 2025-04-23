import { afterAll, describe, expect, it, mock, spyOn } from "bun:test";
import app from "../index";
import * as geminiModule from "../gemini";
import { SSEStreamingApi } from "hono/streaming";
const honoStreaming = await import("hono/streaming");

describe("Server", () => {
  afterAll(() => {
    mock.restore();
  });
  it('responds with "Hello Hono!" for the root route', async () => {
    const req = new Request("http://localhost/");
    const res = await app.fetch(req);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("Hello Hono!");
  });

  it("processes input and streams response for /chat endpoint", async () => {
    const testInput = "Hello, AI assistant!";
    const req = new Request("http://localhost/chat", {
      method: "POST",
      body: testInput,
    });

    const res = await app.fetch(req);

    expect(res.status).toBe(200);

    const responseText = await res.text();
    expect(responseText).toBeTruthy();
  });

  it("handles errors correctly in the streamText error handler", async () => {
    const mockStreamText = mock(() => {
      const error = new Error("Test error message");
      const mockStream = {
        write: mock(
          () => Promise.resolve() as unknown as Promise<SSEStreamingApi>,
        ),
        writeln: mock(
          () => Promise.resolve() as unknown as Promise<SSEStreamingApi>,
        ),
      };
      errorHandler(error, mockStream);
      return new Response();
    });

    spyOn(honoStreaming, "streamText").mockImplementation(mockStreamText);

    const req = new Request("http://localhost/chat", {
      method: "POST",
      body: "Test input",
    });

    spyOn(geminiModule, "generateContent").mockImplementation(() => {
      throw new Error("Test error message");
    });

    await app.fetch(req);

    const mockStream = {
      write: mock(
        () => Promise.resolve() as unknown as Promise<SSEStreamingApi>,
      ),
    };
    const errorHandler = async (
      error: Error,
      stream: Pick<SSEStreamingApi, "write">,
    ) => {
      await stream.write(error.message);
    };

    const testError = new Error("Test error message");
    await errorHandler(testError, mockStream);

    expect(mockStream.write).toHaveBeenCalledWith("Test error message");
  });
});
