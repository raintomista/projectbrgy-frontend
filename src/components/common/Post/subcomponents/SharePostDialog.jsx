import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';

// Subcomponents
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SharedPost from './SharedPost';
import SharePostDialogForm from './SharePostDialogForm';

// Stylesheet
import './SharePostDialog.less';


// TODO: Handle modal cancel during await

@observer
export default class SharePostDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
    this.form = new SharePostDialogForm(props.toggle, () => this._toggleLoader());
    this.form.select('sharedPostId').set('value', this.props.sharedPostId);
  }

  render() {
    let characterCount = 100 - this.form.values().shareCaption.length;

    return (
      <Modal
        backdrop="static"
        className="share-post-dialog"
        centered={true}
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        size="md"
      >
        <div className={`overlay ${!this.state.isLoading ? 'hidden' : ''}`}>
          <object data="images/loader.svg" type="image/svg+xml">
          </object>
        </div>
        <ModalHeader toggle={this.props.toggle}>
          {this.props.loggedUser && this.props.loggedUser.user_role === 'barangay_member' ?
            'Share on your profile' :
            'Share on your barangay page'
          }
        </ModalHeader>
        <ModalBody>
          <textarea
            row="1"
            // onChange={(e) => this._handleAutoResize(e.target)}
            {...this.form.select('shareCaption').bind()}
          ></textarea>
          <SharedPost
            attachments={this.props.attachments}
            sharedPostId={this.props.sharedPostId}
            sharedPostAuthor={this.props.sharedPostAuthor}
            sharedPostAuthorId={this.props.sharedPostAuthorId}
            sharedPostAuthorImg={this.props.sharedPostAuthorImg}
            sharedPostDate={this.props.sharedPostDate}
            sharedPostLocation={this.props.sharedPostLocation}
            sharedPostMessage={this.props.sharedPostMessage}
          />
        </ModalBody>
        <ModalFooter>
          <div className={`${characterCount < 0 ? 'exceeded' : ''} character-count`}>
            {characterCount}
          </div>
          <Button className="btn rounded cancel" onClick={this.props.toggle} disabled={this.form.disabled}>Cancel</Button>
          <Button className="btn rounded" onClick={this.form.onSubmit} disabled={this.form.disabled || characterCount < 0}>Post</Button>
        </ModalFooter>
      </Modal>
    );
  }

  _toggleLoader() {
    this.setState((prevState) => ({
      isLoading: !prevState.isLoading
    }));
  }
}

SharePostDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  loggedUser: PropTypes.object,
  sharedPostId: PropTypes.string.isRequired,
  sharedPostAuthor: PropTypes.string.isRequired,
  sharedPostAuthorId: PropTypes.string.isRequired,
  sharedPostAuthorImg: PropTypes.string.isRequired,
  sharedPostDate: PropTypes.string.isRequired,
  sharedPostLocation: PropTypes.string.isRequired,
  sharedPostMessage: PropTypes.string
}