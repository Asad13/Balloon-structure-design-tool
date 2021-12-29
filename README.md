# Balloon-structure-design-tool
An online software to design custom balloon structure

## main.js: This contains all the event listeners and adds interactivity and functionality to the html page

   ### function handleBtns(btn, activate) [line 10 - 22]:
        * @function
        * @name handleBtns
        * @param {HTMLInputElement} btn The button to activate or disable
        * @param {boolean} activate what to do with the button, true means to activate it


   ### function setBtns(structure) [line 30 - 77]:
         Function for activating or disabling buttons in the structure section based on structure selected
         (contains options like adding rows, inflate balloons etc)
        * @function
        * @name setBtns
        * @param {string} structure The structure whose buttons will be set


   ### [line 83 - 106]:
        add some styling to show which section is selcted from the topbar(struttura,colori etc)
  
 
   ### function lightOrDark(color) [line 115 - 153]:
        * Determines if a color code represents a dark or light color
        * @function
        * @name lightOrDark
        * @param {string} color - The color code value of an element's color or background color
        * @returns {string} color is light or dark
  
 
   ### function getHue(H) [line 155 - 198]: 
        technical function to get "hsl" values from hex color codes
  
  
   ### function rgb2hex(rgb) [line 201}:
        technical function to convert "rgb" color code to "hex" code
        
  
   ### function HSLToHex(h, s, l) [line 206 - 244]:
        technical function to convert HSL values to HEX


   ### function createColorScheme(color) [line 252 - 306]:
         * creates a color scheme for the selected color
         * @function
         * @name createColorScheme
         * @params {string} color - Hex color code
         
   
   ### [line 312 - 331]:
         Changing the value of the element with class name "selectedColor" whenever
         someone picks a color from the color input field.
         
         
   ### function addRecentColor(container, color) [line 337 - 357]:
         Updating recent color section whenever a new color is selected
         
         
   ### [line 360 - 385] :
         when a new initial color is selected updating the colorwheel and adding it to
         the recent color section
         
       
   ### [line 390 - 405] :
         - eventlistener to the clean grid(pulisci griglia) btn
         Removing all selected balloons(the balloons whose has been colored earlier)
         
         
   ### function enableRicalcaBtnsActivity(balloonStructureContainer, balloonStructureBackground) [line 409 - 466]:
         - adding eventlistener to all the btns in Ricalca functions with desired functionality added
         Changing the shape and position of the balloon structure background image
         
         
   ### [line 470 - 500]:
         Displaying uploaded image in Ricalca Section
         
         
   ### [line 506 - 509]:
         Updating precision slider[Precisione movimento] value when the slider is moved
         
         
   ### [line 514 - 589]:
         All the functionalities for Sfondo Section


   ### [line 592 - 607]:
         Add row and Add Column btns eventlistner 


   ### function disableBtns(id) [line 616 - 623]:
         Function for activating or disabling any button
         * @function
         * @name disableBtns
         * @param {string} structure The structure whose buttons will be set
         * @param {string} id id of the delete button
    
    
   ### [line 625 - 645]: 
         eventlisnter for coloring/decoloring balloons creating box on drag
         
         
   ### [line 648 - 683]:
         eventlistener for row gap and column gap btns
         
         
   ### [line 686 - 777]:
         eventlistener for inflate and deflate balloon btns
         
         
   ### function resetStructure() [line 780 - 791]:
         resetting structure on row gap or column gap state change
         
         
   ### function changeDimension(structure, size) [line 794 - 916]:
         Change the dimension values when size and structure changes
         
         
   ### function setStructure(structureEl) [line 918 - 956]:
         resetting everything including size select dropdown when a new strcture is selected
         * line 958: eventlistener to structure selecting dropdown(on change calls setStructure function)
         * line 962: eventlistener to window(on resize calls setStructure function)
         
         
   ### [line 967 - 977]:
         eventlisnter to size selection dropdown
         
    
   ### [line 980 - 1055]:
         functionalities for printing the design
         
         
   ### function svgToPng() [line 1057 -1083]:
         utility function for converting svg image to png format
         
         
   ### [line 1085 - 1132]:
         salva section functionalities


   ### [line 1135 - 1153]: 
         Update(Refresh) new balloon design in the background(In Sfondo Section)
         
   
   ### [line 1155 - 1201]:
         Dimensioni(In struttura section) eventlisteners and functionalities
         
    
   ### [line 1204 - 1298]:
         delete row and delete column eventlisters to the respected buttons



