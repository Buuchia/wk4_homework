document.body.style.margin   = 0
document.body.style.overflow = `hidden`
document.body.style.backgroundColor = 'hsl(' + Math.random() * 360 + ', 100%, 30%)'

const cnv = this.document.getElementById('canvas1')

cnv.width = window.innerWidth
cnv.height = window.innerHeight

//creating a canvas element
const ctx = cnv.getContext('2d');

//define function to convert radians to degrees
radsToDegrees = rad => {
   const deg = (rad * 180) / Math.PI
   return deg
}

//setting line
ctx.lineWidth = 10;
ctx.lineCap = 'round'

//setting shadow and blur effect 
ctx.shadowColor = 'rgba(0,0,0,0.6)'
ctx.shadowOffsetX = 10
ctx.shadowOffsetY = 5
ctx.shadowBlur = 10

//effect settings
//size of main branch 
//ternary operator - condition ? run this if true : run this if false
let size = cnv.width < cnv.height ? cnv.width * 0.3 : cnv.height * 0.3

//number of branches distributed from centre point
sides = 5

//determines depth of the fractal
//how many branches split into smaller segments
//before fractal shape is finished
let maxLevel = 3

//determines the scale of the smaller branches
let scale = 0.5 //so next branch is half size of its parent branch

//the angle between the child branche and the parent branch
let spread = radsToDegrees(Math.PI / 4) // 45 degrees

//number of children branch growing from parent branch
let branches = 2

//randomize hue of fractal tree on each reload
let color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)'

//define function to draw branches
drawBranch = level => {

   if (level > maxLevel) return

   ctx.beginPath()

   //starting coordinates of the line
   ctx.moveTo(0, 0)

   //ending coordinates of the line
   ctx.lineTo(size, 0);

   ctx.stroke()
   
   //for loop to make 2 more segments on each branch below
   for (let i = 0; i < branches; i++){
      //to make each branch to split into 2 small segments
      //first segment
      //add save and restore here so that the following transform 
      //only affect the drawBranch(level+1)
      ctx.save()

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
      ctx.save()
      ctx.translate(size - (size / branches) * i, 0) 

      //negative so that the segment is on the other side of parent branch
      ctx.rotate(-spread)

      ctx.scale(scale, scale)
      drawBranch(level + 1)
      ctx.restore()

   }

}

//to make circular fractal shape like snowflakes
drawFractal = () => {

   ctx.save()
   ctx.strokeStyle = color
   ctx.translate(cnv.width / 2, cnv.height / 2)

   for (let i = 0; i < sides; i++){

      ctx.rotate((Math.PI * 2) / sides)
      
      //call the function
      drawBranch(0)

   }

   ctx.restore()

   //draw the next frame
   requestAnimationFrame(drawFractal)
}

//call the function
drawFractal()