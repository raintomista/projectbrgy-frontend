import {
    action,
    computed,
    configure,
    observable,
    runInAction
} from 'mobx';

import {
    deletePost,
    unsharePost
} from 'services/PostService';

export default class MessagingStore {
    @observable messages = [];
    @observable pageStart = 0;
    @observable limit = 15;
    @observable hasMore = true;
    @observable posts = [];



    @action
    async sendMessage(message) {
        this.messages.push(message);
    }

    @action
    async receiveMessage(message) {
        this.messages.push(message);
    }
}