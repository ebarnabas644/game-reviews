import { Subscription } from "rxjs";

// https://www.youtube.com/watch?v=X5dLgXJBfE8&ab_channel=CodeWithGio
export class SubscriptionContainer {
    private subs: Subscription[] = [];

    set add(s: Subscription){
        this.subs.push(s);
    }

    dispose(){
        this.subs.forEach(s => s.unsubscribe())
    }
}
