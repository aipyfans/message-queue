/**
 * MessageQueue
 */
export default class MessageQueue {

    constructor() {
        this.messageQueue = new Map();
        this.looperID = setInterval(this.sendMessages, 2000);
    }


    /**
     *
     * @param messages
     */
    setLegacyMessage(messages){
        if (!messages) throw new Error("messages must be an array");
        messages.forEach(message => this.add(message));
    }


    /**
     * 将消息添加到消息队列中.
     *
     * @param message
     */
    add(message) {
        if (!message) throw new Error("message must be an instance");
        let id = message.id;

        if (!this.messageQueue.has(id)) {
            this.messageQueue.set(id, message);
        }

        // todo 立刻发送
    }


    /**
     * 将消息从到消息队列中移除.
     *
     * @param mid message ID
     */
    remove(mid) {
        if (!mid) throw new Error("mid must be a string");
        if (this.messageQueue.has(mid)) {
            console.log("-----------------------------------------");
            console.log("发送成功---" + JSON.stringify(this.messageQueue.get(mid)));
            this.messageQueue.delete(mid);
        }
    }


    /**
     * 停止发送消息队列里的消息.
     */
    stop(){
        clearInterval(this.looperID);
    }


    sendMessages =() => {
        if (this.messageQueue.size > 0) {
            // todo 首先移除发送成功的消息

            console.log("-----------------------------------------");
            this.messageQueue.forEach((value, key) => {
                // todo use socket.io to sending...
                console.log("发送中---" + JSON.stringify(value));
            });
        }else {
            console.log("-----------------------------------------");
            console.log("消息队列处于空闲中...");
        }
    }

}