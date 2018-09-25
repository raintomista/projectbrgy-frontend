import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCloudDownloadAlt from '@fortawesome/fontawesome-free-solid/faCloudDownloadAlt';
import './FileContent.less';

const FileContent = (props) => {
  return (
    <div className="file-content">
      <div className="file-info">
        <a
          href={props.attachments[0].link}
          className="filename"
          target="_blank"
        >
          {props.attachments[0].filename}
        </a>
        <div className="details">dropbox.com</div>
      </div>

      <button type="button" title="Download file" onClick={() => downloadFile(props.attachments[0].link)}>
        <FontAwesomeIcon icon={faCloudDownloadAlt} />
      </button>

    </div>
  );
}

function downloadFile(link) {
  window.open(link.replace('dl=0', 'dl=1'), '_blank');
}


export default FileContent;