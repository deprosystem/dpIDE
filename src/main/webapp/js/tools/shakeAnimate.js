function shake(element, magnitude = 5) {
   var tiltAngle = 1;
   var counter = 1;
   var numberOfShakes = 15;
   var startX = 0, startY = 0, startAngle = 0;
   var magnitudeUnit = magnitude / numberOfShakes;
   var randomInt = (min, max) => {
     return Math.floor(Math.random() * (max - min + 1)) + min;
   };
   upAndDownShake();

   function upAndDownShake() {
     if (counter < numberOfShakes) {
       element.style.transform = 'translate(' + startX + 'px, ' + startY + 'px)';
       magnitude -= magnitudeUnit;
       var randomX = randomInt(-magnitude, magnitude);
       var randomY = randomInt(-magnitude, magnitude);
       element.style.transform = 'translate(' + randomX + 'px, ' + randomY + 'px)';
       counter += 1;
       requestAnimationFrame(upAndDownShake);
     }
     if (counter >= numberOfShakes) {
       element.style.transform = 'translate(' + startX + ', ' + startY + ')';
     }
   }
 };