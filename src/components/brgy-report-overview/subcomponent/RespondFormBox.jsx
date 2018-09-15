import React, { Component } from 'react';
import { observer } from 'mobx-react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPaperclip from '@fortawesome/fontawesome-free-solid/faPaperclip'
import { Line } from 'rc-progress';
import RespondForm from './RespondForm';
import './RespondFormBox.less';

@observer
export default class RespondFormBox extends Component {
  constructor(props) {
    super(props);
    this.form = new RespondForm(props.history);
    this.form.$('inquiry_id').set('value', this.props.inquiryId);
    this.state = { label: 'Attach files here' }
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
                <input
                  onChange={(e) => this.handleUpload(e)}
                  type="file"
                  name="file"
                  id="file"
                  className="inputfile"
                  disabled={this.form.$('message').disabled}
                  multiple
                />
                <label htmlFor="file">
                  <FontAwesomeIcon icon={faPaperclip} />
                  {this.props.ReportOverviewStore.label}
                </label>
              </div>
              <div className="toolbar-end">
                <label className={`${characterCount < 0 ? 'invalid' : ''} character-count`}>
                  {characterCount}
                </label>
                <button
                  type="submit"
                  className="btn rounded"
                  disabled={characterCount === 800 || characterCount < 0 || this.form.$('message').disabled}
                >
                  Respond
                </button>
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
    let label = 'Attach files here';
    if (e.target.files.length === 1) {
      this.props.ReportOverviewStore.setLabel('1 file selected');
    } else {
      this.props.ReportOverviewStore.setLabel(`${e.target.files.length} files selected`);
    }
    this.setState({ label: label });
    this.form.$('files').value = Array.from(e.target.files);
  }
}