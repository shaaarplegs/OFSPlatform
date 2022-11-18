const createFreelancing = require('./Freelancing');


test(`test automated Id Generation,
using Persona that is an english teacher, works 9 to 5 monday to wednesday
`, () => {
  expect(createFreelancing({
    vertical_id: "fc5cab05-e63b-445b-b630-0e4cd2c84a69",
    name:"English teacher",
    city:"Muscat",
    description:"10 years experience educating kids the way to English confidentially.",
    price:199,
    scheduledTime:{
        "Days":["Monday","Tuesday","Wednesday"],
        "DayTimes":["09:00-17:00","09:00-17:00","09:00-17:00"]
    }
  }).id).toBe("c9c79ed1-5b6b-4e7c-bd61-2963453e34ad");
});