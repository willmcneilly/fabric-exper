(function() {
  $(document).ready(function() {
    var canvasHeight, canvasObj, font, getOffsetPosition, getOffsetPositionNew, masterGroup, shapeOne, shapeTwo, templateRealWorldHeight, templateRealWorldWidth, templateShape, textObj;
    getOffsetPosition = function(eleSize, containerSize, position) {
      var currentPosition;
      currentPosition = containerSize / 2;
      return (position - currentPosition) + (eleSize / 2);
    };
    getOffsetPositionNew = function(obj, newPosition, axis) {
      var currentPositionX, currentPositionY, xPosition, yPosition;
      if (axis === 'x') {
        currentPositionX = templateRealWorldWidth / 2;
        return xPosition = (newPosition - currentPositionX) + (obj.getWidth() / 2);
      } else if (axis === 'y') {
        currentPositionY = templateRealWorldHeight / 2;
        return yPosition = (newPosition - currentPositionY) + (obj.getHeight() / 2);
      }
    };
    canvasObj = new fabric.Canvas('canvas');
    canvasHeight = $(window).height();
    canvasObj.setWidth($(window).width());
    canvasObj.setHeight(canvasHeight);
    templateRealWorldHeight = 500;
    templateRealWorldWidth = 400;
    font = ['Delicious_500', 'Quake_Cyr', 'OdessaScript_500', 'CA_BND_Web_Bold_700', 'CrashCTT_400', 'DejaVu_Serif_400', 'Encient_German_Gothic_400', 'Globus_500', 'Modernist_One_400', 'Tallys_400', 'Terminator_Cyr', 'Times_New_Roman', 'Vampire95'];
    templateShape = new fabric.Rect({
      width: templateRealWorldWidth,
      height: templateRealWorldHeight,
      fill: '#000000',
      top: 0,
      left: 0
    });
    textObj = new fabric.Text('Hello Text!', {
      fontFamily: font[3],
      left: 100,
      top: 0,
      fontSize: 80,
      textAlign: "left",
      fill: "#FF0000"
    });
    shapeOne = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'red',
      top: 100,
      left: 100
    });
    shapeTwo = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'blue',
      top: getOffsetPosition(100, templateRealWorldHeight, 200),
      left: getOffsetPosition(100, templateRealWorldWidth, 200)
    });
    masterGroup = new fabric.Group([templateShape, shapeOne, textObj, shapeTwo], {
      height: templateRealWorldHeight,
      width: templateRealWorldWidth
    });
    canvasObj.add(masterGroup);
    masterGroup.item(2).set({
      left: getOffsetPositionNew(masterGroup.item(2), 0, 'x'),
      top: getOffsetPositionNew(masterGroup.item(2), 0, 'y')
    });
    masterGroup.scaleToHeight(canvasHeight / 100 * 90);
    canvasObj.centerObjectH(masterGroup);
    canvasObj.centerObjectV(masterGroup);
    masterGroup.set('strokeStyle', 'red');
    masterGroup.set('strokeWidth', 10);
    $(window).on("debouncedresize", function(event) {
      canvasHeight = $(window).height();
      canvasObj.setWidth($(window).width());
      canvasObj.setHeight(canvasHeight);
      masterGroup.scaleToHeight(canvasHeight / 100 * 90);
      canvasObj.centerObjectH(masterGroup);
      canvasObj.centerObjectV(masterGroup);
      return canvasObj.renderAll();
    });
    return window.masterGroup = masterGroup;
  });
}).call(this);
