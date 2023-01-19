import { v4 as uuid} from 'uuid';
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();
const eventbridge = new AWS.EventBridge()

export const putToDynamoDB = (item) => {
    return dynamodb.put({
        TableName: process.env.FS_TABLE_NAME,
        Item: item
    });
}

export const DispatchEvent = props => {
    const params = {
        Entries: [ 
          {
            Detail: JSON.stringify({
              fs_id:props.fs_id,
              scheduledTime:props.scheduledTime
            }),
            EventBusName: 'aws-ofs-eventBus',
            DetailType: 'create',
            Source: 'vertical.createFS',
            Time: new Date()
        }
    ]}

    return eventbridge.putEvents(params)
}

export const createFreelancingObject = (props) => {
    const now = new Date();
    const jsonObject = {
        id: uuid(),
        createdAt: now.toISOString(),
        vertical_id:props.vertical_id,
        name:props.name,
        city:props.city,
        description:props.description,
        price:props.price,
        phone_number:props.phone_number,
        email:props.email
    }
    return jsonObject;
}