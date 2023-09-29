let dataTrackers = [
  {
    id: 1,
    title: 'Tin tức',
    status: 'new',
    description: 'Tin tức mới nhất',
    author: [
      {
        id: 1,
        avatar: 'https://images.unsplash.com/photo-1694954075938-ce66449dc9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      }
    ]
  },
  {
    id: 2,
    title: 'Bong da',
    status: 'new',
    description: 'bong da moi nhat',
    author: [
      {
        id: 1,
        avatar: 'https://images.unsplash.com/photo-1694954075938-ce66449dc9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      }
    ]
  }
];

const searchField = document.getElementById('search-field');
const trackerLists = document.getElementById('trackerLists');
console.log("trackerLists: ", dataTrackers)

function renderTrackersList(dataSource) {
  trackerLists.innerHTML = ''; // reset tracker lists

  dataSource.forEach((element) => {
    // trackerLists.innerHTML += '<div>' + element.id + '</div>'; // es5
    // template string
    trackerLists.innerHTML += `
      <div class="card issue-tracker__list-item">
          <h5 class="card-header">
            ${element.title} <span class="badge bg-secondary">${element.status}</span>
          </h5>
          <div class="card-body">
            <p class="card-text">
             ${element.description}
            </p>
            <div class="card-control">
              <div  class="author-list">
                <img
                  class="avatar"
                  src="https://images.unsplash.com/photo-1694954075938-ce66449dc9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt=""
                />
                <img
                  class="avatar"
                  src="https://images.unsplash.com/photo-1694954075938-ce66449dc9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt=""
                />
              </div>
              <div class="group-btn">
                <button type="button" class="btn btn-primary">Open</button>
                <button 
                  type="button"
                  class="btn btn-danger"
                  onClick="deleteTracker(${element.id})"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
    `
  })
}

renderTrackersList(dataTrackers)
  

// delete tracker
function deleteTracker(trackerId) {
  const trackers = dataTrackers.filter(tracker => tracker.id !== trackerId) 
  // 1: dataTrackers: [1, 2]; trackers [1]
  // 2  dataTrackers: [1]; trackers []

  dataTrackers = trackers;  // 1: dataTracker = [1]; 2: dataTracker=[]
  console.log('trackers: ', {
    dataTrackers,
    trackers
  })
  renderTrackersList(trackers)
}

// search tracker
searchField.addEventListener('keyup', (event) => {
  console.log('searchField: ', event.target.value);
})



// - no hoisting
// - bat bien, nen ko dc phep khai bao 2 bien co ten giong nhau
// - ko dc gán lại giá trị