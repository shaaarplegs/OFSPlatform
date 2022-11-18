const createFreelancing = require('./Freelancing');

dayIndex = 2

test(`test what time during Wesnesday the freelancing is available,
using Persona that is an english teacher, works 9 to 5 monday to wednesday
`, () => {
  scheduledTimeArray = createFreelancing({
    vertical_id: "fc5cab05-e63b-445b-b630-0e4cd2c84a69",
    name:"English teacher",
    city:"Muscat",
    description:"10 years experience educating kids the way to English confidentially.",
    price:199,
    scheduledTime:{
        Days:["Monday","Tuesday","Wednesday"],
        DayTimes:["10:00-14:00","15:00-21:00","09:00-17:00"]
    }
  }).scheduledTime

  dayIndex = scheduledTimeArray['Days'].indexOf('Wednesday')
  expectedDayTime = scheduledTimeArray.DayTimes[dayIndex]

  expect(expectedDayTime).toBe("09:00-17:00");
});