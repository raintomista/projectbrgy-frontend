import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCamera from '@fortawesome/fontawesome-free-solid/faCamera';
import faCloudUploadAlt from '@fortawesome/fontawesome-free-solid/faCloudUploadAlt';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';


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
    this.form = new PostBoxForm(props.DashboardStore);
  }

  render() {
    const characterCount = 150 - this.form.values().message.length;

    return (
      <form onSubmit={this.form.onSubmit}>
        <div className="dashboard-post-box card">
          <div className="card-body">
            <textarea rows="3" {...this.form.$('message').bind()}></textarea>
            {this.props.DashboardStore.previewImg.map((blob, index) => (
              <div className="preview-img" key={index}>
                <button type="button" className="remove-btn" disabled={this.form.disabled} onClick={() => this.props.DashboardStore.removeSelectedImg(blob, index)}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
                <img src={blob} />
              </div>
            ))}


            <div className="options">
              <div className="buttons">
                <input
                  type="file"
                  accept="image/*"
                  name="post-attachment"
                  id="image-upload"
                  className="post-attachment"
                  onChange={(e) => this.handleImageUpload(e)}
                  disabled={this.form.disabled}
                  multiple
                />
                <label htmlFor="image-upload" title="Upload images">
                  <FontAwesomeIcon icon={faCamera} />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="post-attachment"
                  id="file-upload"
                  className="post-attachment"
                  disabled={this.form.disabled}                   
                  onChange={(e) => this.handleImageUpload(e)}
                />
                <label htmlFor="file-upload" title="Upload a file">
                  <FontAwesomeIcon icon={faCloudUploadAlt} />
                </label>
              </div>
              <span className={`character-count ${characterCount < 0 ? 'invalid' : ''}`}>
                {characterCount}
              </span>
              <button type="submit" className="submit btn rounded-light" disabled={characterCount === 150 || characterCount < 0 || this.form.disabled}>
                Post
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }

  handleImageUpload(e) {
    if (e.target.files.length > 0 && e.target.files.length <= 2) {
      const files = [];
      const previewImgs = [];
      for (let i = 0; i < e.target.files.length; i++) {
        files.push(e.target.files[i]);
        previewImgs.push(URL.createObjectURL(e.target.files[i]));
      }
      this.props.DashboardStore.setPreviewImg(previewImgs);
      this.form.$('files').set('value', files);
    }
    else if (e.target.files.length > 2) {
      alert('You cannot upload more than 2 photos')
    }
    e.target.value = null;
  }
}

DasboardPostBox.propTypes = {
  DashboardStore: PropTypes.object
}