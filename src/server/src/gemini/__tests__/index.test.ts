import { generateContent } from "../index";
import { describe, expect, it } from "bun:test";
import * as console from "node:console";

const TIMEOUT = 30000; // 30 seconds to allow the model to think

describe("generateContent", () => {
  it(
    "should call generateContent successfully",
    async () => {
      const result = await generateContent('console.log("Hello World")');
      for await (const chunk of result) {
        console.log(chunk.text);
      }
      expect(result).toBeTruthy();
    },
    TIMEOUT,
  );
});
