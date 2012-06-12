(function() {
  $(document).ready(function() {
    var canvasHeight, canvasObj, font, getOffsetPosition, getOffsetPositionNew, getOffsetPositionNewNew, masterGroup, num1, num2, num3, numGroup, setNumGroupSize, shapeOne, shapeThree, shapeTwo, templateRealWorldHeight, templateRealWorldWidth, templateShape, textObj;
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
    getOffsetPositionNewNew = function(parentSize, obj, newPosition, axis) {
      var currentPositionX, currentPositionY, xPosition, yPosition;
      if (axis === 'x') {
        currentPositionX = parentSize / 2;
        return xPosition = (newPosition - currentPositionX) + (obj.getWidth() / 2);
      } else if (axis === 'y') {
        currentPositionY = parentSize / 2;
        return yPosition = (newPosition - currentPositionY) + (obj.getHeight() / 2);
      }
    };
    canvasObj = new fabric.Canvas('canvas');
    canvasHeight = $(window).height();
    canvasObj.setWidth($(window).width());
    canvasObj.setHeight(canvasHeight);
    templateRealWorldHeight = 500;
    templateRealWorldWidth = 400;
    (function() {
      var fontDefinitions, prop, _results;
      fontDefinitions = {
        Modernist_One_400: 50,
        Quake_Cyr: 100,
        Terminator_Cyr: 10,
        Vampire95: 85,
        Encient_German_Gothic_400: 110,
        OdessaScript_500: 180,
        Globus_500: 100,
        CrashCTT_400: 60,
        CA_BND_Web_Bold_700: 60,
        Delicious_500: 80,
        Tallys_400: 70,
        DejaVu_Serif_400: 130
      };
      _results = [];
      for (prop in fontDefinitions) {
        _results.push(Cufon.fonts[prop.toLowerCase()] ? Cufon.fonts[prop.toLowerCase()].offsetLeft = fontDefinitions[prop] : void 0);
      }
      return _results;
    })();
    font = ['Delicious_500', 'Quake_Cyr', 'OdessaScript_500', 'CA_BND_Web_Bold_700', 'CrashCTT_400', 'DejaVu_Serif_400', 'Encient_German_Gothic_400', 'Globus_500', 'Modernist_One_400', 'Tallys_400', 'Terminator_Cyr', 'Times_New_Roman', 'Vampire95'];
    templateShape = new fabric.Rect({
      width: templateRealWorldWidth,
      height: templateRealWorldHeight,
      fill: '#000000',
      top: 0,
      left: 0
    });
    textObj = new fabric.Text('Hello Text!', {
      fontFamily: font[8],
      left: 100,
      top: 0,
      fontSize: 120,
      textAlign: "left",
      fill: "#FF0000"
    });
    num1 = new fabric.Text('9', {
      fontFamily: font[8],
      left: 0,
      top: 0,
      fontSize: 120,
      fill: "#FF0000"
    });
    num2 = new fabric.Text('7', {
      fontFamily: font[8],
      left: 0,
      top: 0,
      fontSize: 120,
      fill: "#FF0000"
    });
    num3 = new fabric.Text('0', {
      fontFamily: font[8],
      left: 0,
      top: 0,
      fontSize: 120,
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
    shapeThree = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'black',
      top: 20,
      left: 20
    });
    masterGroup = new fabric.Group([templateShape], {
      height: templateRealWorldHeight,
      width: templateRealWorldWidth
    });
    numGroup = new fabric.Group([num3, num2, num1]);
    masterGroup.add(numGroup);
    canvasObj.add(masterGroup);
    canvasObj.renderAll();
    setNumGroupSize = function(groupObj) {
      var groupHeight, groupPositionX, groupWidth;
      groupWidth = 0;
      groupHeight = 0;
      groupObj.forEachObject(function(obj, index) {
        groupWidth = (obj.getWidth() + (obj.getWidth() * 0.2)) + groupWidth;
        return groupHeight = obj.getHeight();
      });
      groupObj.setWidth(groupWidth);
      groupObj.setHeight(groupHeight);
      groupObj.set('top', getOffsetPositionNewNew(masterGroup.getWidth(), groupObj, 20, 'y'));
      groupPositionX = 0;
      groupObj.forEachObject(function(obj, index) {
        console.log(obj.text);
        obj.set('left', getOffsetPositionNewNew(groupWidth, obj, groupPositionX, 'x'));
        groupPositionX = groupPositionX + (obj.getWidth() + (obj.getWidth() * 0.2));
        return console.log(groupPositionX);
      });
      groupObj.setAngle(20);
      return groupObj.forEachObject(function(obj, index) {
        obj.set('textAlign', 'center');
        return obj.setAngle(-20);
      });
    };
    setNumGroupSize(numGroup);
    masterGroup.scaleToHeight(canvasHeight / 100 * 90);
    canvasObj.centerObjectH(masterGroup);
    canvasObj.centerObjectV(masterGroup);
    masterGroup.set('strokeStyle', 'red');
    masterGroup.set('strokeWidth', 10);
    canvasObj.renderAll();
    console.log(canvasObj.toSVG());
    $(window).on("debouncedresize", function(event) {
      canvasHeight = $(window).height();
      canvasObj.setWidth($(window).width());
      canvasObj.setHeight(canvasHeight);
      masterGroup.scaleToHeight(canvasHeight / 100 * 90);
      canvasObj.centerObjectH(masterGroup);
      canvasObj.centerObjectV(masterGroup);
      return canvasObj.renderAll();
    });
    window.canvasObj = canvasObj;
    return window.numGroup = numGroup;
  });
}).call(this);
