'use strict';

const imageList = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair',
  'cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun',
  'unicorn','usb','water-can','wine-glass'
];
let counter = 0;
let firstImage = document.getElementById('first-image');
// console.log(firstImage);
let secondImage = document.getElementById('second-image');
// console.log(secondImage);
let thirdImage = document.getElementById('third-image');
let section = document.getElementById('main-section');
// console.log(thirdImage);
// let button =document.getElementById('btn');
let indexOne;
let indexTwo;
let indexThree;
let attempt=25;
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
   let indexNum=[];
   let indexcheck1;
   let indexcheck2;
   let indexcheck3;
  function render(){
    indexOne=randomNumber();
    indexTwo=randomNumber();
    indexThree=randomNumber();
    indexcheck1=indexNum.includes(indexOne);
    indexcheck2=indexNum.includes(indexTwo);
    indexcheck3=indexNum.includes(indexThree);
    while(indexOne===indexTwo || indexOne===indexThree || indexTwo===indexThree || indexcheck1 || indexcheck2 || indexcheck3){
    indexOne=randomNumber();
    indexTwo=randomNumber();
    indexThree=randomNumber();
    indexcheck1=indexNum.includes(indexOne);
    indexcheck2=indexNum.includes(indexTwo);
    indexcheck3=indexNum.includes(indexThree);
    }
    Images.all[indexOne].visits++;
    Images.all[indexTwo].visits++;
    Images.all[indexThree].visits++;
    firstImage.setAttribute('src',Images.all[indexOne].path)
    secondImage.setAttribute('src',Images.all[indexTwo].path)
    thirdImage.setAttribute('src',Images.all[indexThree].path)
    indexNum=[indexOne,indexTwo,indexThree];
    }
    render();
    
    section.addEventListener('click', clickHandle);
    function clickHandle(event) {
      counter++;
      if (attempt> counter) {
        if(event.target.id === 'first-image'){
          Images.all[indexOne].votes++;
        }else if(event.target.id === 'second-image'){
          Images.all[indexTwo].votes++;
        }else{
          Images.all[indexThree].votes++;
        }
        render();
      }else{ let ul=document.getElementById('list');
        for (let i = 0; i < Images.all.length; i++) {
          let li = document.createElement('li');
          ul.appendChild(li);
          li.textContent=`${Images.all[i].name} has been shown ${Images.all[i].visits} , and it has ${Images.all[i].votes} votes`;
        }
        section.removeEventListener('click',clickHandle);
        // button.addEventListener('click',result);
        showStatistics();
      }
    }
     function showStatistics() {
      document.getElementById('canvas').style.display = 'block';
      const ctx = document.getElementById('chart').getContext('2d');
    
      const productNames = [];
      const productVotes = [];
      const productVisits = [];
      for (let i = 0; i < Images.all.length; i++) {
        productNames.push(Images.all[i].name);
        productVotes.push(Images.all[i].votes);
        productVisits.push(Images.all[i].visits);
      }
      new Chart(ctx, {
        type: 'bar',
        animationEnabled: true,
        title:{
        text: 'The statistics of visits and votes for 25 rounds'
        },
        toolTip: {
          shared: true
        },
        legend: {
          cursor:'pointer',
        },
        data: {
          labels: productNames,
          type: 'column',
          name: 'number of visits',
          datasets: [{
    
            barPercentage: 1,
            borderWidth: 2,
            label: 'No of visits:',
            backgroundColor: 'rgba(47, 47, 175, 0.90)',
            borderColor: 'rgb(0, 0, 0)',
            data:productVisits ,
          },
    
          {
            axisYType: 'secondary',
            barPercentage: 1,
            borderWidth: 2,
            label: 'No of votes:',
            backgroundColor: 'rgba(205, 92, 92, 0.90)',
            borderColor: 'rgb(0, 0, 0)',
            data:productVotes ,
    
          }
          ],
        },
    
        options: {},
      });
    }
    