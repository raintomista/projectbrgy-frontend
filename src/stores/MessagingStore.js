import {
    action,
    computed,
    configure,
    observable,
    runInAction
} from 'mobx';

import {
    getInbox,
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
    @observable inbox = [];

    @action
    initConversation(scroll) {
        this.page = 1;
        this.limit = 25;
        this.skip = 0;
        this.hasScrolled = false;
        this.hasMore = true;
        this.messages = [];
        this.inputDisabled = false;
        this.inputValue = '';
        this.user = null;

        if (scroll) {
            console.log(this.hasScrolled)
            scroll.pageLoaded = 0;
        }
    }

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
        } catch (e) {}
    }

    @action
    async getInbox() {
        try {
            const response = await getInbox(this.page, this.limit);
            runInAction(() => {
                const inbox = this.inbox.slice();
                inbox.push(...response.data.data.items);
                this.inbox = inbox;
            });
        } catch (e) {

        }
    }


    @action
    async getConversationMessages(page, id, history) {
        try {
            const response = await getMessagesById(id, page, this.limit, this.order, this.skip);
            runInAction(() => {
                const messages = this.messages.slice();
                messages.push(...response.data.data.items);
                this.messages = messages;
                this.page = page + 1;
            });
        } catch (e) {
            const error = e.response.data.errors[0];
            if (error.code === 'ZERO_RES') {
                runInAction(() => {
                    this.hasMore = false;
                });
            } else {
                runInAction(() => {
                    this.messages = [];
                    this.hasMore = false;
                    history.push('/messages');
                    alert('Sorry, this user is not available.');
                });
            }
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