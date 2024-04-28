window.addEventListener('load', function(){
   const canvas = this.document.getElementById('canvas1');
   const ctx = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;

   ctx.fillStyle = 'green';
   ctx.strokeStyle = 'yellow';
   ctx.lineWidth = 30;
   ctx.lineCap = 'round';

   //effect settings
   //size of main branch
   let size = 200

   sides = 5

   //determines depth of the fractal
   //how many branches split into smaller segments
   //before fractal shape is finished
   let maxLevel = 3;

   //determines the scale of the smaller branches
   let scale = 0.5; //so next branch is half size of its parent branch

   //
   let spread = 0.8;

   //number of branches
   let branches = 2;
   
   //define function to draw branches
   drawBranch = (level) => {
      if (level > maxLevel) return;
      ctx.beginPath();

      //starting coordinates of the line
      ctx.moveTo(0, 0);

      //ending coordinates of the line
      ctx.lineTo(size, 0);
      ctx.stroke();
      
      //for loop to make 2 more segments on each branch below
      for (let i = 0; i < branches; i++){
         //to make each branch to split into 2 small segments
      //first segment
      //add save and restore here so that the following transform 
      //only affect the drawBranch(level+1)
      ctx.save();
      //translates rotation's centre point along the branch
      //place next segment from x position of its parent branch
      //size - (size/branch) * 1 so that the child branch grows
      //from the end point of of its parent branch 
      ctx.translate(size - (size / branches) * i , 0) 
      ctx.rotate(spread)
      ctx.scale(scale, scale)
      drawBranch(level + 1)
      ctx.restore();

      //second segment
      ctx.save();
      ctx.translate(size - (size / branches) * i, 0) 

      //negative so that the segment is on the other side of parent branch
      ctx.rotate(-spread)
      ctx.scale(scale, scale)
      drawBranch(level + 1)
      ctx.restore();

      }
   }

   //to make circular fractal shape like snowflakes
   drawFractal = () => {

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      for (let i = 0; i < sides; i++){

         ctx.rotate((Math.PI * 2) / sides);

         //call the function
         drawBranch(0)

      }

      ctx.restore();
   }

   //call the function
   drawFractal();
 
});









// document.body.style.margin   = 0
// document.body.style.overflow = `hidden`

// const cnv = document.getElementById (`cnv_element`)
// cnv.width = innerWidth
// cnv.height = innerHeight

// const ctx = cnv.getContext (`2d`)

// const draw_frame = () => {
//    ctx.fillStyle = `red`
//    ctx.fillRect (0, 0, innerWidth, innerHeight)

//    requestAnimationFrame (draw_frame)
// }

// draw_frame ()

// window.onresize = () => {
//    cnv.width = innerWidth
//    cnv.height = innerHeight   
// }