$(document).ready ->

  getOffsetPosition = (eleSize, containerSize, position) ->
    currentPosition = containerSize / 2
    (position - currentPosition) + (eleSize/2)

  getOffsetPositionNew = (obj, newPosition, axis) ->
    if axis == 'x'
      currentPositionX = templateRealWorldWidth / 2
      xPosition = (newPosition - currentPositionX) + (obj.getWidth()/2)
    else if axis == 'y'
      currentPositionY = templateRealWorldHeight / 2
      yPosition = (newPosition - currentPositionY) + (obj.getHeight()/2)



  canvasObj = new fabric.Canvas('canvas')
  

  # Canvas Size
  canvasHeight = $(window).height()
  canvasObj.setWidth $(window).width()
  canvasObj.setHeight canvasHeight

  # Template Real World Size
  templateRealWorldHeight = 500
  templateRealWorldWidth = 400

  
  font = [          
    'Delicious_500',        
    'Quake_Cyr',           
    'OdessaScript_500',    
    'CA_BND_Web_Bold_700',  
    'CrashCTT_400',         
    'DejaVu_Serif_400',    
    'Encient_German_Gothic_400',
    'Globus_500',           
    'Modernist_One_400',    
    'Tallys_400',          
    'Terminator_Cyr',     
    'Times_New_Roman',      
    'Vampire95'           
  ]


  templateShape = new fabric.Rect({
    width: templateRealWorldWidth,
    height: templateRealWorldHeight,
    fill: '#000000',
    top: 0,
    left: 0
  })

  textObj = new fabric.Text('Hello Text!', { 
    fontFamily: font[3], 
    left: 100,
    top: 0,
    fontSize: 80,
    textAlign: "left",
    fill:"#FF0000"
  })

  shapeOne = new fabric.Rect({
    width: 100,
    height: 100,
    fill: 'red',
    top: 100,
    left: 100
  })

  shapeTwo = new fabric.Rect({
    width: 100,
    height: 100,
    fill: 'blue',
    top: getOffsetPosition(100, templateRealWorldHeight, 200),
    left: getOffsetPosition(100, templateRealWorldWidth, 200)
  })

  shapeThree = new fabric.Rect({
    width: 100,
    height: 100,
    fill: 'black',
    top: 20,
    left: 20
  })
   
  # Create a masterGroup based on the realworld size of the template shape   
  masterGroup = new fabric.Group([templateShape, shapeOne, textObj, shapeTwo], { height: templateRealWorldHeight, width: templateRealWorldWidth }) 
  
  masterMasterGroup = new fabric.Group([masterGroup], {height: templateRealWorldHeight + 20, width: templateRealWorldWidth + 20})
  # Add it to the canvas
  canvasObj.add(shapeThree)
  canvasObj.add(masterMasterGroup)

  masterGroup.item(2).set({left: getOffsetPositionNew(masterGroup.item(2), 0, 'x'), top: getOffsetPositionNew(masterGroup.item(2), 0, 'y')  })

  shapeThree.set('selectable', false);
  


  masterGroup.set('selectable', false)
  masterGroup.set('active', false)

  masterGroup.forEachObject (obj) ->
    obj.set('selectable', true)
    obj.set('hideCorners', false)
    obj.set('active', true)

  masterGroup.forEachObject (obj) ->
    console.log obj

  # Scale masterGroup according to percentage height of canvas
  masterGroup.scaleToHeight(canvasHeight/100 * 90)

  #center Master group in canvas
  canvasObj.centerObjectH(masterGroup)
  canvasObj.centerObjectV(masterGroup)

  masterGroup.set('strokeStyle','red')
  masterGroup.set('strokeWidth', 10)


  # Event controlling the rerendering of the group on resize
  $(window).on "debouncedresize", (event) ->
    canvasHeight = $(window).height()
    canvasObj.setWidth $(window).width()
    canvasObj.setHeight canvasHeight

    masterGroup.scaleToHeight(canvasHeight/100 * 90)
    canvasObj.centerObjectH(masterGroup)
    canvasObj.centerObjectV(masterGroup)
    canvasObj.renderAll()

  window.masterMasterGroup = masterMasterGroup


