const app = document.getElementById('root');



const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://eventkeeperofficial.herokuapp.com/api/crowd', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(group => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = group.name;

      const p = document.createElement('p');
      group.description = group.description.substring(0, 300);
      p.textContent = `${group.description}...`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();