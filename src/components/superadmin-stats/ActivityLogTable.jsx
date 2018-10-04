import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import { getActivityLogs } from 'services/SuperadminService';

export default class ActivityLogTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageStart: 0,
      limit: 50,
      hasMore: true,
      logs: [],
    }
  }

  render() {
    const { hasMore, logs, pageStart } = this.state;
    const items = logs.map((log, index) => (
      <tr key={log.id}>
        <td className="actor">{log.actor}</td>
        <td>{log.method}</td>
        <td>{log.activity}</td>
        <td>{log.ip_address}</td>
        <td>{moment(log.date_created).format('MMM DD, YYYY hh:mm:ss a')}</td>
      </tr>
    ))
    return (
      <table className="activity-log table" style={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th style={{ width: '20%' }}>User</th>
            <th style={{ width: '10%' }}>Method</th>
            <th style={{ width: '30%' }}>Activity</th>
            <th style={{ width: '20%' }}>IP Address</th>
            <th style={{ width: '20%' }}>Timestamp</th>
          </tr>
        </thead>
        <InfiniteScroll
          pageStart={pageStart}
          loadMore={(page) => this.getLogs(page)}
          hasMore={hasMore}
          loader={this.renderLoader()}
          element="tbody"
          threshold={30}
        >
          {items}
        </InfiniteScroll>
        {logs.length === 0 && !hasMore && (
          <thead className="empty-filler">
            <tr>
              <td colSpan={5}>
                <h6>There are no activity logs as of the moment.</h6>
              </td>
            </tr>
          </thead>
        )}
      </table>
    );
  }

  async getLogs(page) {
    try {
      const response = await getActivityLogs(page, this.state.limit, 'desc');
      let logs = [];
      if (page === 1) {
        logs = response.data.data.items;
      } else {
        logs = this.state.logs.slice();
        logs.push(...response.data.data.items);
      }
      this.setState({ logs: logs });
    } catch (e) {
      if (e.response.data.errors[0].code === 'ZERO_RES') {
        this.setState({ hasMore: false });
      } else {
        alert('An error occured. Please try again.')
      }
    }
  }

  renderLoader() {
    return (
      <tr key={0}>
        <td colSpan={5}>
          <div className="content-loader">
            <object data="images/loader.svg" type="image/svg+xml">
            </object>
          </div>
        </td>
      </tr>
    )
  }
}