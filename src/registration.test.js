import registerPluginHandler, { customTransforms } from "./registration";

beforeEach(() => {
  delete customTransforms.test;
});

test("registerPluginHandler adds array of functions to customTransforms", () => {
  const testTransforms = [(obj) => obj, (obj) => obj + obj];
  const allTransforms = { test: testTransforms };
  registerPluginHandler({ appSearch: { transforms: allTransforms } });
  expect(customTransforms.test).toEqual(testTransforms);
});

test("registerPluginHandler adds single function to customTransforms", () => {
  const testTransforms = (obj) => obj;
  const allTransforms = { test: testTransforms };
  registerPluginHandler({ appSearch: { transforms: allTransforms } });
  expect(customTransforms.test).toHaveLength(1);
  expect(customTransforms.test).toContain(testTransforms);

  const testTransforms2 = (obj) => obj;
  registerPluginHandler({ appSearch: { transforms: { test: testTransforms2 } } });
  expect(customTransforms.test).toHaveLength(2);
  expect(customTransforms.test).toContain(testTransforms2);
});
