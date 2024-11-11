import React, { useState, useRef, useEffect } from "react";
import ART3RemovebgPreview1 from "./assets/img-art-3-removebg-preview-1.png";
import arrowDropDown from "./assets/img-arrow-drop-down.svg";
import calendarRemovebgPreview1 from "./assets/img-calendar-removebg-preview-1.png";
import notifRemovebgPreview1 from "./assets/img-notif-removebg-preview-1.png";
import playRemovebgPreview1 from "./assets/img-play-removebg-preview-1.png";
import logoutIMG from "./assets/logout2.png";
import register from "./assets/register.png";
import subject from "./assets/subject.png";
import "./assets/style.css";
import upload from "./assets/img-upload.svg";
import Recorder from './assets/recording';
import UploadVideo from './components/RecordUploadsVideo';
import AnnouncementView from './components/announcementView';
import CalendarView from './components/CalendarView';
import SubjectCreate from './components/SubjectCreate';
import SubjectView from './components/SubjectView';
import RegisterForm from './RegisterForm';
import LoginBacklogList from "./components/LoginBacklog";

export const Main = () => {
  const [authAdmin, setAuthAdmin] = useState(false);
  const [filesSelected_Activity, setSelectedFiles_Activity] = useState([]);
  const [filesSelected_Announcement, setSelectedFiles_Announcement] = useState([]);
  const editorRef = useRef(null);
  const [tab, setTab] = useState(0);
  const [opt, setOpt] = useState(0);
  const [obj, setObj] = useState(null);

  const [fileCurrent, setFileCurrent] = useState(null);

  const [post, setPost] = useState([]);
  const [newContent, setNewContent] = useState('');

  const [formData, setFormData] = useState({
    id: 0,
    title: '',
    room: '',
    teacher_id: '',
  });
  useEffect(() => {
    getAuth();
  }, [])
  const getAuth = async () => {

    try {
      const response = await fetch('/get/auth', {
        method: 'Get',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        },
      });

      const result = await response.json();
    
      if (response.ok) {
        setAuthAdmin(result.auth.type);
      } else {
        console.error(result.message || 'An error occurred.');
      }
    } catch (error) {
      console.error(error + 'An error occurred. Please try again.');
    }
  };
  const handleAddPost = () => {
    // Create a new post
    const newPost = {
      filePath: fileCurrent, // You can modify this to match your logic
      content: newContent,
    };
    // Update the post state
    setPost([...post, newPost]);
    setNewContent(''); // Clear the input after adding
  };

  const OnclickTab = (e) => {
    setTab(e);
  }

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // Optional: Change border style when dragging over
    if (editorRef.current) {
      editorRef.current.style.border = "2px dashed #000";
    }
  };

  const handleDragLeave = () => {
    if (editorRef.current) {
      editorRef.current.style.border = "1px solid #ccc"; // Revert border
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;

    // Handle only image files
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const img = document.createElement('img');
        img.src = e.target.result;

        img.style.maxHeight = '200px'; // Ensure the image fits within the editor
        img.style.display = 'inlineblock'; // Make images block elements
        img.onclick = () => selectElement(img);
        editorRef.current.appendChild(img); // Append the image to the contenteditable div
      };

      reader.readAsDataURL(files[0]); // Convert the image file to a data URL
    } else if (files.length > 0 && files[0].type.startsWith('video/')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const video = document.createElement('video');
        video.src = e.target.result;
        // video.style.marginLeft='auto';
        // video.style.marginRight='auto';
        video.controls = true; // Add controls for video playback
        video.style.maxWidth = '70%'; // Ensure the video fits within the editor

        video.style.cursor = 'pointer';
        video.style.display = 'block'; // Make videos block elements
        video.onclick = () => selectElement(video);
        editorRef.current.appendChild(video);
        // Append the video to the contenteditable div
      };
      reader.readAsDataURL(files[0]); // Convert the video file to a data URL
    }

    handleDragLeave(); // Reset border style after drop
  };
  const selectElement = (element) => {
    // Remove existing selection
    setObj(element);

  };

  const handleKeyDown = (event) => {
    const selectedElement = obj;
    if (event.key === 'Backspace') {
      // If the selected element is an image or video, remove it
      if (selectedElement && (selectedElement.tagName === 'IMG' || selectedElement.tagName === 'VIDEO')) {
        selectedElement.remove();
        event.preventDefault(); // Prevent the default backspace behavior
      } else {

      }
    }
  };

  return (
    <div className="frame">
      <div className="div">
        <div className="overlap-group">
          <div className="leftSide" >
            <div className="leftDiv">
              <img src={ART3RemovebgPreview1} ></img>
            </div>

            <button onClick={(e) => OnclickTab(0)} className={tab == 0 ? 'leftButton p2 active' : "leftButton p2"}>
              <img src={notifRemovebgPreview1} ></img>
            </button>
            <button onClick={(e) => OnclickTab(1)} className={tab == 1 ? 'leftButton p1 active' : "leftButton p1"}>
              <img src={playRemovebgPreview1} ></img>
            </button>
            <button onClick={(e) => OnclickTab(2)} className={tab == 2 ? 'leftButton p1 active' : "leftButton p1"}>
              <img src={calendarRemovebgPreview1} ></img>
            </button>
            {authAdmin === "admin" &&
            <button onClick={(e) => OnclickTab(3)} className={tab == 3 ? 'leftButton p1 active' : "leftButton p1"}>
              <img style={{
                padding: '10px',
              }} src={register} ></img>
            </button>
            }
            <button onClick={(e) => OnclickTab(4)} className={tab == 4 ? 'leftButton p1 active' : "leftButton p1"}>
              <img src={subject} ></img>
            </button>
              <button onClick={(e) => OnclickTab(5)} className={tab == 5 ? 'leftButton p1 active' : "leftButton p1"}>
                <img src={subject} ></img>
              </button>
          </div>
          <div style={{
            maxHeight: '95vh',
            width: '90%',
          }}>
            {tab == 0 ? <>
              <div style={{
                width: '98%',
              }}>
                <div style={{
                  padding: 5,
                  margin: 15,
                  fontSize: 'x-large',
                  fontWeight: 'bold',
                }}>Announcement</div>
                <AnnouncementView fileCurrent={fileCurrent} setSelectedFiles={setSelectedFiles_Announcement} filesSelected={filesSelected_Announcement} post={post} handleAddPost={handleAddPost} newContent={newContent} setNewContent={setNewContent}></AnnouncementView>

              </div>
            </>
              : tab == 1 ? <>
                <div style={{
                  display: 'flex',
                  width: '100%',
                  height: '90vh',
                }}>

                  <div style={{
                    backgroundColor: '#d5d5d5',
                    width: '40%',
                    margin: 10,
                    marginBottom: 35,
                  }}>
                    <Recorder setFileCurrent={setFileCurrent} handleAddPost={handleAddPost}></Recorder>
                  </div>
                  <div style={{
                    backgroundColor: '#d5d5d5',
                    width: '58%',
                    marginTop: 10,
                    marginBottom: 10,

                  }}>
                    <h2 style={{ textAlign: 'center' }}>Uploads Activity:  </h2>
                    <UploadVideo setSelectedFiles={setSelectedFiles_Activity} filesSelected={filesSelected_Activity} post={post} handleAddPost={handleAddPost} newContent={newContent} setNewContent={setNewContent}></UploadVideo>
                  </div>
                </div>
              </> : tab == 2 ? <>
                <CalendarView></CalendarView>
              </> : tab == 3 ? <>
                <RegisterForm authAdmin={authAdmin}></RegisterForm>
              </> :tab == 4 ? <>
                <div style={{
                  margin: '1%',
                  width: '88%',
                  backgroundColor: 'gray',
                  position: 'absolute',
                  height: '96%',
                  borderRadius: '10px',
                  display: 'flex'
                }}>
                  <SubjectCreate formData={formData} setFormData={setFormData}></SubjectCreate>
                  <SubjectView formData={formData} setFormData={setFormData} ></SubjectView>
                </div>
              </>:<>
              <LoginBacklogList></LoginBacklogList>
              </>


            }
            
            <a href="/logout" style={{
              position: 'absolute',
              top: 0,
              right: 0,
              marginRight:35,
              textDecoration: 'none',
              padding: 5, 
              fontWeight: 'bold',
              "&hover": {
                color: 'white'
              }
            }}>
             <img src={logoutIMG} style={{
              width:'2em',height:'2em'
             }}></img>  
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};