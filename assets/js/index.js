let todos = []

const issuesList = document.getElementById('issuesList');
const issueForm = document.getElementById('issueForm');
const sortValue = document.getElementById('sort-value');
const searchBox = document.getElementById('search-box');
const filterAllBtn = document.getElementById('all-status');
const filterOpenBtn = document.getElementById('open-status');
const filterClosedBtn = document.getElementById('close-status');

// const btnAdd = document.getElementById('btnAdd');


// fetch data
function fetchData() {
  fetch('https://tony-auth-express.vercel.app/api/todo', {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    // todos.push(...data.data)
    renderTrackerList(data.data);
  })
    
}
fetchData();


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
            <h3 class="issue-name">${item.description}</h3>
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
                  onclick="deleteIssue('${item._id}')"
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
    data: {  
      title, // shorthand property if key and value are the same
      description,
      severity,
      author
    }
  }

  // way 1 : call api get list again after add new item
  fetch('https://tony-auth-express.vercel.app/api/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todoItem)
  })
  .then(() => {
    fetchData();
  })

   // way 2: push new item to array after add new item
  //  fetch('https://tony-auth-express.vercel.app/api/todo', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(todoItem)
  //   })
  //   .then(response => response.json())
  //   .then((data) => {
  //     todos.push(data.data);
  //     renderTrackerList(todos);
  //   })
})



// delete todos
function deleteIssue(todoId) {
  // const todoSliced = [...todos].filter(todo => todo._id !== todoId); // remove item from array
  // todos = todoSliced;
  // renderTrackerList(todoSliced);

  fetch(`https://tony-auth-express.vercel.app/api/todo/${todoId}`, {
    method: 'DELETE',
  })
  .then(() => {
    fetchData();
  })

  // const todoIndex = todos.findIndex(todo => todo._id === todoId);
  // if(todoIndex !== -1) {
  //   todos.splice(todoIndex, 1);
  // }
  // renderTrackerList(todos);
}

// sort todo
sortValue.addEventListener('change', event => {
  // const value = e.target.value; // es5
  const { value } = event.target
  const todoSorted = [...todos];

  todoSorted.sort((a, b) => {
    if(a.title.toLowerCase() > b.title.toLowerCase()) {
      return value === 'asc' ? 1 : -1; // es6
    }
    if(a.title.toLowerCase() < b.title.toLowerCase()) {
      return value === 'asc' ? -1 : 1; // es6
    }
    return 0
  })
  renderTrackerList(todoSorted);
})


// search
searchBox.addEventListener('input', e => {
  const searchValue = e.target.value.toLowerCase();
  const clonedTodos = [...todos];
  const todoFiltered = clonedTodos.filter(todo => todo.title.toLowerCase().includes(searchValue));
  renderTrackerList(todoFiltered);
})

// filter
filterAllBtn.addEventListener('click', () => {
  renderTrackerList(todos);
})

filterClosedBtn.addEventListener('click', () => {
  const todoFiltered = [...todos].filter(todo => todo.completed);
  renderTrackerList(todoFiltered);
})

filterOpenBtn.addEventListener('click', () => {
  const todoFiltered = [...todos].filter(todo => !todo.completed);
  renderTrackerList(todoFiltered);
})



console.log('todos: ', todos)
// btnAdd.addEventListener('click', () => {
//   console.log('click');
// })
// init data
renderTrackerList(todos);
