import React, { useEffect, useState } from 'react';

function FileImageView({ file, removeFile, index, url }) {
    console.log(file);
    const getFileExtension_url = (url) => {
        return url.split('.').pop().toLowerCase();
    };
    const getFileExtension_file = (filet) => {
        return filet.name.split('.').pop().toLowerCase();
    };
    const fileExtension = file ? getFileExtension_file(file) : getFileExtension_url(url);
    const isVideo = ['mp4', 'mov', 'webm'].includes(fileExtension);
    const isImage = ['png', 'jpeg', 'jpg'].includes(fileExtension); 
    return (
        <>
            <div style={{
                borderTop: 'solid 1px',
                borderBottom: 'solid 1px',
                maxHeight: '50px',
                width: '100%',
                minWidth: '200px',
                margin: 2,
                display: 'flex'
            }}>
                {isVideo ? (
                    <video
                        src={url ? 'storage/' + url : URL.createObjectURL(file)}
                        disablePictureInPicture

                        muted
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxWidth: '50px',
                            maxHeight: '50px',
                            aspectRatio: '1/1',
                            objectFit: 'cover',
                        }}
                    />
                ) : isImage ? (
                    <img
                        src={url ? 'storage/' + url : URL.createObjectURL(file)}
                        alt={url ? 'storage/' + url : file}
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxWidth: '50px',
                            maxHeight: '50px',
                            aspectRatio: '1/1',
                            objectFit: 'cover',
                        }}
                    />
                )
                    : <button
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxWidth: '50px',
                            maxHeight: '50px',
                            aspectRatio: '1/1',
                            objectFit: 'cover',
                        }}>
                        {file && fileExtension}
                    </button>
                }
                <div>

                    <label style={{ padding: 10, fontSize: '12px' }}>
                        {
                            url ?
                                isVideo ? 'video ' + (index + 1)
                                    :
                                    isImage ? 'image ' + (index + 1)
                                        :
                                        'File ' + (index + 1) + '.' + fileExtension
                                : file.name
                        }
                    </label><br></br>

                    <button type='button' style={{
                        height: '20px', fontSize: '10px',
                        backgroundColor: 'red',
                        color: 'white',
                        borderRadius: 10

                    }}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent the click event from bubbling up
                            removeFile();
                        }}
                    >Remove</button>
                </div>
            </div>
        </>
    )
}
export default FileImageView;