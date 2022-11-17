import AWS from 'aws-sdk';
import { v4 as uuid} from 'uuid';

const dynamodb = new AWS.DynamoDB.DocumentClient();


export const putToDynamoDB = async(item) => {
    await dynamodb.put({
        TableName: process.env.STATUS_TABLE_NAME,
        Item: item
    }).promise();
}


export const createStatusObject = (props) => {
    const now = new Date();
    const jsonObject = {
        id:uuid(),
        fs_id:props.fs_id,
        createdAt:now.toISOString(),
        scheduledTime:props.scheduledTime
    }
    return jsonObject;
}  


