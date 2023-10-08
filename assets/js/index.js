const todos = [
  {
    id: Math.floor(Math.random() * 1000),
    title: 'Learn JavaScript',
    completed: false,
    description: 'Learn JavaScript',
    severity: 'low',
    author: [
      {
        id: Math.floor(Math.random() * 1000),
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=3'
      }
    ]
  }
]

const issuesList = document.getElementById('issuesList');
const issueForm = document.getElementById('issueForm');
// const btnAdd = document.getElementById('btnAdd');

function renderTrackerList(data = []) {
  issuesList.innerHTML = ''; // reset list

  data.forEach(item => {
    issuesList.innerHTML += `
      <li id="issue-list-item" class="issue-list-item">
        <div class="list-item-header">
            <div for="" class="list-item-title">${item.title}</div>
            <div id="issueStatus" class="list-item-status">
              ${item.completed ? 'Closed' : 'Open'}
            </div>
        </div>
        <div class="list-item-content">
            <h3 class="issue-name">description</h3>
            <div class="list-item-severity">${item.severity}</div>
            <div>
              <div class="list-item-group-author">
                <img src="https://i.pravatar.cc/150?img=3" />
              </div>
              <div class="list-item-group-btn">
                <button 
                    id="changeSttBtn" 
                    class="btn btn--close" 
                >
                Open
                </button>
                <button 
                    class="btn btn--delete" 
                >Delete</button>
              </div>
            </div>
        </div>
      </li>
      <br />
    `;
  })
}

// add todo
issueForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const author = document.getElementById('author').value;
  const severity = document.getElementById('severity').value;

  const todoItem = {
    id: Math.floor(Math.random() * 1000),
    completed: false,
    title, // shorthand property if key and value are the same
    description: description,
    severity: severity,
    author: [
      {
        id: Math.floor(Math.random() * 1000),
        name: author,
        avatar: 'https://i.pravatar.cc/150?img=3'
      }
    ]
  }
  const newTodos = [...todos, todoItem]; // add item to array
  renderTrackerList(newTodos);
})

// btnAdd.addEventListener('click', () => {
//   console.log('click');
// })
// init data
renderTrackerList(todos);
