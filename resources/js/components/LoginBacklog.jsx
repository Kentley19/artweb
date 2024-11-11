import React, { useEffect, useState } from 'react';

function LoginBacklogList() {
  const [backlogs, setBacklogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchBacklogs = async () => {
      try {
        const response = await fetch('/api/getLoginBacklog');
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setBacklogs(data); // Assuming the response is a JSON array
        } else {
          console.error('Failed to fetch backlogs');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBacklogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  function downloadCSV() {
    const table = document.getElementById('backlogs');
    let csvContent = '';

    // Loop through table rows and cells to gather data
    for (let i = 0; i < table.rows.length; i++) {
      const row = table.rows[i];
      let rowData = [];

      for (let j = 0; j < row.cells.length; j++) {
        rowData.push('"' + row.cells[j].textContent + '"');
      }

      csvContent += rowData.join(',') + '\r\n';
    }

    // Create a download link
    const hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'table_data.csv';
    hiddenElement.click();
  }
  return (
    <div style={{ overflowY: 'auto', height: '95vh', width: '100%' }}>
      <h2>Login Backlogs</h2>
      <button onClick={()=> downloadCSV()}>Downloads</button>
      {backlogs.length > 0 ? (
        <table border="1" style={{ width: '100%' }} id='backlogs'>
          <thead>
            <tr>
              <th>School ID</th>
              <th>Login Time</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {backlogs.map((backlog) => (
              <tr key={backlog.id}>
                <td>{backlog.school_id}</td>
                <td>{new Date(backlog.login_time).toLocaleString()}</td>
                <td>{new Date(backlog.created_at).toLocaleString()}</td>
                <td>{new Date(backlog.updated_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No login backlogs found.</p>
      )}
    </div>
  );
}

export default LoginBacklogList;
