import {
    action,
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
    @observable limit = 15;
    @observable order = 'desc';
    @observable skip = 0;
    @observable hasScrolled = false;
    @observable hasMore = true;
    @observable messages = [];
    @observable inputDisabled = false;
    @observable inputValue = '';
    @observable user = null;
    @observable inbox = [];
    @observable inboxHasMore = true;
    @observable inboxSkip = 0;
    @observable conversationLoading = true;

    @action
    resetConvo() {
        this.skip = 0;
        this.hasScrolled = false;
        this.hasMore = true;
        this.messages = [];
        this.inputDisabled = false;
        this.inputValue = '';
        this.user = null;
        this.conversationLoading = true;
    }

    @action
    resetMessaging() {
        this.skip = 0;
        this.hasScrolled = false;
        this.hasMore = true;
        this.messages = [];
        this.inputDisabled = false;
        this.inputValue = '';
        this.user = null;
        this.inbox = [];
        this.conversationLoading = true;
    }

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
                        user_last_name,
                        id
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
                        barangay_name,
                        id
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
    async getInbox(page) {
        const page_no = this.inboxSkip === 0 ? page : 1;
        const skip_cnt = this.inboxSkip === 0 ? 0 : this.inbox.length;


        try {
            const response = await getInbox(page_no, this.limit, 'desc', skip_cnt);
            runInAction(() => {
                if (response.data.data.items.length === 0) {
                    this.inboxHasMore = false;
                } else {
                    const inbox = this.inbox.slice();
                    inbox.push(...response.data.data.items);
                    this.inbox = inbox;
                }
            });
        } catch (e) {
            this.inboxHasMore = false;
        }
    }


    @action
    async getConversationMessages(page, id, history) {
        const page_no = this.skip === 0 ? page : 1;
        const skip_cnt = this.skip === 0 ? 0 : this.messages.length;

        try {
            const response = await getMessagesById(id, page_no, this.limit, this.order, skip_cnt);
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
            if (e.sender_id === message.sender_id && e.receiver_id === message.receiver_id) {
                return e;
            } else if (e.sender_id === message.receiver_id && e.receiver_id === message.sender_id) {
                return e;
            }
            return null;
        });

        if (msgIndex !== -1) {
            const msg = this.inbox.splice(msgIndex, 1)[0];
            msg.date_created = message.date_created;
            msg.message = message.message;
            msg.receiver_id = message.receiver_id;
            msg.receiver_status = 'unread';
            msg.sender_id = message.sender_id;
            msg.sender_status = 'replied';
            this.inbox.unshift(msg);
        } else {
            const msg = {
                date_created: message.date_created,
                message: message.message,
                receiver_id: message.receiver_id,
                receiver_status: 'unread',
                sender_id: message.sender_id,
                sender_status: 'replied',
                sender_first_name: this.user.user_first_name,
                sender_last_name: this.user.user_last_name
            };
            this.inboxSkip += 1;
            this.inbox.unshift(msg);
        }
    }

    @action
    receiveInboxMsg(message, logged_user) {
        const msgIndex = this.inbox.findIndex((e) => {
            if (e.sender_id === message.sender_id && e.receiver_id === message.receiver_id) {
                return e;
            } else if (e.sender_id === message.receiver_id && e.receiver_id === message.sender_id) {
                return e;
            }
            return null;            
        });
        if (msgIndex !== -1) {
            const msg = this.inbox.splice(msgIndex, 1)[0];
            msg.date_created = message.date_created;
            msg.message = message.message;
            msg.receiver_id = message.sender_id;
            msg.receiver_status = message.sender_status;
            msg.sender_id = message.receiver_id;
            msg.sender_status = message.receiver_status;
            this.inbox.unshift(msg);
        } else {
            const msg = {
                date_created: message.date_created,
                message: message.message,
                receiver_id: message.sender_id,
                receiver_status: message.sender_status,
                sender_id: message.receiver_id,
                sender_status: message.receiver_status,
                sender_first_name: message.sender_first_name,
                sender_last_name: message.sender_last_name
            };
            this.inboxSkip += 1;
            this.inbox.unshift(msg);
        }
    }

    @action
    async sendMsg(message, receiverId, sender_name, sender_id, handleSendMessage) {
        this.inputDisabled = true;
        try {
            const response = await sendMessage(message, receiverId);
            const newMessage = response.data.data;

            handleSendMessage({ ...sender_name,
                ...newMessage
            });
            runInAction(() => {
                this.messages.unshift(newMessage);
                this.sendInboxMsg(newMessage);
                this.inputValue = '';
                this.inputDisabled = false;
                this.skip += 1;
            });
        } catch (e) {}
    }

    @action
    async receiveMsg(message) {
        this.messages.unshift(message);
        this.skip += 1;
    }


    @action
    async markAsRead(receiver_id, sender_id) {
        const msgIndex = this.inbox.findIndex((e) => {
            if (e.sender_id === sender_id && e.receiver_id === receiver_id) {
                return e;
            } else if (e.sender_id === receiver_id && e.receiver_id === sender_id) {
                return e;
            }
            return null;            
        });

        if (msgIndex !== -1) {
            this.inbox[msgIndex].sender_status = 'read';
        }
    }
}