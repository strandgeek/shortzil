import { Zilliqa } from '@zilliqa-js/zilliqa';
import { StatusType, MessageType } from '@zilliqa-js/subscriptions';

const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');
const subscriber = zilliqa.subscriptionBuilder.buildEventLogSubscriptions(
  'wss://dev-ws.zilliqa.com',
  {
    addresses: [process.env.CONTRACT_ADDRESS!],
  },
);

subscriber.emitter.on(StatusType.SUBSCRIBE_EVENT_LOG, (event) => {
  // if subscribe success, it will echo the subscription info
  console.log('get SubscribeEventLog echo : ', event);
});

subscriber.emitter.on(MessageType.EVENT_LOG, (event) => {
  console.log('get new event log: ', JSON.stringify(event));
  // updating the welcome msg when a new event log is received related to getHello() transition
  if(event.hasOwnProperty("value")){
    if(event.value[0].event_logs[0]._eventname =="Mint"){
      console.log(event.value[0].event_logs[0].params[0])
    }
  }
});  



export const startSubscriber = () => {
  subscriber.start();
}

