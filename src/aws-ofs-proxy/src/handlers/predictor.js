
import axios from 'axios';

async function predictor(event) {

    let price = 0;
    const {description} = JSON.parse(event.body)
    const predictionKeyID = event.headers.predictionKeyID
    const predictionSecretAccess = event.headers.predictionSecretAccess

    axios.post(`http://ai.ofs-platform.com/predict`, { 
        "description": description
        },  {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'predictionKeyID': predictionKeyID,
            'predictionSecretAccess': predictionSecretAccess
        }
        })
        .then( (r) => {
          price = r.data.Price
          return {
            statusCode: 200,
            body: JSON.stringify({ "Message":"Price predicted","price": price })
          }
        })
};
  
export const handler = predictor;