import React, { useRef, useEffect } from 'react';

const VideoManager = ({ videoStream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoStream && videoRef.current) {
      videoRef.current.srcObject = videoStream;
      videoRef.current.play();
    }
  }, [videoStream]);

  return <video ref={videoRef} width="210" height="180" autoPlay />;
};

const OpenCameraTab = ({ setVideoStream }) => {
  const openCamera = () => {
    const newTab = window.open('', 'Camera', 'width=210,height=180,top=100,left=100,menubar=no,toolbar=no,location=no,resizable=no');

    if (newTab) {
      newTab.document.write('<div id="video-root"></div>');

      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          setVideoStream(stream);

          // Send the stream object to the new tab using postMessage
          newTab.postMessage({ type: 'videoStream', streamId: stream.id }, '*');

          // Handle receiving the video stream in the new tab
          newTab.addEventListener('message', (event) => {
            if (event.data.type === 'videoStream') {
              const videoElement = newTab.document.createElement('video');
              videoElement.autoplay = true;
              videoElement.width = 210;
              videoElement.height = 180;
              newTab.document.getElementById('video-root').appendChild(videoElement);
              
              navigator.mediaDevices.enumerateDevices().then((devices) => {
                const videoDevice = devices.find(device => device.kind === 'videoinput' && device.deviceId === event.data.streamId);
                if (videoDevice) {
                  videoElement.srcObject = stream;
                }
              });
            }
          });
        })
        .catch(err => console.error('Error accessing the camera:', err));
    }
  };

  useEffect(() => {
    openCamera();
  }, []);

  return null;
};

const App = () => {
  const [videoStream, setVideoStream] = React.useState(null);

  return (
    <div>
      <OpenCameraTab setVideoStream={setVideoStream} />
    </div>
  );
};

export default App;
