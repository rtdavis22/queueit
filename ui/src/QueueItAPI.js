import {
  CreateTweetQueueItemRequest,
  GetQueueConfigsRequest,
  GetTweetQueueItemsRequest,
} from './gen/idl/queueit_pb';
import {QueueItPromiseClient} from './gen/idl/queueit_grpc_web_pb';

const client = new QueueItPromiseClient('http://localhost:8080');

export default class QueueItAPI {
  static CreateTweetQueueItem(queueId, tweetUrl) {
    const request = new CreateTweetQueueItemRequest();
    request.setQueueId(queueId);
    request.setTweetUrl(tweetUrl);
    return client.createTweetQueueItem(request);
  }

  static GetQueueConfigs() {
    const request = new GetQueueConfigsRequest();
    request.setDomain('default');
    return client.getQueueConfigs(request).then(response => response.getConfigsList());
  }

  static GetTweetQueueItems(queueId) {
    const request = new GetTweetQueueItemsRequest();
    request.setQueueId(queueId);
    return client.getTweetQueueItems(request).then(response => response.getItemsList());
  }
}
