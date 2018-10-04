import InfiniteScroll from 'react-infinite-scroller';

export default class InfiniteNewsFeed extends InfiniteScroll {
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.pageStart !== this.props.pageStart) {
            this.pageLoaded = 0;
        }
        this.attachScrollListener();
    }
}