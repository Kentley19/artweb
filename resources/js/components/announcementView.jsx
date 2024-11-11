import React, { useEffect, useRef, useState } from "react";
import FileImageView from './fileImageView';

const RecordUploads = ({ post, handleAddPost }) => {
  const fileInput = useRef(null);
  const [hoverAttach, setHoverAttach] = useState(false);
  const [newContent, setNewContent] = useState('');

  const [filesSelected, setSelectedFiles] = useState([]);
  const [announcement, setAnnouncement] = useState([]);
  const [fileUrl, setFileUrl] = useState([]);
  const [announcementID, setannouncementID] = useState('');
  const onClickSelectFile = () => {
    fileInput.current.click();
  };

  const handleFileSelection = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to array
    const totalFiles = [...filesSelected, ...selectedFiles];

    // Check if total selected files exceed the limit of 5
    if (totalFiles.length > 5) {
      alert('You can only upload up to 5 files.');
      return;
    }

    setSelectedFiles(totalFiles); // Set new files in state
  };

  const removeFile = (indexToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file, index) => index !== indexToRemove)
    );
  };
  const removeFileUrl = (idToRemove) => {
    setFileUrl((prevFiles) => {
      const updatedFiles = prevFiles.filter(file => file.id !== idToRemove); // Use file.id if idToRemove is the file ID
      console.log('updatedFiles', updatedFiles); // Log the updated state here
      return updatedFiles; // Return the updated state
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    
    filesSelected.forEach((file, index) => {
      formData.append(`files[${index}]`, file); // Using an indexed key format
      console.log(`${index}:G:`, file);
    }); 

    Array.from(formData.entries()).forEach(([key, value]) => {
      console.log(`${key}:G:`, value);
    });
    try {


      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload Successful:', response.data);

      setNewContent('');
      setSelectedFiles([]); setFileUrl([]);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Log validation errors
        console.error('Validation Errors:', error.response.data.errors);
      } else {
        console.error('Upload Failed:', error);
      }
    }
  };
  const deletePost = () => {

    axios.delete(`/api/delete/` + announcementID)
      .then(response => {
        
        console.log(response.data.message);
        setannouncementID('');
        setFileUrl([]);
      })
      .catch(error => {
        console.error('Error fetching the announcement:', error);
      });

  }
  useEffect(() => {
    // Fetch the announcement and files when the component mounts
    axios.post(`/api/getupload`)
      .then(response => {
        setAnnouncement(response.data.announcements);
      })
      .catch(error => {
        console.error('Error fetching the announcement:', error);
      });
  }, [announcementID, filesSelected]);
  const onClickeditHandle = (id, content, files) => {
    setannouncementID(id);
    setNewContent(content);
    console.log(files);
    setFileUrl(files);
    setSelectedFiles([]);
  }
  return (
    <div style={{
      padding: 5,
      width: '100%',
      display: 'flex'
    }}>

      <form style={{
        margin: 'auto',
        width: '100%'
      }} onSubmit={handleSubmit} method="post" action="/api/upload">
        <textarea
          type="text"
          name="announcement"
          className="upload_text"
          style={{
            width: '94%',
            border: 'none',
            padding: 10,
            marginTop: 10,
            marginLeft: 10,
          }}
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Announce Something to your class"
          required
        />
        <br />

        <div
          style={{
            border: hoverAttach ? 'dashed 2px white' : 'dashed 2px gray',
            padding: 10,
            textAlign: 'center',
            cursor: 'pointer',
            margin: 10,
            minHeight: 200
          }}
          onClick={onClickSelectFile}
          onMouseEnter={() => setHoverAttach(true)}
          onMouseLeave={() => setHoverAttach(false)}
        >
          <label>Attach File</label>
          <p style={{ fontSize: '10px', color: 'gray' }}>max 5 files only</p>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {filesSelected.map((file, index) => (
              <div key={index} style={{ marginRight: '10px' }}>
                <FileImageView
                  removeFile={() => removeFile(index)} // Pass the remove function
                  file={file}
                  url={false}
                />
              </div>
            ))}
            {fileUrl && fileUrl.map((file, index) => (
              <div key={index} style={{ marginRight: '10px' }}>
                <FileImageView
                  index={index}
                  file={false}
                  removeFile={() => removeFileUrl(file.id)} // Pass the remove function
                  url={file.file_path ? file.file_path : ''}
                />
              </div>
            ))}
          </div>
        </div>
        <input type="hidden" name="announcementID" value={announcementID} />
        <input type="hidden" name="fileUrl" value={JSON.stringify(fileUrl)} />
        <input
          type="file"
          name="files[]"
          aria-label="" 
          onChange={handleFileSelection}
          multiple
          ref={fileInput}
          hidden
          accept="video/mp4, .mp4, video/avi, .avi, application/pdf, .pdf, application/msword, .doc, .docx, application/vnd.ms-excel, .xls, .xlsx, application/vnd.ms-powerpoint, .ppt, .pptx, image/png, .png, image/jpg, .jpg, image/jpeg, .jpeg"

        />

        <button
          type="submit"
          style={{
            marginTop: 10,
            borderRadius: 5
          }}
        >
          {announcementID ? 'Save Edit' : 'Add Post'}
        </button>
        {announcementID && <>

          <button
            style={{
              marginTop: 10,
              borderRadius: 5
            }}
            onClick={() => onClickeditHandle('', '', [])}
          >
            Cancel
          </button>
          <button type="button"
            style={{
              marginTop: 10,
              borderRadius: 5
            }}
            onClick={() => deletePost()}
          >
            Delete
          </button>
        </>}
      </form>

      <div style={{
        height: '70vh',
        overflow: 'auto',
        width: '70%',
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'gray'
      }}>
        {announcement && announcement.map((item, index) => (
          <div key={index} style={{
            border: 'solid 1px',
            padding: 15,
            margin: 5,
            backgroundColor: 'lightgray'
          }}>
            <p>Content: {item.content}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {item.files.map((file, index) => {
                // Function to get the file extension
                const getFileExtension = (filePath) => {
                  return filePath.split('.').pop().toLowerCase();
                };

                const fileExtension = getFileExtension(file.file_path);
                const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
                const isVideo = ['mp4', 'mov', 'webm'].includes(fileExtension);

                return (
                  <div key={index}>
                    {isImage && (
                      <img
                        src={'/storage/' + file.file_path}
                        alt={`Uploaded content ${index}`}
                        style={{ maxHeight: '60px', width: '95%' }}
                      />
                    )}

                    {isVideo && (
                      <video controls style={{ maxHeight: '60px' }}>
                        <source src={'/storage/' + file.file_path} type={`video/${fileExtension}`} />
                        Your browser does not support the video tag.
                      </video>
                    )}

                    {!isImage && !isVideo && (
                      <button onClick={()=>window.open('/storage/' + file.file_path,'_blank')}>{fileExtension}</button>
                    )}
                  </div>
                );
              })}

            </div>
            <button onClick={() => onClickeditHandle(item.id, item.content, item.files)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordUploads;
