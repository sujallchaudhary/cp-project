// developer: Sujal Chaudhary(CSAI)
const resultsContainer = document.getElementById('resultsContainer');
document.getElementById('studentForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const studentName = document.getElementById('studentName').value;
  const year = document.getElementById('year').value;
  const submitButton = document.querySelector('#studentForm button[type="submit"]');
  
  submitButton.disabled = true;

  try {
    const response = await fetch('https://rollnoapi.sujal.info/search_student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: studentName ,year})
    });

    const data = await response.json();
    resultsContainer.innerHTML = '';
    if(data.error){
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="py-2 px-4 border-b" colspan="6">${data.error}</td>
      `;
      tbody.appendChild(row);
    } else {
      data.forEach(student => {
        const studentCard = document.createElement('div');
        studentCard.className = 'bg-transparent p-6 rounded-lg shadow-xl space-y-4';

        studentCard.innerHTML = `
          <div class="flex justify-between">
            <span class="text-lg font-semibold">Name:</span>
            <span class="text-lg">${student.studentName}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-lg font-semibold">Roll No:</span>
            <span class="text-lg">${student.rollNo}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-lg font-semibold">Email:</span>
            <span class="text-lg">${student.email}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-lg font-semibold">Father's Name:</span>
            <span class="text-lg">${student.fatherName}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-lg font-semibold">Branch:</span>
            <span class="text-lg">${student.specialization}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-lg font-semibold">Section:</span>
            <span class="text-lg">${student.section}</span>
          </div>
          </div>
        `;
        resultsContainer.appendChild(studentCard);
      });
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    submitButton.disabled = false;
  }
});