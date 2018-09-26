import InfiniteScroll from 'react-infinite-scroller';

export default class InfiniteNewsFeed extends InfiniteScroll {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.pageStart !== this.props.pageStart) {
            this.pageLoaded = 0;
        }
        this.attachScrollListener();
    }
}