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
    @observable pageStart = 0;
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
    @observable conversationLoading = true;

    @action
    async getUserDetails(id) {
        this.conversationLoading = true;
        this.skip = 0;
        this.hasScrolled = false;
        this.hasMore = true;
        this.messages = [];
        this.inputDisabled = false;
        this.inputValue = '';
        this.user = null;
        try {
            const response = await getUserById(id);
            const {
                user_first_name,
                user_last_name
            } = response.data.data;

            setTimeout(() => {
                runInAction(() => {
                    this.user = {
                        user_first_name,
                        user_last_name
                    }
                    this.conversationLoading = false;
                });
            }, 500);
        } catch (e) {

        }
    }

    @action
    setUserDetails(user) {
        this.user = user;
    }

    @action
    async getInbox() {
        try {
            const response = await getInbox(1, this.limit);
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

    sendInboxMsg(message) {
        const msgIndex = this.inbox.findIndex((e) => e.message_sender_id === message.receiver_id);
        if (msgIndex !== -1) {
            const msg = this.inbox.splice(msgIndex, 1)[0];
            msg.message_date_created = message.date_created;
            msg.message_message = message.message;
            msg.message_status = 'replied';
            this.inbox.unshift(msg);
        } else {
            const msg = {
                message_date_created: message.date_created,
                message_id: message.id,
                message_message: message.message,
                message_receiver_id: message.receiver_id,
                message_receiver_role: message.receiver_role,
                message_sender_id: message.sender_id,
                message_sender_role: message.sender_role,
                message_status: 'replied',
                sender_first_name: this.user.user_first_name,
                sender_last_name: this.user.user_last_name
            };
            this.inbox.unshift(msg);
        }
    }

    @action
    receiveInboxMsg(message) {
        const msgIndex = this.inbox.findIndex((e) => e.message_sender_id === message.sender_id);
        if (msgIndex !== -1) {
            const msg = this.inbox.splice(msgIndex, 1)[0];
            msg.message_date_created = message.date_created;
            msg.message_message = message.message;
            msg.message_status = message.status;
            this.inbox.unshift(msg);
        }
    }

    @action
    async sendMsg(message, receiverId, sender_name, handleSendMessage) {
        this.inputDisabled = true;
        try {
            const response = await sendMessage(message, receiverId);
            const newMessage = response.data.data;
            handleSendMessage({
                ...sender_name,
                ...newMessage
            });
            runInAction(() => {
                this.messages.unshift(newMessage);
                this.sendInboxMsg(newMessage);
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