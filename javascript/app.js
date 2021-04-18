'use strict';

const imageList = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair',
  'cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun',
  'unicorn','usb','water-can','wine-glass'
];
let counter = 1;
let firstImage = document.getElementById('first-image');
// console.log(firstImage);
let secondImage = document.getElementById('second-image');
// console.log(secondImage);
let thirdImage = document.getElementById('third-image');
let section = document.getElementById('main-section');
// console.log(thirdImage);
let indexOne;
let indexTwo;
let indexthree;
let imageId= [firstImage,secondImage,thirdImage];

  Images.all = [];
function Images(name){
  this.name = name;
  this.ext ='';
  this.path = '';
  this.votes = 0;
  this.visits = 0;
  Images.all.push(this);
}
Images.prototype.generateExtension = function(){
    if (this.name === 'usb') {
      this.ext = 'gif';
    }
    else if(this.name === 'sweep'){
      this.ext = 'png';
    }
    else{
      this.ext = 'jpg';
    }
  
  };
  
  Images.prototype.generatePath = function(){
    this.path= `./img/${this.name}.${this.ext}`;
  
  };
  
  
  for (let i = 0; i < imageList.length; i++) {
    new Images(imageList[i]);
    Images.all[i].generateExtension();
    Images.all[i].generatePath();
  }

  function randomNumber() {
    return Math.floor(Math.random() * Images.all.length);
  };
  
  function render(){
    indexOne=randomNumber();
    indexTwo=randomNumber();
    indexthree=randomNumber();
    while(indexOne===indexTwo || indexOne===indexthree || indexTwo===indexthree){
    indexOne=randomNumber();
    indexTwo=randomNumber();
    }
    firstImage.setAttribute('src',Images.all[indexOne].path)
    secondImage.setAttribute('src',Images.all[indexTwo].path)
    thirdImage.setAttribute('src',Images.all[indexthree].path)
    }
    render();

    section.addEventListener('click', handleClick);

    function handleClick(event) {
      if (counter>25) {
        section.removeEventListener('click', handleClick);
      }
      else{
        console.log('counter =' ,counter);
        console.log('Target', event.target.id);
        if (event.target.id !== 'main-section') {
          for (let i = 0; i < Images.all.length; i++) {
            if (Images.all[i].name === event.target.title) {
              Images.all[i].votes++;
              console.log('this is the voters for' + Images.all[i].name + ' ' + Images.all[i].votes);
              break;
            }
          }
          console.log(Images.all);
          if(counter !== 25){
            counter++;
            render();
          }
    
    
          else if (counter === 25) {
            showData();
            counter++;
          }
        }
      }
    }
    let results = document.getElementById('results');
    let ulEl = document.createElement('ul');
    results.appendChild(ulEl);
    let liEl = document.createElement('li');
    function showData(){
      for (let i = 0; i < Images.all.length; i++) {
        liEl = document.createElement('li');
        ulEl.appendChild(liEl);
        liEl.textContent = `${Images.all[i].name} had ${Images.all[i].votes}, and was seen ${Images.all[i].visits} times.`;
      }
    
    }