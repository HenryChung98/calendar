// create calender funcition
function createCalendar(year, month, today) {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay(); // 주의 첫 날짜의 인덱스

  const calendarContainer = document.getElementById('calendarBox');

  // create table
  const table = document.createElement('table');

  // create month header
  const monthHeader = table.createTHead();
  const monthRow = monthHeader.insertRow();
//   const monthCell = monthRow.insertCell();

//   monthCell.colSpan = 7;
//   monthCell.textContent = monthNames[month - 1];
//   monthCell.style.fontSize = '30px';
//   monthCell.style.width = '1200px';

  // create days header
  const headerRow = table.insertRow();
  daysOfWeek.forEach(day => {
      const headerCell = headerRow.insertCell();
      headerCell.textContent = day;
      headerCell.style.fontSize = '20px';
      headerCell.style.width = '171.42px';
      headerCell.style.background = 'white';
  });

  // fill dates
  let day = 1;

  for (let i = 0; i < 6; i++) {
      const row = table.insertRow();

      for (let j = 0; j < 7; j++) {
          if (i === 0 && j < startingDay) {
              // 첫 주의 시작일 이전은 빈 셀로 채우기
              const cell = row.insertCell();
              cell.textContent = '';
            } 
          else if (day > daysInMonth) {
              // 마지막 날짜 이후는 빈 셀로 채우기
              break;
            } 
          else {
              // 유효한 날짜인 경우 날짜를 채우기
              const cell = row.insertCell();
              cell.style.height = '200px';
              cell.textContent = day;
              cell.style.textAlign = 'start';
              cell.style.borderTop = '3px solid black';
              day++;
              if (day == today + 1){
                cell.style.background = 'rgba(255, 0, 0, 0.3)';
              }
            } 
      }
  }

  // delete calendar old and create new calendar
  while (calendarContainer.firstChild) {
      calendarContainer.removeChild(calendarContainer.firstChild);
  }
  calendarContainer.appendChild(table);

}