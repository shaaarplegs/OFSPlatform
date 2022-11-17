const createVerticalObject = require('./vertical');


test('creating vertical with name repairer', () => {
  expect(createVerticalObject({name:'repairer'}).name).toBe('repairer');
});