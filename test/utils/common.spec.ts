import {
  debounce,
  formatDateTime,
  formatTime,
  getKeys,
  getStyle,
  throttle,
} from "../../src/lib/utils/common";
import { it, expect, describe, vi } from "vitest";
import { JSDOM } from "jsdom";

describe("debounce", () => {
  vi.useFakeTimers();
  it.concurrent("should be called once", () => {
    const test = vi.fn();
    const run = debounce(test, 200);
    run(1);
    run(2);
    vi.runAllTimers();
    expect(test).toBeCalledTimes(1);
    expect(test).toBeCalledWith(2);
  });

  it.concurrent("should be called twice", () => {
    const test = vi.fn();
    const run = debounce(test, 200, true);
    run(1);
    run(2);
    vi.runAllTimers();
    expect(test).toBeCalledTimes(2);
    expect(test).toBeCalledWith(2);
  });
});

describe("throttle", () => {
  vi.useFakeTimers();
  it("should be called once", () => {
    const test = vi.fn();
    const run = throttle(test, 200);
    run(1);
    run(2);
    vi.runAllTimers();
    expect(test).toBeCalledTimes(1);
    expect(test).toBeCalledWith(1);
  });

  it("should be called twice", () => {
    const test = vi.fn();
    const run = throttle(test, 1000, true);
    run(1);
    run(2);
    vi.runAllTimers();
    expect(test).toBeCalledTimes(2);
    expect(test).toBeCalledWith(2);
  });
});

describe("formatDateTime", () => {
  it.concurrent("should return a date with default format", () => {
    const date = new Date("2019-01-01 00:00:00");
    const result = formatDateTime(date);
    expect(result).toBe("2019-01-01 00:00:00");
  });

  it.concurrent("should return a date with YYYY-MM-DD", () => {
    const date = new Date("2019-01-01 00:00:00");
    const result = formatDateTime(date, "YYYY-MM-DD");
    expect(result).toBe("2019-01-01");
  });

  it.concurrent("should return a date with HH:mm:ss", () => {
    const date = new Date("2019-01-01 00:00:00");
    const result = formatDateTime(date, "HH:mm:ss");
    expect(result).toBe("00:00:00");
  });

  it.concurrent("should return the original string value", () => {
    expect(formatDateTime("aaa")).toBe("aaa");
  });

  it.concurrent("should in normal operation", () => {
    expect(formatDateTime("2019/01/01 00:00:00")).toBe("2019-01-01 00:00:00");
  });
});

describe("getKeys", () => {
  it.concurrent("should return an array of key values", () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(getKeys(obj)).toStrictEqual(["a", "b", "c"]);
  });

  it.concurrent("should return an array of indexes", () => {
    expect(getKeys([1, 2, 3])).toStrictEqual(["0", "1", "2"]);
  });
});

describe("formatTime", () => {
  it.concurrent("should return a string with the number rounded down", () => {
    expect(formatTime(192.6)).toBe("3:12");
  });

  it.concurrent("should return a string with the number rounded up", () => {
    expect(formatTime(192.6, true)).toBe("3:13");
  });
});

describe("getComputedStyle", () => {
  const dom = new JSDOM(
    `<!DOCTYPE html><html></html><body><div style="width: 125px; overflow: hidden;"></div></body>`
  );
  const ele = dom.window.document.querySelector("div");
  it.concurrent("should return a string", () => {
    expect(getStyle(ele!, "overflow")).toBe("hidden");
  });

  it.concurrent("should return a number", () => {
    expect(getStyle(ele!, "width")).toBe(125);
  });
});
