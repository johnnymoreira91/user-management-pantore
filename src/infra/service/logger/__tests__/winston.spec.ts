import { describe, it, expect } from "vitest";
import Logger from "../winston";

describe("Logger", () => {
  it("deve criar uma instância de logger corretamente", () => {
    expect(Logger).toBeDefined();
    expect(Logger).toBeInstanceOf(Object);
  });

  it("deve definir níveis de log corretamente", () => {
    const expectedLevels = {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      debug: 4
    };

    expect(Logger.levels).toEqual(expectedLevels);
  });

  it("deve usar o nível de log correto no ambiente de desenvolvimento", () => {
    process.env.NODE_ENV = "development";
    expect(Logger.level).toBe("warn");
  });

  it("deve usar o nível de log correto em outros ambientes", () => {
    process.env.NODE_ENV = "production";
    expect(Logger.level).toBe("warn");
  });
});
