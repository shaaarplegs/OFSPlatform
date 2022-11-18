const createFreelancing = require('./Freelancing');


test(`test how many scheduled days sent to the status event rule?,
using Persona that is an english teacher, works 9 to 5 monday to wednesday
`, () => {
  expect(createFreelancing({
    vertical_id: "fc5cab05-e63b-445b-b630-0e4cd2c84a69",
    name:"English teacher",
    city:"Muscat",
    description:"10 years experience educating kids the way to English confidentially.",
    price:199,
    scheduledTime:{
        Days:["Monday","Tuesday","Wednesday"],
        DayTimes:["09:00-17:00","09:00-17:00","09:00-17:00"]
    }
  }).scheduledTime.Days.length).toBe(3);
});