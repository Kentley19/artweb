import React, { useEffect, useState } from "react";
function SubjectView({ setFormData,formData }) {
 
    const [formData2, setFormData2] = useState([{
        id: 0,
        title: '',
        room: '',
        teacher_id: '',
        teacher: {
            fname: '',
            lname: '',
            mname: '',
        }
    }]);

    const [hoveredId, setHoveredId] = useState(null);
    useEffect(() => {
        handleSubmit();
    }, [formData])
    const handleSubmit = async () => {

        try {
            const response = await fetch('/subjects/view/all', {
                method: 'Get',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
            });

            const result = await response.json();

            if (response.ok) {
                setFormData2(result); 
            } else {
                console.error(result.message || 'An error occurred.');
            }
        } catch (error) {
            console.error(error + 'An error occurred. Please try again.');
        }
    };
    const handleOnclick = (id, title, room, teacher_id) => {
        setFormData({
            id: id,
            title: title,
            room: room,
            teacher_id: teacher_id,
        })
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
                // alignContent: 'center',
                alignItems: 'center',
            }}>
                {formData2.map((data) =>

                    <div key={data.id} style={{

                        padding: 15,
                        margin: 2,
                        border: hoveredId ==data.id ?'gray solid 1px':'lightgray solid 1px',
                        cursor:'pointer'
                    }}

            onMouseEnter={() => setHoveredId(data.id)}
            onMouseLeave={() => setHoveredId(null)}
                        onClick={() => handleOnclick(data.id,data.title,data.room,data.teacher_id)}
                    >
                        <span style={{
                            fontSize: 'large',
                            fontWeight: 'bold',
                            display: 'block',

                        }}>Subject: {data.title}</span>
                        <span>Room: {data.room}</span><br></br>
                        <span>Teacher: {data.teacher.fname} {data.teacher.mname[0]}. {data.teacher.lname}</span>
                    </div>

                )}
            </div>
        </>
    )
}
export default SubjectView;