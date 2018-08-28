import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';

// Form
import PostBoxForm from './PostBoxForm';

// Subcomponent
import LightRoundedButton from 'components/common/Buttons/LightRounded';

// Stylesheet
import './PostBox.less';

@observer
export default class DasboardPostBox extends Component {
  constructor(props) {
    super(props);
    this.form = new PostBoxForm();
  }

  render() {
    const characterCount = 150 - this.form.values().message.length;

    return (
      <form onSubmit={this.form.onSubmit}>
        <div className="dashboard-post-box card">
          <div className="card-body">
            <textarea rows="3" {...this.form.$('message').bind()}></textarea>
            <div className="options">
              <span className={`character-count ${characterCount < 0 ? 'invalid' : ''}`}>
                {characterCount}
              </span>
              <LightRoundedButton type="submit" value="Post" disabled={characterCount === 150 || characterCount < 0} />
            </div>
          </div>
        </div>
      </form>
    );
  }
}
