# 消息队列设计方案


## 概念

* 消息：是指文字、图片、语音、视频等各类消息的统称。
* 消息队列：是指消息的容器。用以维护消息的状态(初始化|发送中|已发送)和发送消息。

## 流程图

```flow
st=>start: IM
io=>inputoutput: 消息
mq=>subroutine: 消息队列
cd1=>condition: 消息队列是否为空
idle_sleep=>operation: 空闲状态休眠
looper_send=>operation: Looper轮循环取出消息进行发送
cd2=>condition: 消息状态:是否发送成功
finish=>operation: return 这种情况应该不会存在
add=>operation: 添加到消息队列
remove=>operation: 从消息队列移除

st->io->mq
mq->cd1
cd1(yes)->idle_sleep
cd1(no)->looper_send
looper_send->cd2
cd2(yes)->remove(left)->mq
cd2(no)->mq
```

## 实现思路

1. 消息经过Conversation发送后，直接添加到消息队列中。对于调用消息队列的的add方法的消息，即刻发送，以保证消息的实时性。
2. 如果消息未发送成功，还在消息队列里面，则默认为优先级高的消息，时隔2秒发送一次。
3. 如果消息发送成功，则从消息队列中移除消息。Looper不会停止，只会阻塞。
4. 对于，退出当前应用时，消息队列中，还存在未发送的消息的情况。当用户再次登录的时候，是从本地数据库查询出的未发送的消息.

