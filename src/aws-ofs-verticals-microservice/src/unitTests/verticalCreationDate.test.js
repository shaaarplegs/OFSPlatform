const createVerticalObject = require('./vertical');


test('creating vertical with name repairer at 2022-11-17T09:35:01.196Z', () => {
  expect(createVerticalObject({name:'repairer'}).createdAt).toBe('2022-11-17T09:35:01.196Z');
});