var count=0;
var page;
const btn = document.querySelector('#btn');
const msg = document.querySelector('#data');

btn.onclick = function () {
    page=Number(btn.value)+count++;
    document.querySelector('#btn').innerHTML="Next";
    const promise = new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', `https://jobs.github.com/positions.json?&page=${page}`);
    request.onload = () => {
      if (request.status === 200) {
        resolve(request.response); // we got data here, so resolve the Promise
      } else {
        reject(Error(request.statusText)); // status is not 200 OK, so reject
      }
    };
    request.onerror = () => {
      reject(Error('Error fetching data.')); // error occurred, reject the  Promise
    };
    request.send(); // send the request
  });  
  promise.then((data) => {
      console.log(JSON.parse(data))
    console.log('Got data! Promise fulfilled.');
    const result = JSON.parse(data)
    var player='<h2>Company Lists</h2>'
                    result.forEach(function(user) {
                     player+=
                    `<div class="player">
                      <img src="${user.company_logo}" alt="">
                      <div class="strength">Company : ${user.company}</div>
                      <div>Type : ${user.type}</div>
                      <div>Post Time : ${user.created_at}</div>
                      <div>Title   : ${user.title}</div>
                      <div>Location : ${user.location}
                      </div>
                     </div>`
                } );     
    msg.innerHTML = player;
  }, (error) => {
    console.log('Promise rejected.');
    console.log(error.message);
  });
}