import React, { useRef, useEffect, useState } from 'react';
import './Recorder.css';

const Recorder = ({setFileCurrent, handleAddPost}) => {
  const videoRef = useRef(null); // For displaying screen video
  const cameraRef = useRef(null); // For displaying camera video
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [screenPermissionGranted, setScreenPermissionGranted] = useState(false);

  const [videoCamera, setVideoCamera] = useState(null);
  const [videoScreen, setVideoScreen] = useState(null);
  const [cameras, setCameras] = useState([]); // List of available cameras
  const [selectedCameraId, setSelectedCameraId] = useState(''); // Selected camera


  useEffect(() => {
    const getCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setCameras(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedCameraId(videoDevices[0].deviceId); // Default to the first camera
        }
      } catch (error) {
        console.error("Error getting camera devices:", error);
      }
    };

    getCameras();
  }, []);

  useEffect(() => {
    if (selectedCameraId) {
      GetSelectedCamera();
    }
  }, [selectedCameraId]);

  const GetSelectedCamera = async () => {
    try {
      const ThisvideoStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: selectedCameraId ? { exact: selectedCameraId } : undefined },
        audio: true,
      });
      cameraRef.current.srcObject = ThisvideoStream;
      setVideoCamera(ThisvideoStream);
    } catch (error) {
      console.error("Error getting camera stream:", error);
    }
  };

  const OpenScreenRecord = async () => {
    try {
      // Request screen sharing
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      setVideoScreen(screenStream);
      videoRef.current.srcObject = screenStream;
      setScreenPermissionGranted(true);
      await startRecording(screenStream, true); // Start recording after screen selection
    } catch (err) {
      console.error("Error accessing display media.", err);
    }
  };

  const startRecording = async (screenStream, screenPermissionGranted) => {
    if (screenPermissionGranted) {
      const combinedStream = new MediaStream([
        ...screenStream.getVideoTracks(),
        ...screenStream.getAudioTracks(),
        ...videoCamera.getAudioTracks(), // Use camera audio
      ]);

      const recorder = new MediaRecorder(combinedStream);
      setMediaRecorder(recorder);
      recorder.ondataavailable = (event) => {
        const videoBlob = new Blob([event.data], { type: 'video/webm' }); 
        const url = URL.createObjectURL(videoBlob);
        setFileCurrent(url);
        
        setFileCurrent(url);
        handleAddPost();
        const a = document.createElement('a');
        a.href = url;
        a.download = 'recording.webm';
        a.click();
        URL.revokeObjectURL(url);
      };
      
      recorder.onstart = () => {
        // Start recording
        setRecording(true);
      };

      console.log('Record init');
      recorder.onstop = () => {
        setRecording(false); // Update recording state when stopped
      };
    }
  };

  const handleCloseScreenRecord = () => {
    videoScreen.getTracks().forEach(track => track.stop());
  };
  const handleOpenScreenRecord = () => {
    OpenScreenRecord(); // Start screen recording directly on button click 
  };
  const handleStartRecording = () => {

    if (mediaRecorder) {
      console.log('started');
      mediaRecorder.start(); // Stop recording
    } else {

      console.log('no recording');
    }
  };

  const handleStopRecording = () => {
    console.log('stoped');
    if (mediaRecorder) {
      mediaRecorder.stop(); // Stop recording
    }
  };

  const handleEnterPip = async () => {
    if (cameraRef.current) {
      try {
        await cameraRef.current.requestPictureInPicture(); // Request PiP mode
      } catch (error) {
        console.error("Error entering Picture-in-Picture mode:", error);
      }
    }
  };

  return (
    <div className="recorder-container" style={{padding:15}}>
      <div>
        <label>Select Camera:</label>
        <select
          value={selectedCameraId}
          onChange={(e) => setSelectedCameraId(e.target.value)}
        >
          {cameras.map((camera) => (
            <option key={camera.deviceId} value={camera.deviceId}>
              {camera.label || `Camera ${camera.deviceId}`}
            </option>
          ))}
        </select>
      </div>
      <div className="video-container" style={{height:'78vh' ,aspectRatio:'16/9'}}>
        <video ref={videoRef} autoPlay muted className="screen-video" style={{width:'100%',aspectRatio:'16/9'}}/>
        <video ref={cameraRef} autoPlay muted onLoadedMetadata={handleEnterPip} className="camera-video" />
      </div>
      <br />
      <button onClick={!screenPermissionGranted ? handleOpenScreenRecord : handleCloseScreenRecord}>
        {screenPermissionGranted ? 'Stop Share Screen' : 'Start Share Screen'}
      </button>
      {screenPermissionGranted && 
      <button style={{ backgroundColor: recording ? 'red' : '' }} onClick={recording ? handleStopRecording : handleStartRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>}

    </div>
  );
};

export default Recorder;
