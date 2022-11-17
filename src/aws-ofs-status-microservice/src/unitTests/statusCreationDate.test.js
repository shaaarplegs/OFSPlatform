const createStatus = require('./status');


test(`test createdDate, creating status event with fs_id 1a1f3799-d389-4e58-933c-e499ec6abcfb 
and schedule of monday 9 to 10 in the morning`, () => {
  expect(createStatus({fs_id:'1a1f3799-d389-4e58-933c-e499ec6abcfb',
  scheduledTime:{
    DayTimes: ["09:00-10:00"],
    Days:["Monday"]
  }}).createdAt).toBe('2022-11-17T09:35:01.196Z');
});