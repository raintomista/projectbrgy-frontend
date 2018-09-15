import {
    action,
    configure,
    observable,
    runInAction
} from 'mobx';

import {
    getBrgyMemberReportById,
    getReportResponses
} from 'services/ReportService';


configure({
    enforceActions: true
});

export default class ReportOverviewStore {
    @observable page = 1;
    @observable limit = 2;
    @observable order = 'desc';
    @observable skip = 0;

    @observable fetchedCount = 0;
    @observable totalCount = 0;

    @observable fetchingResponses = false;
    @observable pageLoading = true;

    @observable report = null;
    @observable responses = [];

    @action
    async getReportDetails(id) {
        this.pageLoading = true;
        try {
            const response = await getBrgyMemberReportById(id);
            setTimeout(() => {
                runInAction(() => this.report = response.data.data);
            }, 1000);
        } catch (e) {
            console.log(e);
        }
    }
    @action
    async getAdminResponses(id) {
        try {
            const response = await getReportResponses(id, this.page, this.limit, this.order, this.skip);
            const {
                total,
                inquiry_admin_response
            } = response.data.data;

            setTimeout(() => {
                runInAction(() => {
                    this.pageLoading = false;
                    this.responses = inquiry_admin_response;
                    this.fetchedCount = inquiry_admin_response.length;
                    this.totalCount = total;
                });
            }, 1000);
        } catch (e) {
            console.log(e);
        }
    }

    @action
    async loadPrevious(id) {
        this.fetchingResponses = true;
        try {
            const response = await getReportResponses(id, this.page + 1, this.limit, this.order, this.skip);
            const {
                total,
                inquiry_admin_response
            } = response.data.data;

            const newResponses = this.responses.slice();
            newResponses.push(...inquiry_admin_response);

            setTimeout(() => {
                runInAction(() => {
                    this.fetchingResponses = false;
                    this.page = this.page + 1;
                    this.responses = newResponses;
                    this.fetchedCount = newResponses.length;
                    this.totalCount = total;
                });
            }, 1000);
        } catch (e) {
            console.log(e);
        }
    }

    @action reset() {
        this.page = 1;
        this.limit = 2;
        this.order = 'desc';
        this.skip = 0;

        this.fetchedCount = 0;
        this.totalCount = 0;

        this.fetchingResponses = false;
        this.pageLoading = true;

        this.report = null;
        this.responses = [];
    }
}