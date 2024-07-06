// verifyToken.test.js

import verifyToken from "../src/helpers/verify";

describe("verifyToken function", () => {
  const mockToken = "mockToken";
  const mockData = { token: true };

  beforeEach(() => {
    // Mock localStorage.getItem
    jest
      .spyOn(window.localStorage.__proto__, "getItem")
      .mockReturnValue(mockToken);

    // Mock fetch
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the token when verification succeeds", async () => {
    const result = await verifyToken();

    expect(window.localStorage.getItem).toHaveBeenCalledWith("token");
    expect(fetch).toHaveBeenCalledWith("http://localhost:5001/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mockToken}`,
      },
    });
    expect(result).toEqual(mockData.token);
  });

  it("should return false if no token is found in localStorage", async () => {
    // Reset the mock to simulate no token in localStorage
    window.localStorage.__proto__.getItem.mockReturnValueOnce(null);

    const result = await verifyToken();

    expect(fetch).not.toHaveBeenCalled(); // fetch should not be called
    expect(result).toBe(false);
  });

  it("should return false if verification fails", async () => {
    // Mock fetch to simulate a failed response
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: "Unauthorized",
      })
    );

    const result = await verifyToken();

    expect(result).toBe(false);
  });

  it("should handle network errors", async () => {
    // Mock fetch to simulate a network error
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Network Error"))
    );

    const result = await verifyToken();

    expect(result).toBe(false);
  });
});
