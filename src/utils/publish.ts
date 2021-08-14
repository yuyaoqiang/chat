// 发布者
export class PubSub {
    subscribers: any = {}
    constructor() {
        this.subscribers = {}
    }
    subscribe(type: any, fn: any) {
        this.subscribers[type] = fn;

    }
    unsubscribe(type: any, fn: any) {
        let listener = this.subscribers[type];
        if (!listener) return;
        this.subscribers[type] = null;
    }
    publish(type: any, ...args: any) {
        let listener = this.subscribers[type];
        if (!listener) return;
        listener(...args)
    }
}

// 观察者
const subscriber = (type: string, fn: Function) => {
    publish.subscribe(type, fn);
}
//实例
let publish: any = null;
// 初始化
const initPublish = () => {
    if (!publish) {
        publish = new PubSub();

        return publish;
    }
    return publish
}
initPublish()
export {
    publish,
    subscriber
}