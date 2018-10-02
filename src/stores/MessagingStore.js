import {
    action,
    computed,
    configure,
    observable,
    runInAction
} from 'mobx';

import {
    getBrgyById,
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
    async getUserDetails(id, history) {
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
            history.push('/messages');
        }
    }

    @action
    async getBarangayDetails(id, history) {
        this.conversationLoading = true;
        this.skip = 0;
        this.hasScrolled = false;
        this.hasMore = true;
        this.messages = [];
        this.inputDisabled = false;
        this.inputValue = '';
        this.user = null;

        try {
            const response = await getBrgyById(id);
            const {
                name: barangay_name
            } = response.data.data;

            setTimeout(() => {
                runInAction(() => {
                    this.user = {
                        barangay_name
                    }
                    this.conversationLoading = false;
                });
            }, 500);
        } catch (e) {
            history.push('/messages');
        }
    }

    @action
    setUserDetails(user) {
        this.user = user;
    }

    @action
    async getInbox() {
        this.getInbox = [];
        try {
            const response = await getInbox(1, this.limit);
            console.log(response)
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

    sendInboxMsg(message, sender_id) {
        const msgIndex = this.inbox.findIndex((e) => {
            let id = null;
            if(sender_id === e.sender_id) {
                id = e.receiver_id;
            } else {
                id = e.sender_id;
            }

            return id === message.receiver_id;
        });

        if (msgIndex !== -1) {
            const msg = this.inbox.splice(msgIndex, 1)[0];
            msg.date_created = message.date_created;
            msg.message = message.message;
            msg.status = 'replied';
            this.inbox.unshift(msg);
        } else {
            const msg = {
                date_created: message.date_created,
                message: message.message,
                receiver_id: message.receiver_id,
                sender_id: message.sender_id,
                status: 'replied',
                sender_first_name: this.user.user_first_name,
                sender_last_name: this.user.user_last_name
            };
            this.inbox.unshift(msg);
        }
    }

    @action
    receiveInboxMsg(message, logged_user) {
        const msgIndex = this.inbox.findIndex((e) => message.receiver_id == logged_user);
        if (msgIndex !== -1) {
            const msg = this.inbox.splice(msgIndex, 1)[0];
            msg.date_created = message.date_created;
            msg.message = message.message;
            msg.status = 'unread';
            this.inbox.unshift(msg);
        } else {
            const msg = {
                date_created: message.date_created,
                message: message.message,
                receiver_id: message.receiver_id,
                sender_id: message.sender_id,
                status: 'unread',
                sender_first_name: message.sender_first_name,
                sender_last_name: message.sender_last_name
            };
            this.inbox.unshift(msg);
        }
    }

    @action
    async sendMsg(message, receiverId, sender_name, sender_id, handleSendMessage) {
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
                this.sendInboxMsg(newMessage, sender_id);
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