## create-design.js: This creates the designs based on the structure selected and handle all balloon selection related events

   ### [line 1 - 14]:
         all the variables to add or handle events(functionalities) to the balloons.
         
   
   ### function deleteRow(balloon) [line 16 - 63]:
         called when clicked on a row for deleting it(row delete enabled state)
         
         
   ### function deleteColumn(balloon) [line 66 - 113]:
         called when clicked on a column for deleting it(column delete enabled state)
         
   
   ### function handleBallons(container, balloon) [line 122 - 209]
         Triggered when a balloon is selected
         * handle selection of balloons and add events to the selected balloon
         * @function
         * @name handleBalloons
         * @param {Element} container - SVG Container element
         * @param {Element} element - SVG element(Balloon)
         
   
   ### function updateSelection(willColor) [line 211 - 299]
         call to handle coloring or decoloring of multiple balloons by creating box(Attiva colorazione ad area enabled) 


   ### [line 301 - 373]:
         Adds mouse events to the structure to handle selection
         * line 301 - 323 => mousedown event - starting selection related activity with mouse based on which functionality is
         choosen from Modifica griglia or palloncini
         * line 325 - 356 => mousemove event - creating box to color or decolor balloons(Attiva colorazione ad area enabled)
         * line 359 - 373 => mouseup event - ending all selection related activites with mouse


 ### function setBalloons(container, balloon) [line: 382 - 495]:
      Sets all the attributes for a svg element
      * @function
      * @name setBalloons
      * @param {Element} container - The svg element
      * @param {Element} element - The svg circle element(Balloon)
      
      
  ### function createDupletSquare(row = 10, column = 20) [line 504 - 584]:
      This will create design of balloons based on Duplet Square structure
      * @function
      * @name createDupletSquare
      * @param {number} row number of rows
      * @param {number} column number of columns
      
      
  ### function createAlternateSquarePack(row = 8, column = 10) [line 593 - 878]:
       This will create design of balloons based on Alternate Square pack structure
      * @function
      * @name createAlternateSquarePack
      * @param {number} row number of rows
      * @param {number} column number of columns
         
      
  ### function createGridz(structure, row = 10, column = 7) [line 888 - 1032]:
       This will create design of balloons based on Gridz/Gridz Alternate Horizontal/Gridz Alternate Vertical structure
      * @function
      * @name createGridz
      * @param {String} structure structure of the design
      * @param {number} row number of rows
      * @param {number} column number of columns
         
      
  ### function createSixInGrid(row = 6, column = 17) [line 1041 - 1174]:
       This will create design of balloons based on Six Inch Grid structure
      * @function
      * @name createSixInGrid
      * @param {number} row number of rows
      * @param {number} column number of columns
         
      
  ### function createColumn(row) [line 1182 - 1303]:
      This will create design of balloons based on column structure
      * @function
      * @name createColumn
      * @param {number} row number of rows
         
      
  ### function createTwelveInGrid(row = 5, column = 15) [line 1312 - 1450]:
      This will create design of balloons based on Twelve Inch Grid structure
      * @function
      * @name createTwelveInGrid
      * @param {number} row number of rows
      * @param {number} column number of columns
         
      
  ### function createTwelveInXPattern(row = 4, column = 13) [line 1459 - 1709]:
      This will create design of balloons based on Twelve Inch X Pattern structure
      * @function
      * @name createTwelveInXPattern
      * @param {number} row number of rows
      * @param {number} column number of columns
         
      
  ### function createArch(rows) [line 1716 - 1874]:
      This will create an Arch of balloons
      * @function
      * @name createArch
         
      
  ### function createDeisgn(structure, row = null, column = null) [line 1882 - 2048]:
       This will create design of balloons based on specific structure and size
      * @function
      * @name createDesign
      * @param {string} structure structure of the balloons' deisgn
      
      
      
## functions.js: This file will contain all the utility functions and variables to create designs of balloon

   ### [line 5 - 181]
         Utility variables
         * sizes [line 5] => An object containing arrays for size options for different structures
         * dimensions [line 19] => Contains width of each column and height of each row for standard size(initial)
         of balloons for all structures
         * balloonsInfo [line 62] => Contains information about types of balloons and amount to multiply per each
         balloon of different types for different structures
         * structureInfo [line 166] => Contains the information about the current structure
         * selectedBalloons [line 182] => containing infos of the selected and not selected balloons
         
      
   ### function updateAddRowInformation() [line 190 - 263]:
         add information of newly added row to the selectedBalloons object
         
      
   ### function updateAddColumnInformation() [line 271 - 345]:
         add information of newly added column to the selectedBalloons object
         
      
   ### function updateRemoveRowInformation() [line 352 - 384]:
         change information for newly removed row from the selectedBalloons object
         
      
   ### function updateRemoveColumnInformation() [line 391 - 423]:
         change information for newly removed column from the selectedBalloons object
         
      
   ### function createTableRow(color, amount) [line 426 - 449]:
         Create rows of table in information section
         
   
   ###  function setInformationTable(structure) [line 457 - 533]:
         Creates balloon information table and inserts it in the information section
         
   
   ###  function updateSelectedBalloon(id, type, amount, row, column) [line 545 - 584]:
         adds the information of the selected balloon to the selectedBalloons object
         
   
   ###  function removeFromSelectedBalloon(key, id, type, amount, row, column) [line 598 - 627]:
         removes the information of the unselected balloon to the selectedBalloons object
         
   
   ###  function initialSetup(row = 1, unitheight = 70, needsUse = false, rGap = 0) [line 639 - 679]:
        sets the initial common values for all the structure
         
   
   ###  function setAllAttributes(element, attributes) [line 689 - 693]:
         Sets all the attributes for a SVG element
         
   ### attributes(object) [line 696 - 700]
         Common attributes for all the SVG element
         
         
   ###  function createBalloonElement(balloonType) [line 710 - 715]:
         create and return a SVG Ellipse element
         
         
   ###  function createOverlayBalloon(color, element) [line 724 - 736]:
         create and return overlay balloon
         
         
   ###  function createBalloonTop(element) [line 745 - 801]:
         create and return a SVG ellipse balloonTop for selected balloons
         
         
   ###  function createOverlayBalloons(container) [line 810 - 866]:
         create overlay balloons when updating the structure
         
         
   ###  function createUse(id) [line 876 - 883]:
         create and return a SVG ellipse balloonTop for selected balloons
