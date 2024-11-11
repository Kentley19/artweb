import React, { useEffect, useState } from "react";
function SubjectCreate({ formData, setFormData }) {
    
    const [room, setRoom] = useState([205,206]);
    const [teachers, setTeachers] = useState([
        {
            id: '',
            lname: '',
            mname: '',
            fname: '',
        },
    ]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    useEffect(()=>{
        getTeacher();
    },[])
    const getTeacher = async () => {

        try {
            const response = await fetch('/get/teacher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                }, 
            });

            const result = await response.json();

            if (response.ok) {
                setTeachers(result.teacher); 
            } else {
                console.error(result.message || 'An error occurred.');
            }
        } catch (error) {
            console.error(error + 'An error occurred. Please try again.');
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/subjects/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccessMessage('Registration successful!');
                setErrorMessage('');
                setFormData({
                    id: 0,
                    title: '',
                    room: '',
                    teacher_id: '',
                });
            } else {
                setErrorMessage(result.message || 'An error occurred.');
            }
        } catch (error) {
            setErrorMessage(error + 'An error occurred. Please try again.');
        }
    };
    async function deleteSubject(id) {
        try {
            const response = await fetch(`/subjects/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
            });
    
            const result = await response.json();
            setSuccessMessage('Subject Deleted!'); setFormData({
                id: 0,
                title: '',
                room: '',
                teacher_id: '',
            });
        } catch (error) {
            console.error("Error deleting subject:", error);
        }
    }
    
    return (
        <>

            <div style={{
                width: '45.5%',
                padding: 25,
                marginLeft: 'auto',
                marginRight: 'auto',
                backgroundColor: 'white',
                marginTop: 15,
                marginBottom: 15,
                alignContent: 'center',
                alignItems: 'center',
            }}>
                <form action="/subjects" method="post" onSubmit={handleSubmit}>

                    <label htmlFor="title" style={{ display: 'block' }}>Subject Title</label>
                    <input type="hidden" name="id" id="hidden" value={formData.id}
                        onChange={handleInputChange} />
                    <input
                        type="text"
                        className="registerInput"
                        id="title"
                        name="title"
                        placeholder="Subject Title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    ></input>

                    <label htmlFor="Room" style={{ display: 'block' }}>Room</label>
                    
                    <select
                        className="registerInput"
                        id="Room"
                        name="room"
                        value={formData.room}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled> Select Room</option>
                        {room.map((val) => (
                            <option key={val} value={val}>{val}</option>
                        ))}
                    </select> 
                    <label htmlFor="Teacher" style={{ display: 'block' }}>Teacher</label>
                    <select
                        name="teacher_id"
                        className="registerInput"
                        id="Teacher"
                        value={formData.teacher_id}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled> Select Teacher</option>
                        {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>{teacher.fname} {teacher.mname[0]}. {teacher.lname}</option>
                        ))}
                    </select>
                    <button type="submit" id='registerButton'>{formData.id ? 'Update Subject' : 'Create Subject'}</button>
                    {formData.id!=0 && <button type="button" className='cancelbtn' onClick={()=>deleteSubject(formData.id)}>Delete Subject</button>}
                    {formData.id!=0 && <button type="button" className='clearbtn' onClick={() => setFormData({
                        id: 0,
                        title: '',
                        room: '',
                        teacher_id: '',
                    })}>Cancel</button>}

                    {successMessage && <span style={{ color: 'rgb(0, 156, 34)' }}>{successMessage}</span>}
                    {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
                </form>
            </div>
        </>
    )
}
export default SubjectCreate;