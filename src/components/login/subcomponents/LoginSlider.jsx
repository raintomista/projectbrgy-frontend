import React, { Component } from 'react';
import { Carousel, CarouselItem, CarouselIndicators } from 'reactstrap';
import SliderIcon from 'assets/images/in-the-loop.png';

const items = [
  {
    src: '1',
    icon: SliderIcon,
    header: 'Be in the loop',
    subheader: 'Stay updated with the current <br /> projects, issues, updates and events <br /> in your barangay.'
  },
  {
    src: '2',
    icon: SliderIcon,
    header: 'Be in the loop 1',
    subheader: 'Stay updated with the current <br /> projects, issues, updates and events <br /> in your barangay.'
  },
  {
    src: '3',
    icon: SliderIcon,
    header: 'Be in the loop 2',
    subheader: 'Stay updated with the current <br /> projects, issues, updates and events <br /> in your barangay.'
  },
  {
    src: '4',
    icon: SliderIcon,
    header: 'Be in the loop 3',
    subheader: 'Stay updated with the current <br /> projects, issues, updates and events <br /> in your barangay.'
  }
];


export default class LoginSlider extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.icon} alt="" />
          <h2>{item.header}</h2>
          <p dangerouslySetInnerHTML={{ __html: item.subheader }}></p>
        </CarouselItem>
      );
    });

    return (
      <div className="d-none d-md-flex col-md-5 col-lg-4 login-slider">
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
          interval={2500}
          ride="carousel"
        >
          {slides}
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        </Carousel>
      </div>
    );
  }
}