import React, { useState } from 'react';
import  './assets/RegisterStyle.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fname: '',
    mname: '',
    lname: '',
    school_id: '',
    type: 'teacher',
    password: ''
  });

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

  // Handle form submission without page refresh
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/register', {
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
          fname: '',
          mname: '',
          lname: '',
          school_id: '',
          type: 'teacher',
          password: ''
        });
      } else {
        setErrorMessage(result.message || 'An error occurred.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="modal">
      <form className="modal-content animate" onSubmit={handleSubmit}>
        <div className="imgcontainer">
          {/* <img
            src="https://www.w3schools.com/howto/img_avatar2.png"
            alt="Avatar"
            className="avatar"
          /> */}
        </div>

        <div className="container">
          <h2>Register</h2>

          {successMessage && <span style={{ color: 'rgb(0, 156, 34)' }}>{successMessage}</span>}
          {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
          
          <label htmlFor="fname"><b>First Name:</b></label>
          <input
            type="text"
            className='registerInput'
            name="fname"
            id='fname'
            placeholder="Enter First Name"
            value={formData.fname}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="mname"><b>Middle Name:</b></label>
          <input
            type="text"
            className='registerInput'
            name="mname"
            id='mname'
            placeholder="Enter Middle Name"
            value={formData.mname}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="lname"><b>Last Name:</b></label>
          <input
            type="text"
            className='registerInput'
            name="lname"
            id='lname'
            placeholder="Enter Last Name"
            value={formData.lname}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="school_id"><b>School ID:</b></label>
          <input
            type="text"
            className='registerInput'
            name="school_id"
            id='school_id'
            placeholder="Enter School ID"
            value={formData.school_id}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="type"><b>Account Type:</b></label>
          <select 
            className='registerInput' name="type"  id="type" value={formData.type} onChange={handleInputChange} required>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <label htmlFor="password"><b>Password:</b></label>
          <input
            type="password"
            name="password"
            id='password'
            className='registerInput'
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <button id='registerButton' type="submit">Register</button>

          <label>
            <input type="checkbox" name="remember" defaultChecked /> Remember me
          </label>
        </div>

        <div className="container" style={{ backgroundColor: '#f1f1f1' }}>
          <button
            type="button"
            onClick={() => (window.location.href = '/faculty/login')}
            className="cancelbtn"
          >
            Cancel
          </button>
          <span className="psw">Forgot <a href="#">password?</a></span>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
