import { Zilliqa } from '@zilliqa-js/zilliqa';
import { StatusType, MessageType } from '@zilliqa-js/subscriptions';
import { prisma } from '../db';

const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');
const subscriber = zilliqa.subscriptionBuilder.buildEventLogSubscriptions(
  'wss://dev-ws.zilliqa.com',
  {
    addresses: [process.env.CONTRACT_ADDRESS!],
  },
);

subscriber.emitter.on(MessageType.EVENT_LOG, async (event) => {
  try {
    if(event.hasOwnProperty("value")){
      const value = event.value[0]
      const eventLogs = value.event_logs[0]
      if(eventLogs._eventname == "MintSuccess") {
        const params = eventLogs.params
        const owner = params[1].value
        const tokenId = parseInt(params[2].value)
        const tokenUri = params[3].value
        const slug = params[4].value
        const url = params[5].value
        await prisma.slugUrl.create({
          data: {
            owner,
            slug,
            tokenId,
            tokenUri,
            url,
          }
        })
      }
      if(eventLogs._eventname == "TransferSuccess") {
        const params = eventLogs.params
        console.log(params)
        const to = params[1].value
        const tokenId = parseInt(params[2].value)
        await prisma.slugUrl.update({
          where: {
            tokenId,
          },
          data: {
            owner: to,
          }
        })
      }
    }
  } catch (error) {
    console.log(error)
  }
});  



export const startSubscriber = () => {
  subscriber.start();
}

