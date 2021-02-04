// Import the js file to test
import { checkForUrl } from "../src/client/js/urlChecker"

// The describe() function takes two arguments - a string description, and a test suite as a callback function.
describe("Testing the check functionality", () => {

  test("Testing the checkForUrl() function", () => {

    expect(checkForUrl).toBeDefined();
  })});