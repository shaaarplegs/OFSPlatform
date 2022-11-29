
import AWS from 'aws-sdk';
const eventbridge = new AWS.EventBridge()

export const DispatchEvent = props => {
    const params = {
        Entries: [ 
          {
            Detail: JSON.stringify({
              event: props.event
            }),
            EventBusName: 'aws-ofs-eventBus-Registeration',
            DetailType: 'register',
            Source: props.Source,
            Time: new Date()
        }
    ]}

    return eventbridge.putEvents(params)
}