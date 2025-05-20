import { handleSanitizeDate } from "../../utils/date/index.ts"

test('proper date sanitization', () => {
  expect(handleSanitizeDate("2020-05-14T04:00:00Z")).toBe("5/14/2020");
});