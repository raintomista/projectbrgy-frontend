import {
    action,
    computed,
    configure,
    observable,
    runInAction
} from 'mobx';

import {
    getMessagesById,
    getUserById,
    sendMessage
} from 'services/MessagingService';

export default class MessagingStore {
    @observable page = 1;
    @observable limit = 25;
    @observable order = 'desc';
    @observable skip = 0;
    @observable hasScrolled = false;
    @observable hasMore = true;
    @observable messages = [];
    @observable inputDisabled = false;
    @observable inputValue = '';
    @observable user = null;

    @action
    async getUserDetails(id) {
        try {
            const response = await getUserById(id);
            const {
                user_first_name,
                user_last_name
            } = response.data.data;
            runInAction(() => {
                this.user = {
                    user_first_name,
                    user_last_name
                }
            });
        } catch (e) {

        }
    }

    @action
    async getConversationMessages(page, id) {
        try {
            const response = await getMessagesById(id, page, this.limit, this.order, this.skip);
            setTimeout(() => {
                runInAction(() => {
                    const messages = this.messages.slice();
                    messages.push(...response.data.data.items);
                    this.messages = messages;
                    this.page = page + 1;
                });
            }, 1000);

        } catch (e) {
            runInAction(() => {
                this.hasMore = false;
            });
        }
    }

    @action
    inputChange(message) {
        this.inputValue = message;
    }

    @action
    setScrolled(hasScrolled) {
        this.hasScrolled = hasScrolled;
    }

    @action
    async sendMsg(message, receiverId, handleSendMessage) {
        this.inputDisabled = true;
        try {
            const response = await sendMessage(message, receiverId);
            const newMessage = response.data.data;
            handleSendMessage(newMessage);
            runInAction(() => {
                this.messages.unshift(newMessage);
                this.inputValue = '';
                this.inputDisabled = false;
            });
        } catch (e) {
            console.log(e.response);
        }
    }

    @action
    async receiveMsg(message) {
        this.messages.unshift(message);
    }
}