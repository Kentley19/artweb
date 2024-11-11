import React, { useState } from 'react';
const DocumentViewer = ({ filePath }) => {
  const fileUrl = `https://6eb1-136-158-33-206.ngrok-free.app/${filePath}`;
console.log(fileUrl);
const officeapps = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
console.log(officeapps);
  return (
    <iframe
      src={officeapps}
      width="100%"
      height="600"
      style={{ border: 'none' }}
      title="Document Viewer"
    ></iframe>
  );
};

export default DocumentViewer;
