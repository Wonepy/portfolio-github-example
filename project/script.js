const app = document.querySelector('.app');
const dailyButton = document.querySelector('#choice-button-daily');
const weeklyButton = document.querySelector('#choice-button-weekly');
const monthlyButton = document.querySelector('#choice-button-monthly');
const right = document.querySelector('.right')

ByWhyTime = "daily";
dailyButton.addEventListener('click', () => {
     ByWhyTime = 'daily'
     resetButtonsColor()
     colorElement(  dailyButton, "white")
     document.querySelectorAll('.component').forEach(component => {
          component.remove()
     });     request()
})
weeklyButton.addEventListener('click', () => {
     ByWhyTime = 'weekly'
     resetButtonsColor()
     colorElement( weeklyButton, "white")
     document.querySelectorAll('.component').forEach(component => {
          component.remove()
     }); 

     request()

})
monthlyButton.addEventListener('click', () => {
     ByWhyTime = 'monthly'

     resetButtonsColor()
     colorElement( monthlyButton, "white")

     document.querySelectorAll('.component').forEach(component => {
          component.remove()
     }); 

     request()

})


const createCard = (title, img, color, hour, lastHour, TimeUnit) => {
     component = document.createElement('div');
     component.classList.add('component');
     component.style.backgroundColor = color;

     component.innerHTML = `
               <div class="component-illus" background-color="${color}">
                    <img class="component-img" src="../images/icon-${img}.svg" alt="img-play">
               </div>
               <div class="component-info">
                    <p class="component-title">${title}<img src="../images/icon-ellipsis.svg" class="points-img"></p>
                    <p class="component-hour">${hour}hrs</p>
                    <p class="component-time">Last ${TimeUnit} - ${lastHour} hrs</p>
               </div>`
     right.appendChild(component);
}
images = ["work", "play", "study", "exercise", "soucis", "self-care"]
colors = ["hsl(15, 100%, 70%)", "hsl(195, 74%, 62%)", "hsl(348, 100%, 68%)", "hsl(145, 58%, 55%)", "hsl(264, 64%, 52%)", "hsl(43, 84%, 65%)"]
const request = () => {
     fetch('data.json')
.then((res) => res.json())
          .then(data => {
               for (i = 0; i < data.length; i++){
                    if (ByWhyTime=="daily") {
                         createCard(data[i].title, images[i], colors[i], data[i].timeframes.daily.current, data[i].timeframes.daily.previous, "day") 
          
                    }
                    else if (ByWhyTime=="weekly") {
                         createCard(data[i].title, images[i], colors[i], data[i].timeframes.weekly.current, data[i].timeframes.weekly.previous, "week") 
          
                    }
                    else if(ByWhyTime=="monthly") {
                         createCard(data[i].title, images[i], colors[i], data[i].timeframes.monthly.current, data[i].timeframes.monthly.previous, "month") 
          
                    }
          
               } 
          

          })
          .catch((error)=> {console.error(error)})
}

request()

const deleteElement = (element) => {
     element.remove()
}


const resetButtonsColor = () => {
     

     document.querySelectorAll('.choice-button').forEach(button => {
          button.style.color = "hsl(236, 100%, 87%)"
     });
}

const colorElement = (element, color) => {
     element.style.color = color;
}

