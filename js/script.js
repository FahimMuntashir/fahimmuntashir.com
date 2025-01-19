// Fetch data and handle errors
async function fetchData() {
    try {
      const response = await fetch('data.json');
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      console.log("Fetched data:", data);
      displayData(data); // Display all data initially
      enableSearch(data); // Add search functionality
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  // Efficiently display data
  function displayData(data) {
    const tableBody = document.getElementById('courseTable');
    let rows = '';
    data.forEach(item => {
      rows += `<tr>
        <td>${item.Course}</td>
        <td>${item.Section}</td>
        <td>${item.Faculty}</td>
        <td>${item.Time}</td>
        <td>${item.Room}</td>
        <td>${item.Semester}</td>
      </tr>`;
    });
    tableBody.innerHTML = rows;
  }
  
  // Debounce function to optimize search
  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }
  
  // Enable search with debounced filtering
  function enableSearch(data) {
    const courseInput = document.getElementById('searchCourse');
    const facultyInput = document.getElementById('searchFaculty');
  
    const filterData = () => {
      const course = courseInput.value.toLowerCase();
      const faculty = facultyInput.value.toLowerCase();
      const filteredData = data.filter(item =>
        item.Course.toLowerCase().includes(course) &&
        item.Faculty.toLowerCase().includes(faculty)
      );
      displayData(filteredData);
    };
  
    courseInput.addEventListener('input', debounce(filterData, 300));
    facultyInput.addEventListener('input', debounce(filterData, 300));
  }
  
  // Initialize the script
  fetchData();
  