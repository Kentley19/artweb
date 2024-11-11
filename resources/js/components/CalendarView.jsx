import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import './CalendarStyles.css'; // Custom styles (see below)

const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());


  const [activities, setActivity] = useState([
    { dateDue: '2024-10-18' }, // Example activity: not due
    { dateDue: '2024-10-20'},    // Example activity: due
    // Add more activities as needed
  ]);

  const getActivityStatus = (date) => {
    if (!activities || activities.length === 0) return null; // Ensure activities array exists and is not empty
  
    const today = new Date(); // Get today's date
    const dateString = new Date(date).toISOString().split('T')[0]; // Format the given date to 'YYYY-MM-DD'
  
    // Find if any activity has a due date that exactly matches the formatted date
    const activityForDate = activities.find((activity) => {
      const activityDateString = new Date(activity.dateDue).toISOString().split('T')[0]; // Format activity due date
      return activityDateString === dateString;
    });
  
    if (!activityForDate) return null; // If no activity is found for the date, return null
  
    // Compare the due date with today's date
    const activityDueDate = new Date(activityForDate.dateDue);
  
    if (activityDueDate < today) {
      return 'due'; // If the activity's due date is in the past
    } else if (activityDueDate.toDateString() === today.toDateString()) {
      return 'today'; // If the activity's due date is today
    } else {
      return 'active'; // If the activity's due date is in the future
    }
  };
  



  useEffect(() => {
    getActivity();
  }, [])
  const getActivity = async () => {

    try {
      const response = await fetch('/get/calendar/activity', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setActivity(result.uploads);
        console.log(result.uploads);
      } else {
        console.error(result.message || 'An error occurred.');
      }
    } catch (error) {
      console.error(error + 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="calendar-container">
      <h2>Activity Calendar</h2>
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date }) => {
          const status = getActivityStatus(date);
          return status === 'active' ? 'tile-active' : status === 'due' ? 'tile-due' : null;
        }}
      />
    </div>
  );
};

export default CustomCalendar;
