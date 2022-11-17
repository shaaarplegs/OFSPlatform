const createVerticalObject = require('./vertical');


test('creating vertical with name repairer having id of b239706c-37f9-45b8-a299-851066b55575', () => {
  expect(createVerticalObject({name:'repairer'}).id).toBe('b239706c-37f9-45b8-a299-851066b55575');
});