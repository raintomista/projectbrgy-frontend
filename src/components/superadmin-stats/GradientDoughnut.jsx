import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';


export default class GradientDoughnut extends Component {
  render() {
    const inputData = [...this.props.inputData];

    const data = (canvas) => {
      const ctx = canvas.getContext("2d")
      const gradient = ctx.createLinearGradient(0, 250, 0, 0);
      gradient.addColorStop(0, '#2a8abd');
      gradient.addColorStop(1, '#226cc1');

      return {
        labels: [...this.props.labels],
        datasets: [{
          data: inputData,
          backgroundColor: [
            gradient,
            '#FFFFFF',
            '#EEEEEE'
          ],
          hoverBackgroundColor: [
            gradient,
            '#FFFFFF',
          ],
          borderColor: [
            'transparent',
            '#226cc1',
            'transparent'
          ],
          borderWidth: [
            0.8,
            0.6,
            0.5
          ]
        }]
      }
    }

    const options = {
      responsive: false,
      maintainAspectRatio: false,
      cutoutPercentage: 70,
      legend: {
        display: true,
        position: 'bottom',
        fullWidth: true,
        labels: {
          usePointStyle: true,
        },
      },
      tooltips: {
        displayColors: false,
      },
    }
    return (
      <div className="gradient-doughnut">
        <h5>{this.props.title}</h5>
        <div className="container">
          <div className="total-count">
            {this.props.inputData.reduce((a, b) => a + b)}
          </div>
          <Doughnut
            data={data}
            options={options}
            width={320}
            height={250}
          />
        </div>
      </div>
    );
  }
}