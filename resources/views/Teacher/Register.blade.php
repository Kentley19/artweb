<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>ART - Teacher Login</title> 
  </head>
  <style>
body {font-family: Arial, Helvetica, sans-serif;}

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

/* Extra styles for the cancel button */
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

/* Center the image and position the close button */
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
  position: relative;
}

img.avatar {
  width: 30%;
  border-radius: 50%;
}

.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

/* The Modal (background) */
.modal { 
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  padding-top: 60px;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  width: 50%; /* Could be more or less, depending on screen size */
}

/* The Close Button (x) */
.close {
  position: absolute;
  right: 25px;
  top: 0;
  color: #000;
  font-size: 35px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: red;
  cursor: pointer;
}

/* Add Zoom Animation */
.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s
}

@-webkit-keyframes animatezoom {
  from {-webkit-transform: scale(0)} 
  to {-webkit-transform: scale(1)}
}
  
@keyframes animatezoom {
  from {transform: scale(0)} 
  to {transform: scale(1)}
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
     display: block;
     float: none;
  }
  .cancelbtn {
     width: 100%;
  }
}
</style>
  <body>  

<div id="id01" class="modal">
  
  <form class="modal-content animate" action="{{ route('register') }}" method="post">
  @csrf
    <div class="imgcontainer"> 
      <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" class="avatar">
    </div>

    <div class="container">
  <h2>
    Register
  </h2>
  @if (session()->has('success'))
  <span class="text-sm" style="color:rgb(0, 156, 34);">
      {{ session()->get('success') }}
  </span><br>
@endif

  @if ($errors->has('school_id'))
  <span class="text-red-500 text-sm" style="color:red;">{{ $errors->first('school_id') }}</span><br>
  @endif
      <label for="fname"><b>First Name:</b></label>
      <input type="text" placeholder="Enter First Name" name="fname" required>
      @error('fname')
          <span class="text-red-500 text-sm">{{ $message }}</span>
      @enderror
      <label for="mname"><b>Middle  Name:</b></label>
      <input type="text" placeholder="Enter Middle Name" name="mname" required>
      @error('mname')
          <span class="text-red-500 text-sm">{{ $message }}</span>
      @enderror
      <label for="lname"><b>Last  Name:</b></label>
      <input type="text" placeholder="Enter Last Name" name="lname" required>
      @error('lname')
          <span class="text-red-500 text-sm">{{ $message }}</span>
      @enderror
      <label for="school_id"><b>School ID:</b></label>
      <input type="text" placeholder="Enter School ID" name="school_id" required>
      @error('school_id')
          <span class="text-red-500 text-sm">{{ $message }}</span>
      @enderror

      <div>
        <label for="type"><b>Account Type:</b></label>
        <select name="type" required>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
        </select>
    </div>
    <br>
      <label for="psw"><b>Password:</b></label>
      <input type="password" placeholder="Enter Password" name="password" required>
      @error('password')
          <span class="text-red-500 text-sm">{{ $message }}</span>
      @enderror
        
      <button type="submit">Register</button>
      <label>
        <input type="checkbox" checked="checked" name="remember"> Remember me
      </label>  
    </div>

    <div class="container" style="background-color:#f1f1f1">
      <button type="button" onclick="window.location.href = '/faculty/login'" class="cancelbtn">Cancel</button> 
      <span class="psw">Forgot <a href="#">password?</a></span>
    </div>
  </form>
</div>

<script>
// Get the modal 
</script>
  </body>
</html>
