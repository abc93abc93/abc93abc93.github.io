const data = [
    {
      "text": "1",
    },
    {
      "text": "2",
    },
    {
      "text": "3",
    },
    {
      "text": "4",
    },
    {
      "text": "5",
    },
    {
      "text": "6",
    },
  ]

  const box = document.querySelector('.box')
  const pointer = document.querySelector('.pointer');
  const btn = document.querySelector('.btn');

  const perAngle = 360 / data.length; 

  let pointerAngle = 0;
  let startAngle = 0;
  let a = Math.floor(Math.random() * 6);
  let startTime = 0; 


  function creatDiv(className) {
    node = document.createElement('div');
    node.classList.add(className);

    return node
  }

  function creatFan(perAngle, index, item) {
    const elFan = creatDiv('fan');
    const elInner = creatDiv('inner');
    const elText = creatDiv('inner-text');

    elFan.style.transform = `rotate(${perAngle * index - 30}deg)`
    elInner.style.transform = `rotate(${perAngle}deg)`
    elText.innerText = item.text;

    elInner.appendChild(elText);
    elFan.appendChild(elInner);
    
    return elFan
  }


  data.forEach((item, index)=>{
    
    const Fan = creatFan(perAngle, index, item);
    
    box.prepend(Fan);
  })

  function easeInOut(t, b, c, d) {
    t /= d/2;
    if (t < 1) {
      return c/2 * t * t + b;
    }
    t--;
    return -c/2 * (t * (t - 2) - 1) + b;
  }
  
  function animate() {
    
    const duration = 3000; 

    let goAngle = a * 60;
    goAngle = goAngle + 360 * 5 - startAngle;

    var currentTime = Date.now() - startTime;

    var currentValue = easeInOut(currentTime, pointerAngle, goAngle, duration);
    pointer.style.transform = `translateX(-50%) rotate(${currentValue}deg)`;
    const anims = requestAnimationFrame(animate);

    if (currentTime >= duration){
      cancelAnimationFrame(anims)
      startAngle = a * 60;
      pointerAngle = startAngle;
    }
  }

  btn.addEventListener('click',()=>{
    a = Math.floor(Math.random() * 6);
    startTime = Date.now();
    animate();
  })
  
