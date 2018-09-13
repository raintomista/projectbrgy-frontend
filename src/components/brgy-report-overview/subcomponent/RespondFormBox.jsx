import React, { Component } from 'react';
import { observer } from 'mobx-react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faUpload from '@fortawesome/fontawesome-free-solid/faUpload'
import { Line } from 'rc-progress';
import RespondForm from './RespondForm';
import './RespondFormBox.less';

@observer
export default class RespondFormBox extends Component {
  constructor(props) {
    super(props);
    this.form = new RespondForm(props.history);
    this.form.$('inquiry_id').set('value', this.props.inquiryId);
  }

  render() {
    let characterCount = 800 - this.form.values().message.length;

    return (
      <div className="respond-form-box card">
        <div className="card-body">
          <form onSubmit={this.form.onSubmit}>
            <textarea {...this.form.$('message').bind()}>
            </textarea>
            <div className="toolbar">
              <div className="toolbar-start">
                <input type="file" multiple onChange={(e) => this.handleUpload(e)} />
              </div>
              <div className="toolbar-end">
                <label className={`${characterCount < 0 ? 'invalid' : ''} character-count`}>
                  {characterCount}
                </label>
                <button type="submit" className="btn rounded">Submit</button>
              </div>
            </div>
          </form>
        </div>
        {this.form.$('uploadProgress').value !== -1 && (
          <Line
            percent={this.form.$('uploadProgress').value}
            strokeWidth="0.5"
            strokeColor="#2a8abd"
            strokeLinecap="square"
          />
        )}
      </div>
    );
  }

  handleUpload(e) {
    this.form.$('files').value = Array.from(e.target.files);
  }


}
{/* <button className="file-upload">
                <FontAwesomeIcon icon={faUpload} />
              </button>
    */}