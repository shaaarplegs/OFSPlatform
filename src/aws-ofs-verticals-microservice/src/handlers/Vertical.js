import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB.DocumentClient();
import { v4 as uuid} from 'uuid';


export const putToDynamoDB = (item) => {
    return dynamodb.put({
        TableName: process.env.VERTICALS_TABLE_NAME,
        Item: item
    });
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


