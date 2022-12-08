import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB.DocumentClient();
const eventbridge = new AWS.EventBridge()
import { v4 as uuid} from 'uuid';


export const putToDynamoDB = (item) => {
    return dynamodb.put({
        TableName: process.env.VERTICALS_TABLE_NAME,
        Item: item
    });
}

export const DispatchEvent = props => {
    const params = {
        Entries: [ 
          {
            Detail: JSON.stringify({
              event:props.event
            }),
            EventBusName: 'aws-ofs-eventBus',
            DetailType: 'create',
            Source: 'vertical.createVertical',
            Time: new Date()
        }
    ]}
    return eventbridge.putEvents(params)
}


export const createVerticalObject = (props) => {
    const now = new Date();
    const jsonObject = {
        id:uuid(),
        createdAt:now.toISOString(),
        name:props.name
    }
    return jsonObject;
}  


