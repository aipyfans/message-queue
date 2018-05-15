console.log("-----------------------------------------");
console.log("开始测试");
console.log("-----------------------------------------");
console.log("模拟本地未发送的消息");
console.log("-----------------------------------------");

import Message from './msg';
import MessageQueue from './mq';

// 从本地数据库查询出未发送成功的消息
let localUnsentMsgs = [];
for (let i = 0; i < 6; i++) {
    localUnsentMsgs.push(new Message("msg" + i));
}
console.log(localUnsentMsgs);
console.log("-----------------------------------------");
console.log("模拟消息队列发送消息");

// 消息队列
let mq = new MessageQueue();
// 设置退出应用时，未发送成功的消息
mq.setLegacyMessage(localUnsentMsgs);

// 模拟发送成功的事件消息
let mqid = setInterval(() => {
    if (localUnsentMsgs.length > 0) {
        let message = localUnsentMsgs.shift();
        mq.remove(message.id);
    } else {
        clearInterval(mqid);
    }
}, 1000);


// 模拟应用退出
setTimeout(() => {
    mq.stop();
}, 10000);