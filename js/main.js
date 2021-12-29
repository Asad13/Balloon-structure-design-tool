createDeisgn(structure = "Duplet Square Pack");// Initial Balloon structure design to show the visitor;

// Function for activating or disabling any button
/**
 * @function
 * @name handleBtns
 * @param {HTMLInputElement} btn The button to activate or disable
 * @param {boolean} activate what to do with the button, true means to activate it
 */
const handleBtns = (btn, activate) => {
    if (activate) {
        btn.disabled = false;
        btn.tabIndex = "0";
        btn.style.cursor = "pointer";
        btn.style.opacity = "1";
    } else {
        btn.disabled = true;
        btn.tabIndex = "-1";
        btn.style.cursor = "not-allowed";
        btn.style.opacity = "0.3";
    }
}

// Function for activating or disabling buttons
/**
 * @function
 * @name setBtns
 * @param {string} structure The structure whose buttons will be set
 */
const setBtns = structure => {
    // Activate the "Modifica palloncini" Buttons for 6", 12" and 12" X-pattern structure
    const editBtns = document.querySelectorAll(".Edit-ballons-btns");
    if (structure == '6" Grid' || structure == '12" Grid' || structure == '12" X-Pattern') {
        for (let i = 0; i < editBtns.length; i++) {
            handleBtns(editBtns[i], true);
        }
    } else {
        for (let i = 0; i < editBtns.length; i++) {
            handleBtns(editBtns[i], false);
        }
    }

    // Disabling column add,delete and separation action for "Column" and "Arch structure"
    const modifyColumnBtns = document.querySelectorAll(".Modifica-Colonna-btns");
    if (structure == "Column" || structure == "Arch") {
        for (let i = 0; i < modifyColumnBtns.length; i++) {
            handleBtns(modifyColumnBtns[i], false);
        }
    } else {
        for (let i = 0; i < modifyColumnBtns.length; i++) {
            handleBtns(modifyColumnBtns[i], true);
        }
    }
    const modifyRowBtns = document.querySelectorAll(".Modifica-row-btns");
    for (let i = 0; i < modifyRowBtns.length; i++) {
        handleBtns(modifyRowBtns[i], true);
    }

    const dragActivateButtons = document.querySelectorAll(".drag-activation-buttons");
    for (let i = 0; i < dragActivateButtons.length; i++) {
        handleBtns(dragActivateButtons[i], true);
    }

    let widthViewr = document.getElementById("width");
    let heightViewr = document.getElementById("height");
    if (structure == "Arch") {
        handleBtns(heightViewr, false);
    } else {
        handleBtns(heightViewr, true);
    }

    if (structure == "Column") {
        handleBtns(widthViewr, false);
    } else {
        handleBtns(widthViewr, true);
    }
}

/*
Adding a class to one of the top buttons to show user it is selected when clicked.
This will make the bottom border of the button white.
*/
const toolsButtons = document.querySelectorAll(".tools-section-btn");

for (let i = 0; i < toolsButtons.length; i++) {
    toolsButtons[i].addEventListener("click", function () {
        for (let j = 0; j < toolsButtons.length; j++) {
            if (toolsButtons[j].classList.contains("selectedBtn")) {
                toolsButtons[j].classList.remove("selectedBtn");
            }
        }
        this.classList.add("selectedBtn");
        // Getting every sections in tools section
        let sections = document.querySelectorAll(".sections");
        // Geeting the id of the section whose relative button is clicked
        let sectionId = this.getAttribute("id").substring(0, this.getAttribute("id").lastIndexOf("-"));
        // Hiding all the sections except the one whose button is clicked
        for (let k = 0; k < sections.length; k++) {
            if (sections[k].getAttribute("id") != sectionId) {
                sections[k].style.display = "none";
            }
        }
        // Showing the section whose button is clicked
        document.getElementById(sectionId).style.display = "flex";
    })
}

/**
 * Determines if a color code represents a dark or light color
 * @function
 * @name lightOrDark
 * @param {string} color - The color code value of an element's color or background color
 * @returns {string} color is light or dark
 */
function lightOrDark(color) {
    // Variables for red, green, blue values
    let r, g, b, hsp;
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);;

        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {

        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
            color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {
        return 'light';
    }
    else {
        return 'dark';
    }
}

function getHue(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0)
        h = 0;
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    else if (cmax == g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return [h, s, l];
}

// RGB to hex converter
const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`;

/*
Converting HSL values to HEX
*/
function HSLToHex(h, s, l) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
}

/**
 * creates a color scheme for the selected color
 * @function
 * @name createColorScheme
 * @params {string} color - Hex color code
*/
function createColorScheme(color) {
    let [hue, saturation, lightness] = getHue(color);

    let complementaryEl = document.querySelector(".complementary-colors-container .initial-colors");
    let complementaryColor = HSLToHex(((hue + 180 > 360) ? (hue - 180) : (hue + 180)), saturation, lightness);
    complementaryEl.style.background = hue == 0 ? "#000000" : complementaryColor;
    // Changing the text color based on background color
    if (hue == 0) {
        complementaryEl.style.color = "#FFFFFF";
    } else if (lightOrDark(complementaryColor) == "light") {
        complementaryEl.style.color = "#000000";
    } else {
        complementaryEl.style.color = "#FFFFFF";
    }
    complementaryEl.innerHTML = hue == 0 ? "#000000" : complementaryColor.toUpperCase();

    // Setting Monochromatic Color
    let schemeMono = new ColorScheme;
    schemeMono.from_hue(hue).scheme("mono");
    let monoEl = document.querySelector(".monochromatic-colors-container .initial-colors");
    monoEl.style.background = "#" + schemeMono.colors()[0];
    monoEl.innerHTML = "#" + schemeMono.colors()[0].toUpperCase();

    let colors;

    // Setting Triadic Color
    let schemeTriadic = new ColorScheme;
    schemeTriadic.from_hue(hue).scheme("triade");
    let triadicEls = document.querySelectorAll(".triadic-colors-container .initial-colors");
    colors = schemeTriadic.colors();
    for (let i = 0; i < triadicEls.length; i++) {
        triadicEls[i].style.background = "#" + colors[i];
        triadicEls[i].innerHTML = "#" + colors[i].toUpperCase();
    }

    // Setting Tetradic Color
    let schemeTetradic = new ColorScheme;
    schemeTetradic.from_hue(hue).scheme("tetrade");
    let tetradicEls = document.querySelectorAll(".tetradic-colors-container .initial-colors");
    colors = schemeTetradic.colors();
    for (let i = 0; i < tetradicEls.length; i++) {
        tetradicEls[i].style.background = "#" + colors[i];
        tetradicEls[i].innerHTML = "#" + colors[i].toUpperCase();
    }

    // Setting Analogic Color
    let schemeAnalogic = new ColorScheme;
    schemeAnalogic.from_hue(hue).scheme("analogic");
    let analogicEls = document.querySelectorAll(".analogic-colors-container .initial-colors");
    colors = schemeAnalogic.colors();
    for (let i = 0; i < analogicEls.length; i++) {
        analogicEls[i].style.background = "#" + colors[i];
        analogicEls[i].innerHTML = "#" + colors[i].toUpperCase();
    }
}

/*
 Changing the value of the element with class name "selectedColor" whenever
 someone picks a color from the color input field.
*/
document.getElementById("colorPicker").addEventListener("change", function () {
    let el = document.querySelector(".selectedColor"); // Getting the element with class "selectedColor" 
    el.style.background = this.value; // setting its value to the value of the colorwheel
    // Converting to hex value if the color code in rgb
    let color = this.value;
    if (color.match(/^rgb/)) {
        color = rgb2hex(color);
    }
    let container = document.querySelector(".recent-colors-container");
    addRecentColor(container, color); // Adding it to recent color section
    createColorScheme(color); // Creating color scheme for newly selected color

    let brightness = lightOrDark(color);// getting the newly selected color is dark or light
    // Based on dark or light changing the text color of it
    if (brightness == 'dark') {
        el.style.color = "#ffffff";
    } else {
        el.style.color = "#0f0f0f";
    }
});


/*
Updating recent color section whenever a new color is selected
*/
function addRecentColor(container, color) {
    let el = document.createElement('span');
    el.classList.add("initial-colors");
    el.style.background = color;
    // Changing the text color based on background color
    if (lightOrDark(color) == "light") {
        el.style.color = "#000000";
    } else {
        el.style.color = "#FFFFFF";
    }
    let text = document.createTextNode(color.toUpperCase());
    el.appendChild(text);

    el.addEventListener("click", function () {
        document.getElementById("colorPicker").value = color; // setting the value of color picker input element with the newly selected color 
        document.querySelector(".selectedColor").style.background = color; // setting the background of color picker input element with the newly selected color 
        createColorScheme(color); // Creating color scheme for newly selected color
    });

    container.insertBefore(el, container.firstElementChild);
}

/* when a new initial color is selected updating the colorwheel and adding it to the recent color section */
let colors = document.querySelectorAll(".initial-colors"); // Getting all the color options

for (let i = 0; i < colors.length; i++) {
    colors[i].addEventListener('click', function () {
        // Converting to hex value if the color code in rgb
        let color = this.style.background;
        if (color.match(/^rgb/)) {
            color = rgb2hex(color);
        }
        document.getElementById("colorPicker").value = color; // setting the value of color picker input element with the newly selected color 
        document.querySelector(".selectedColor").style.background = color; // setting the background of color picker input element with the newly selected color 

        // Changing the text color based on background color
        if (lightOrDark(color) == "light") {
            document.querySelector(".selectedColor").style.color = "#000000";
        } else {
            document.querySelector(".selectedColor").style.color = "#FFFFFF";
        }
        if (!this.classList.contains("recent-color")) {
            colors[i].classList.add("recent-color"); // Adding a class recent-color to mark this color as recent
            let container = document.querySelector(".recent-colors-container");
            addRecentColor(container, color); // Adding it to recent color section
        }
        createColorScheme(color); // Creating color scheme for newly selected color
    });
}

/* 
Removing all selected balloons(the balloons whose has been colored earlier)
*/
document.querySelector(".clean-grid").addEventListener('click', function () {
    let selectedBalloons = document.querySelectorAll(".selected-balloon");// All the selected balloons
    if (selectedBalloons.length > 0) {
        let isOk = confirm("Tutto il contenuto della griglia verra resettato. I palloncini torneranno al loro colore originale.\nConfermi di voler cancellare tutti i colori dai palloncini nella griglia?");// Verifying that user want to remove all the selected(made colorful) balloons
        if (isOk) {
            for (let i = 0; i < selectedBalloons.length; i++) {
                selectedBalloons[i].classList.remove("selected-balloon");
            }
            let gs = document.getElementsByTagNameNS("http://www.w3.org/2000/svg", "g");
            for (let i = 0; i < gs.length; i++) {
                gs[i].parentElement.removeChild(gs[i]);
            }
            setInformationTable(document.getElementById("structure").value);
        }
    }
});

// Changing the shape and position of the balloon structure background image:

let movePixel = 50;

function enableRicalcaBtnsActivity(balloonStructureContainer, balloonStructureBackground) {
    // shortening the background image:
    document.getElementById("bgImagetraceSmaller").addEventListener("click", function () {
        if (balloonStructureBackground.clientWidth > 0) {
            balloonStructureBackground.style.width = balloonStructureBackground.clientWidth - (balloonStructureContainer.clientWidth / 100) + "px";
        }
    });

    // enlarging the background image:
    document.getElementById("bgImagetraceBigger").addEventListener("click", function () {
        balloonStructureBackground.style.width = balloonStructureBackground.clientWidth + (balloonStructureContainer.clientWidth / 100) + "px";
    });

    // Moving Up the background image:
    document.getElementById("bgImagetraceUp").addEventListener("click", function () {
        if (balloonStructureBackground.offsetTop > -balloonStructureBackground.clientHeight) {
            // balloonStructureBackground.style.top = balloonStructureBackground.offsetTop - (balloonStructureContainer.clientHeight / 100) + "px";
            balloonStructureBackground.style.top = balloonStructureBackground.offsetTop - movePixel + "px";
        }
    });

    // Moving Down the background image:
    document.getElementById("bgImagetraceDown").addEventListener("click", function () {
        if (balloonStructureBackground.offsetTop < balloonStructureContainer.clientHeight) {
            // balloonStructureBackground.style.top = balloonStructureBackground.offsetTop + (balloonStructureContainer.clientHeight / 100) + "px";
            balloonStructureBackground.style.top = balloonStructureBackground.offsetTop + movePixel + "px";
        }
    });

    // Moving Left the background image:
    document.getElementById("bgImagetraceLeft").addEventListener("click", function () {
        if (balloonStructureBackground.offsetLeft > -balloonStructureBackground.clientWidth) {
            // balloonStructureBackground.style.left = balloonStructureBackground.offsetLeft - (balloonStructureContainer.clientWidth / 100) + "px";
            balloonStructureBackground.style.left = balloonStructureBackground.offsetLeft - movePixel + "px";
        }
    });

    // Moving Down the background image:
    document.getElementById("bgImagetraceRight").addEventListener("click", function () {
        if (balloonStructureBackground.offsetLeft < balloonStructureContainer.clientWidth) {
            // balloonStructureBackground.style.left = balloonStructureBackground.offsetLeft + (balloonStructureContainer.clientWidth / 100) + "px";
            balloonStructureBackground.style.left = balloonStructureBackground.offsetLeft + movePixel + "px";
        }
    });

    // Moving Down the background image:
    document.getElementById("toggleBackground").addEventListener("click", function () {
        if (balloonStructureBackground.style.visibility != "hidden") {
            balloonStructureBackground.style.visibility = "hidden";
            this.innerHTML = "Mostra sfondo";
        } else {
            balloonStructureBackground.style.visibility = "visible";
            this.innerHTML = "Nascondi sfondo";
        }
    });
}
/*
Displaying uploaded image in Ricalca Section
*/
document.getElementById("backgroundImage").addEventListener("change", function (event) {
    if (event.target.files) {
        const el = document.querySelector('.selectedBackground');// getting the element where the selected background image will be shown
        el.style.background = `url("${URL.createObjectURL(event.target.files[0])}") no-repeat center`;// setting the background image there
        el.style.backgroundSize = "auto 150px"; // resizing the background image

        // Setting the background of the svg (balloon structure design) with the new image
        const balloonStructureContainer = document.querySelector(".structure-design-section");
        if (balloonStructureContainer.contains(document.querySelector(".balloon-structure-background"))) {
            balloonStructureContainer.removeChild(document.querySelector(".balloon-structure-background"));
        }
        const balloonStructureBackground = document.createElement("img");
        balloonStructureBackground.setAttribute("src", `${URL.createObjectURL(event.target.files[0])}`);
        balloonStructureBackground.setAttribute("alt", "Balloon Structure Background");
        balloonStructureBackground.classList.add("balloon-structure-background");
        balloonStructureContainer.insertBefore(balloonStructureBackground, balloonStructureContainer.childNodes[0]);
        // Enabling all the resize or move button
        let ricalcaBtns = document.querySelectorAll(".ricalca-btns");
        for (let i = 0; i < ricalcaBtns.length; i++) {
            ricalcaBtns[i].disabled = false;
            ricalcaBtns[i].tabIndex = "0";
            ricalcaBtns[i].style.cursor = "pointer";
            if (ricalcaBtns[i].classList.contains("toggle-btns")) {
                ricalcaBtns[i].style.color = "rgb(97, 96, 96)";
            } else {
                ricalcaBtns[i].firstElementChild.style.opacity = "1";
            }
        }
        enableRicalcaBtnsActivity(balloonStructureContainer, balloonStructureBackground);
    }
});

/*
Updating precision slider[Precisione movimento] value when the slider is moved
*/

document.getElementById("PrecisioneRange").addEventListener("input", function () {
    movePixel = 1 + (100 - this.value);
    document.getElementById("PrecisioneValue").innerHTML = this.value;
});

/*
Displaying uploaded image in Edit screen
*/
document.getElementById("backgroundImageSfondo").addEventListener("change", function (event) {
    if (event.target.files) {
        document.querySelector(".edit-screen").style.display = "flex";
        const el = document.querySelector('.balloons');
        el.style.background = `url("${URL.createObjectURL(event.target.files[0])}") no-repeat center`;
        el.style.backgroundSize = "auto 100%";
    }
});

/*
Updating value of the horizontal shifter edit slider and changing the balloons' position accordingly horizontally
*/
const shiftValues = {
    "left": 0,
    "top": 0,
    "zoom": "50%",
    "rotate": 0
}
document.getElementById("horizontalShift").addEventListener("input", function () {
    this.nextElementSibling.innerHTML = this.value + "&percnt;";
    const container = document.querySelector(".balloons");
    const img = document.getElementById("previewImage");
    shiftValues["left"] = `${(container.clientWidth / 100) * this.value}px`;
    img.style.left = shiftValues["left"];
});

/*
Updating value of the vertical shifter edit slider and changing the balloons' position accordingly vertically
*/
document.getElementById("verticalShift").addEventListener("input", function () {
    this.nextElementSibling.innerHTML = this.value + "&percnt;";
    const container = document.querySelector(".balloons");
    const img = document.getElementById("previewImage");
    shiftValues["top"] = `${(container.clientHeight / 100) * this.value}px`;
    img.style.top = shiftValues["top"];
});
//transform = `translate(${shiftValues["translateX"]},${shiftValues["translateY"]}) scale(${shiftValues["zoom"]},${shiftValues["zoom"]}) rotateZ(${shiftValues["rotate"]})`;

/*
Updating value of the rotate edit slider and rotate the balloons' accordingly
*/
document.getElementById("rotationalShift").addEventListener("input", function () {
    this.nextElementSibling.innerHTML = this.value + "&deg;";
    const img = document.getElementById("previewImage");
    shiftValues["rotate"] = `${this.value}deg`;
    img.style.transform = `rotateZ(${shiftValues["rotate"]})`;
});

/*
Updating value of the zoom edit slider and zooming the balloonss accordingly
*/
document.getElementById("zoomShift").addEventListener("input", function () {
    this.nextElementSibling.innerHTML = this.value + "&percnt;";
    const img = document.getElementById("previewImage");
    shiftValues["zoom"] = `${this.value}%`;
    img.style.width = shiftValues["zoom"];
});

/*
Replace background image
*/
document.querySelector(".replace-background").addEventListener('click', function () {
    document.querySelector(".edit-screen").style.display = "none";
});

// Save Image wil balloon design
document.getElementById("saveImageSfondo").addEventListener("click", function () {
    html2canvas(document.querySelector(".preview")).then(function (canvas) {
        const a = document.createElement("a");
        a.href = canvas.toDataURL();
        a.download = "designballoons.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});

// Add one more row to the structure
document.getElementById("addRowBtn").addEventListener("click", function () {
    structureInfo.row += 1;
    changeDimension(structureInfo.structureType, structureInfo.balloonSize);
    structureInfo.updating = true;
    updateAddRowInformation();
    createDeisgn(structure = structureInfo.structureType, row = structureInfo.row, column = structureInfo.column);
});

// Add one more column to the structure
document.getElementById("addColonnaBtn").addEventListener("click", function () {
    structureInfo.column += 1;
    changeDimension(structureInfo.structureType, structureInfo.balloonSize);
    structureInfo.updating = true;
    updateAddColumnInformation();
    createDeisgn(structure = structureInfo.structureType, row = structureInfo.row, column = structureInfo.column);
});

// Function for activating or disabling any button
/**
 * @function
 * @name disableBtns
 * @param {string} structure The structure whose buttons will be set
 * @param {string} id id of the delete button
 */
const disableBtns = id => {
    const controlBtns = document.querySelectorAll(".control-btns");
    for (let i = 0; i < controlBtns.length; i++) {
        if (controlBtns[i].getAttribute("id") != id) {
            handleBtns(controlBtns[i], false);
        }
    }
}

let activateDragColoring = false;
document.getElementById("activateDragColoring").addEventListener("click", function () {
    const lb = document.querySelector('.hint');
    if (!activateDragColoring) {
        this.value = "Disattiva colorazione ad area";
        this.setAttribute("data-state", "enabled");
        addMultiple = true;
        activateDragColoring = true;
        lb.style.display = 'block';
        // document.getElementById("activateDragDecoloring").value = "Abilita la decolorazione multipla";
        // document.getElementById("activateDragDecoloring").setAttribute("data-state", "disabled");
        // removeMultiple = false;
        // activateDragDecoloring = false;
    } else {
        this.value = "Attiva colorazione ad area";
        this.setAttribute("data-state", "disabled");
        addMultiple = false;
        activateDragColoring = false;
        lb.style.display = 'none';
    }
});

// Separate rows of the structure
let rowGapState = false;
document.getElementById("separateRowBtn").addEventListener("click", function () {
    structureInfo.updating = true;
    if (!rowGapState) {
        this.value = "Unisci righe";
        structureInfo.rowGap = true;
        createDeisgn(structure = structureInfo.structureType, row = structureInfo.row, column = structureInfo.column);
        changeDimension(structureInfo.structureType, structureInfo.balloonSize);
        rowGapState = true;
    } else {
        this.value = "Separa righe";
        structureInfo.rowGap = false;
        createDeisgn(structure = structureInfo.structureType, row = structureInfo.row, column = structureInfo.column);
        changeDimension(structureInfo.structureType, structureInfo.balloonSize);
        rowGapState = false;
    }
});

// Separate rows of the structure
let columnGapState = false;
document.getElementById("separateColonaBtn").addEventListener("click", function () {
    structureInfo.updating = true;
    if (!columnGapState) {
        this.value = "Unisci Colonne";
        structureInfo.columnGap = true;
        createDeisgn(structure = structureInfo.structureType, row = structureInfo.row, column = structureInfo.column);
        changeDimension(structureInfo.structureType, structureInfo.balloonSize);
        columnGapState = true;
    } else {
        this.value = "Separa Colonne";
        structureInfo.columnGap = false;
        createDeisgn(structure = structureInfo.structureType, row = structureInfo.row, column = structureInfo.column);
        changeDimension(structureInfo.structureType, structureInfo.balloonSize);
        columnGapState = false;
    }
});

// Inflate the balloons of the structure
let inflateBalloons = false;
document.getElementById("inflateBalloonsBtn").addEventListener("click", function () {
    // structureInfo.updating = true;
    let balloons = document.querySelectorAll(".balloon");
    if (!inflateBalloons) {
        this.value = "Conferma";
        disableBtns(this.getAttribute("id"));
        for (let i = 0; i < balloons.length; i++) {
            balloons[i].setAttributeNS(null, "fill-opacity", "0.3");
            balloons[i].setAttributeNS(null, "stroke-opacity", "0.3");
            if (balloons[i].getAttribute("data-balloonShape").indexOf("Tondo") < 0) {
                balloons[i].style.cursor = "not-allowed";
                balloons[i].style.pointerEvents = "none";
            }
        }
        let selectedBalloons = document.querySelectorAll(".selected-balloon");
        for (let i = 0; i < selectedBalloons.length; i++) {
            if (selectedBalloons[i].getAttributeNS(null, "id").indexOf("overlay") > -1) {
                document.getElementById(selectedBalloons[i].getAttributeNS(null, "id")).style.pointerEvents = "none";
            }
        }
        addBalloon = false;
        inflateBalloonNew = true;
        inflateBalloons = true;
    } else {
        this.value = "Gonfia palloncini";
        setBtns(structureInfo.structureType);
        for (let i = 0; i < balloons.length; i++) {
            balloons[i].setAttributeNS(null, "fill-opacity", "1");
            balloons[i].setAttributeNS(null, "stroke-opacity", "1");
            if (balloons[i].getAttribute("data-balloonShape").indexOf("Tondo") < 0) {
                balloons[i].style.cursor = "pointer";
                balloons[i].style.pointerEvents = "auto";
            }
        }
        let selectedBalloons = document.querySelectorAll(".selected-balloon");
        for (let i = 0; i < selectedBalloons.length; i++) {
            if (selectedBalloons[i].getAttributeNS(null, "id").indexOf("overlay") > -1) {
                document.getElementById(selectedBalloons[i].getAttributeNS(null, "id")).style.pointerEvents = "auto";
            }
        }
        inflateBalloonNew = false;
        inflateBalloons = false;
    }
});

// Deflate the balloons of the structure
let DeflateBalloons = false;
document.getElementById("deflateBalloonsBtn").addEventListener("click", function () {
    // structureInfo.updating = true;
    let balloons = document.querySelectorAll(".balloon");
    if (!DeflateBalloons) {
        this.value = "Conferma";
        disableBtns(this.getAttribute("id"));
        for (let i = 0; i < balloons.length; i++) {
            balloons[i].setAttributeNS(null, "fill-opacity", "0.3");
            balloons[i].setAttributeNS(null, "stroke-opacity", "0.3");
            if (balloons[i].getAttribute("data-balloonShape").indexOf("Tondo") < 0) {
                balloons[i].style.cursor = "not-allowed";
                balloons[i].style.pointerEvents = "none";
            }
        }
        let selectedBalloons = document.querySelectorAll(".selected-balloon");
        for (let i = 0; i < selectedBalloons.length; i++) {
            if (selectedBalloons[i].getAttributeNS(null, "id").indexOf("overlay") > -1) {
                document.getElementById(selectedBalloons[i].getAttributeNS(null, "id")).style.pointerEvents = "none";
            }
        }
        addBalloon = false;
        deflateBalloonNew = true;
        DeflateBalloons = true;
    } else {
        this.value = "Sgonfia palloncini";
        setBtns(structureInfo.structureType);
        for (let i = 0; i < balloons.length; i++) {
            balloons[i].setAttributeNS(null, "fill-opacity", "1");
            balloons[i].setAttributeNS(null, "stroke-opacity", "1");
            if (balloons[i].getAttribute("data-balloonShape").indexOf("Tondo") < 0) {
                balloons[i].style.cursor = "pointer";
                balloons[i].style.pointerEvents = "auto";
            }
        }
        let selectedBalloons = document.querySelectorAll(".selected-balloon");
        for (let i = 0; i < selectedBalloons.length; i++) {
            if (selectedBalloons[i].getAttributeNS(null, "id").indexOf("overlay") > -1) {
                document.getElementById(selectedBalloons[i].getAttributeNS(null, "id")).style.pointerEvents = "auto";
            }
        }
        deflateBalloonNew = false;
        DeflateBalloons = false;
    }
});


const resetStructure = () => {
    if (columnGapState) {
        document.getElementById("separateColonaBtn").value = "Separa Colonne";
        structureInfo.columnGap = false;
        columnGapState = false;
    }
    if (rowGapState) {
        document.getElementById("separateRowBtn").value = "Separa righe";
        structureInfo.rowGap = false;
        rowGapState = false;
    }
}

// Change the dimension values when size and structure changes:
const changeDimension = (structure, size) => {
    let width = 0, height = 0;
    if (structure != "Alternate Size Pack") {
        const currentSize = parseInt(size.substring(0, size.indexOf('"')));
        if (!isNaN(currentSize)) {
            switch (structure) {
                case "Duplet Square Pack":
                    width = parseInt(((dimensions[structure]["baseColumnWidth"] + (2 * (currentSize - 3) * 2.2)) * structureInfo.column + ((structureInfo.columnGap) ? 12.7 * structureInfo.column : 0)) * 100) / 100.00;
                    height = parseInt(((dimensions[structure]["baseRowHeight"] + (2 * (currentSize - 3) * 1.334)) * structureInfo.row + ((structureInfo.rowGap) ? 7.62 * structureInfo.row : 0)) * 100) / 100.00;
                    break;
                case "Gridz":
                    width = parseInt(((dimensions[structure]["baseColumnWidth"] * (currentSize / 6)) * (structureInfo.column * 4) + ((structureInfo.columnGap) ? (15.24 * (structureInfo.column * 4)) : 0)) * 100) / 100.00;
                    height = parseInt(((dimensions[structure]["baseRowHeight"] * (currentSize / 6)) * structureInfo.row + ((structureInfo.rowGap) ? (15.24 * structureInfo.row) : 0)) * 100) / 100.00;
                    break;
                case "Gridz Alternate Horizontal":
                    width = parseInt(((dimensions[structure]["baseColumnWidth"] * (currentSize / 6)) * (structureInfo.column * 4) + ((structureInfo.columnGap) ? (15.24 * (structureInfo.column * 4)) : 0)) * 100) / 100.00;
                    height = parseInt(((dimensions[structure]["baseRowHeight"] * (currentSize / 6)) * structureInfo.row * 4 + ((structureInfo.rowGap) ? (15.24 * structureInfo.row) : 0)) * 100) / 100.00;
                    break;
                case "Gridz Alternate Vertical":
                    width = parseInt(((dimensions[structure]["baseColumnWidth"] * (currentSize / 6)) * (structureInfo.column * 4) + ((structureInfo.columnGap) ? (15.24 * (structureInfo.column * 4)) : 0)) * 100) / 100.00;
                    height = parseInt(((dimensions[structure]["baseRowHeight"] * (currentSize / 6)) * structureInfo.row + ((structureInfo.rowGap) ? (15.24 * structureInfo.row) : 0)) * 100) / 100.00;
                    break;
                case "Column":
                    switch (currentSize) {
                        case 4:
                            width = 27.94;
                            break;
                        case 5:
                            width = 33.02;
                            break;
                        case 6:
                            width = 40.64;
                            break;
                        case 7:
                            width = 45.72;
                            break;
                        case 8:
                            width = 50.80;
                            break;
                        case 9:
                            width = 55.88;
                            break;
                        case 10:
                            width = 60.96;
                            break;
                        case 11:
                            width = 66.04;
                            break;
                        case 12:
                            width = 71.12;
                            break;
                        default:
                            width = 33.02;
                    }
                    let multiply = (currentSize == 5) ? 3.90625 : 3.905;
                    height = parseInt(((dimensions[structure]["baseRowHeight"] + ((currentSize - 4) * multiply)) * structureInfo.row + ((structureInfo.rowGap) ? 11.43 * structureInfo.row : 0)) * 100) / 100.00;
                    break;
                case '6" Grid':
                    width = parseInt((dimensions[structure]["baseColumnWidth"] * structureInfo.column + ((structureInfo.columnGap) ? (14.47823529 * structureInfo.column) : 0)) * 100) / 100.00;
                    height = parseInt((dimensions[structure]["baseRowHeight"] * structureInfo.row + ((structureInfo.rowGap) ? (14.47833333 * structureInfo.row) : 0)) * 100) / 100.00;
                    break;
                case '12" Grid':
                    width = parseInt((dimensions[structure]["baseColumnWidth"] * structureInfo.column + ((structureInfo.columnGap) ? (38.1 * structureInfo.column) : 0)) * 100) / 100.00;
                    height = parseInt((dimensions[structure]["baseRowHeight"] * structureInfo.row + ((structureInfo.rowGap) ? (38.1 * structureInfo.row) : 0)) * 100) / 100.00;
                    break;
                case '12" X-Pattern':
                    width = parseInt((dimensions[structure]["baseColumnWidth"] * structureInfo.column + ((structureInfo.columnGap) ? (54.86384615 * structureInfo.column) : 0)) * 100) / 100.00;
                    height = parseInt((dimensions[structure]["baseRowHeight"] * structureInfo.row + ((structureInfo.rowGap) ? (54.865 * structureInfo.row) : 0)) * 100) / 100.00;
                    break;
                case "Arch":
                    let multiply1 = 1.27203;
                    width = parseInt(((dimensions[structure]["baseColumnWidth"] + ((currentSize - 4) * multiply1)) * structureInfo.row + ((structureInfo.rowGap) ? 11.43 * structureInfo.row : 0)) * 100) / 100;
                    height = width / 2;
                    break;
                default:
                    width = parseInt(((dimensions[structure]["baseColumnWidth"] + (2 * (currentSize - 3) * 2.2)) * structureInfo.column + ((structureInfo.columnGap) ? 12.7 * structureInfo.column : 0)) * 100) / 100.00;
                    height = parseInt(((dimensions[structure]["baseRowHeight"] + (2 * (currentSize - 3) * 1.334)) * structureInfo.row + ((structureInfo.rowGap) ? 7.62 * structureInfo.row : 0)) * 100) / 100.00;
            }
        }
    } else {
        switch (size) {
            case '6" / 4.5"':
                width = 31.12 + (structureInfo.column - 1) * 26.035;
                height = 15.88 + (structureInfo.row - 1) * 10.7945;
                break;
            case '7" / 5.5"':
                width = 36.20 + (structureInfo.column - 1) * 29.84;
                height = 18.16 + (structureInfo.row - 1) * 13.34;
                break;
            case '8" / 6.5"':
                width = 41.91 + (structureInfo.column - 1) * 34.29;
                height = 21.59 + (structureInfo.row - 1) * 15.24;
                break;
            case '9" / 7"':
                width = 47.24 + (structureInfo.column - 1) * 38.1;
                height = 23.50 + (structureInfo.row - 1) * 17.14;
                break;
            case '9" / 7.5"':
                width = 47.24 + (structureInfo.column - 1) * 38.1;
                height = 23.50 + (structureInfo.row - 1) * 17.14;
                break;
            case '10" / 8.5"':
                width = 52.32 + (structureInfo.column - 1) * 41.91;
                height = 26.04 + (structureInfo.row - 1) * 19.68;
                break;
            default:
                width = 31.12 + (structureInfo.column - 1) * 26.035;
                height = 15.88 + (structureInfo.row - 1) * 10.7945;
        }
        width += ((structureInfo.columnGap) ? 40.386 * structureInfo.column : 0);
        height += ((structureInfo.rowGap) ? (18.2875 * structureInfo.row) : 0);
        if (structureInfo.row <= 0 || structureInfo.column <= 0) {
            width = 0;
            height = 0;
        }
        width = parseInt(width * 100) / 100.00;
        height = parseInt(height * 100) / 100.00;
    }
    structureInfo.width = `${width}`;
    structureInfo.height = `${height}`;
    document.getElementById("width").value = width;
    document.getElementById("height").value = height;
}

function setStructure(structureEl) {
    let structure = structureEl.value;
    let options = sizes[structure];
    if (options.length == 0) {
        document.getElementById("size-select-container").style.display = "none";
    } else {
        document.getElementById("size-select-container").style.display = "inline-block";
        let sizeSlelectEl = document.getElementById("size");
        // delete the current set of <option> elements out of the
        // day <select>, ready for the next set to be injected
        while (sizeSlelectEl.firstElementChild) {
            sizeSlelectEl.removeChild(sizeSlelectEl.firstElementChild);
        }

        for (let i = 0; i < options.length; i++) {
            let option = document.createElement('option');
            option.textContent = options[i];
            option.value = options[i];
            if (structure == "Duplet Square Pack" || structure == "Column" || structure == "Arch") {
                if (options[i] == '5"') {
                    option.setAttribute("selected", "selected");
                }
            } else if (i == 0) {
                option.setAttribute("selected", "selected");
            }
            sizeSlelectEl.appendChild(option);
        }
    }
    //
    setBtns(structure);

    // Creating balloon design for the selected structure
    selectedBalloons = {};
    resetStructure();
    structureInfo.balloonSize = document.getElementById("size").value;
    structureInfo.updating = false;
    createDeisgn(structure = structure);
    changeDimension(structure, document.getElementById("size").value);
}
// Creating size select options after a structure is selected
document.getElementById("structure").addEventListener("change", function () {
    setStructure(this);
});

window.addEventListener("resize", function () {
    setStructure(document.getElementById("structure"));
});


document.getElementById("size").addEventListener("change", function () {
    setBtns(document.getElementById("structure").value);

    // Creating balloon design for the selected structure
    selectedBalloons = {};
    resetStructure();
    structureInfo.balloonSize = this.value;
    structureInfo.updating = false;
    createDeisgn(structure = document.getElementById("structure").value);
    changeDimension(document.getElementById("structure").value, this.value);
});

// Salva section functionalities
document.querySelector(".press").addEventListener("click", () => {
    window.print();
});

window.addEventListener("beforeprint", function () {
    const svgs = this.document.querySelector(".balloon-structure").children;

    for (let i = 0; i < svgs.length; i++) {
        if (svgs[i].nodeName == "circle") {
            const r = parseFloat(svgs[i].getAttribute("r"));
            const cx = parseFloat(svgs[i].getAttribute("cx"));
            const cy = parseFloat(svgs[i].getAttribute("cy"));

            svgs[i].setAttributeNS(null, "cx", `${cx * 0.78}`);
            svgs[i].setAttributeNS(null, "cy", `${cy * 0.78}`);
            svgs[i].setAttributeNS(null, "r", `${r * 0.78}`);
        } else if (svgs[i].nodeName == "ellipse") {
            const rx = parseFloat(svgs[i].getAttribute("rx"));
            const ry = parseFloat(svgs[i].getAttribute("ry"));
            const cx = parseFloat(svgs[i].getAttribute("cx"));
            const cy = parseFloat(svgs[i].getAttribute("cy"));

            svgs[i].setAttributeNS(null, "cx", `${cx * 0.78}`);
            svgs[i].setAttributeNS(null, "cy", `${cy * 0.78}`);
            svgs[i].setAttributeNS(null, "rx", `${rx * 0.78}`);
            svgs[i].setAttributeNS(null, "ry", `${ry * 0.78}`);
        } else if (svgs[i].nodeName == "rect") {
            const width = parseFloat(svgs[i].getAttribute("width"));
            const height = parseFloat(svgs[i].getAttribute("height"));
            const x = parseFloat(svgs[i].getAttribute("x"));
            const y = parseFloat(svgs[i].getAttribute("y"));

            svgs[i].setAttributeNS(null, "x", `${x * 0.78}`);
            svgs[i].setAttributeNS(null, "y", `${y * 0.78}`);
            svgs[i].setAttributeNS(null, "width", `${width * 0.78}`);
            svgs[i].setAttributeNS(null, "height", `${height * 0.78}`);
        }
    }

});

window.addEventListener("afterprint", function () {
    const svgs = this.document.querySelector(".balloon-structure").children;

    for (let i = 0; i < svgs.length; i++) {
        if (svgs[i].nodeName == "circle") {
            const r = parseFloat(svgs[i].getAttribute("r"));
            const cx = parseFloat(svgs[i].getAttribute("cx"));
            const cy = parseFloat(svgs[i].getAttribute("cy"));

            svgs[i].setAttributeNS(null, "cx", `${cx * 50 / 39}`);
            svgs[i].setAttributeNS(null, "cy", `${cy * 50 / 39}`);
            svgs[i].setAttributeNS(null, "r", `${r * 50 / 39}`);
        } else if (svgs[i].nodeName == "ellipse") {
            const rx = parseFloat(svgs[i].getAttribute("rx"));
            const ry = parseFloat(svgs[i].getAttribute("ry"));
            const cx = parseFloat(svgs[i].getAttribute("cx"));
            const cy = parseFloat(svgs[i].getAttribute("cy"));

            svgs[i].setAttributeNS(null, "cx", `${cx * 50 / 39}`);
            svgs[i].setAttributeNS(null, "cy", `${cy * 50 / 39}`);
            svgs[i].setAttributeNS(null, "rx", `${rx * 50 / 39}`);
            svgs[i].setAttributeNS(null, "ry", `${ry * 50 / 39}`);
        } else if (svgs[i].nodeName == "rect") {
            const width = parseFloat(svgs[i].getAttribute("width"));
            const height = parseFloat(svgs[i].getAttribute("height"));
            const x = parseFloat(svgs[i].getAttribute("x"));
            const y = parseFloat(svgs[i].getAttribute("y"));

            svgs[i].setAttributeNS(null, "x", `${x * 50 / 39}`);
            svgs[i].setAttributeNS(null, "y", `${y * 50 / 39}`);
            svgs[i].setAttributeNS(null, "width", `${width * 50 / 39}`);
            svgs[i].setAttributeNS(null, "height", `${height * 50 / 39}`);
        }
    }
});

function svgToPng() {
    const container = document.querySelector(".balloon-structure");
    let svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgContainer.setAttributeNS("null", "width", `${container.clientWidth}px`);
    svgContainer.setAttributeNS("null", "height", `${container.clientHeight}px`);
    svgContainer.innerHTML = document.getElementById("allOverlays").innerHTML;
    let svgString = new XMLSerializer().serializeToString(svgContainer);

    //let canvas = document.getElementById("canvas");
    let myCanvas = document.createElement("canvas");
    myCanvas.setAttribute("width", `${container.clientWidth}px`);
    myCanvas.setAttribute("height", `${container.clientHeight}px`);
    let ctx = myCanvas.getContext("2d");
    let DOMURL = self.URL || self.webkitURL || self;
    let img = new Image();
    let svg = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    let url = DOMURL.createObjectURL(svg);
    img.addEventListener('load', function () {
        // execute drawImage statements here
        ctx.drawImage(img, 0, 0);
        png = myCanvas.toDataURL("image/png");
        const imgContainer = document.querySelector('.balloons')
        imgContainer.innerHTML = `<img id="previewImage" src="${png}"/>`;
        DOMURL.revokeObjectURL(png);
    }, false);
    img.src = url;
}

// Saving the structure as PNG
document.getElementById("saveImage").addEventListener("click", function () {
    html2canvas(document.querySelector(".structure-design-section")).then(function (canvas) {
        const a = document.createElement("a");
        a.href = canvas.toDataURL();
        a.download = "designballoons.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});

// Saving the structure background as PNG
document.getElementById("saveWithoutGrid").addEventListener("click", function () {
    const imageContainer = document.querySelector(".structure-design-section");
    document.querySelector(".balloon-structure").style.display = "none";
    html2canvas(imageContainer).then(function (canvas) {
        const a = document.createElement("a");
        a.href = canvas.toDataURL();
        a.download = "designballoons.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
    document.querySelector(".balloon-structure").style.display = "block";
});

// Saving the structure as text file(Export)
document.getElementById("export-file").addEventListener("click", function () {
    let blob = new Blob([document.querySelector(".structure-design-section").innerHTML], { type: 'text/plain' })
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "designballoons.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

// loading previous design from a text file(Import)
document.getElementById("importFile").addEventListener("change", function () {
    let fr = new FileReader();
    fr.readAsText(this.files[0]);//event.target.files[0]

    fr.addEventListener("load", function () {
        document.querySelector(".structure-design-section").innerHTML = fr.result;
    });
});

// Update(Refresh) new balloon design in the background
document.querySelector(".refresh-balloons-sfondo").addEventListener("click", function () {
    svgToPng();
    shiftValues["left"] = 0;
    shiftValues["top"] = 0;
    shiftValues["zoom"] = "50";
    shiftValues["rotate"] = 0;

    document.getElementById("horizontalShift").value = "0";
    document.getElementById("horizontalShift").nextElementSibling.innerHTML = shiftValues["left"] + "&percnt;";

    document.getElementById("verticalShift").value = "0";
    document.getElementById("verticalShift").nextElementSibling.innerHTML = shiftValues["top"] + "&percnt;";

    document.getElementById("rotationalShift").value = "0";
    document.getElementById("rotationalShift").nextElementSibling.innerHTML = shiftValues["rotate"] + "&deg;";

    document.getElementById("zoomShift").value = "50";
    document.getElementById("zoomShift").nextElementSibling.innerHTML = shiftValues["zoom"] + "&percnt;";
});

document.getElementById("width").addEventListener("change", function () {
    document.getElementById("impostaDimensioni").style.display = "block";
});

document.getElementById("height").addEventListener("change", function () {
    document.getElementById("impostaDimensioni").style.display = "block";
});

document.getElementById("impostaDimensioni").addEventListener("click", function () {
    const oldRowCount = structureInfo.row;
    const oldColumnCount = structureInfo.column;
    if (structureInfo.structureType == 'Column') {
        let newHeight = parseFloat(document.getElementById("height").value);
        let height = parseFloat(structureInfo.height);
        const heightPerRow = height / structureInfo.row;

        const newNumberOfRows = Math.round(newHeight / heightPerRow);
        structureInfo.row = newNumberOfRows;
    } else if (structureInfo.structureType == 'Arch') {
        let newWidth = parseFloat(document.getElementById("width").value);
        let width = parseFloat(structureInfo.width);
        const widthPerRow = width / structureInfo.row;

        const newNumberOfRows = Math.round(newWidth / widthPerRow);
        structureInfo.row = newNumberOfRows;
    } else {
        let newWidth = parseFloat(document.getElementById("width").value);
        let width = parseFloat(structureInfo.width);
        const widthPerColumn = width / structureInfo.column;

        const newNumberOfCloumns = Math.round(newWidth / widthPerColumn);
        structureInfo.column = newNumberOfCloumns;

        let newHeight = parseFloat(document.getElementById("height").value);
        let height = parseFloat(structureInfo.height);
        const heightPerRow = height / structureInfo.row;

        const newNumberOfRows = Math.round(newHeight / heightPerRow);
        structureInfo.row = newNumberOfRows;
    }

    this.style.display = "none";

    changeDimension(structureInfo.structureType, structureInfo.balloonSize);
    createDeisgn(structure = structureInfo.structureType, row = structureInfo.row, column = structureInfo.column);

});

// delete one row from the structure
document.getElementById("deleteRowBtn").addEventListener("click", function () {
    structureInfo.updating = true;
    let balloons = document.querySelectorAll(".balloon");
    if (!confirmDeleteRow) {
        this.value = "Conferma";
        addMultiple = false;
        startX = -1;
        startY = -1;
        endX = -1;
        endY = -1;
        activateDragColoring = false;
        document.getElementById("activateDragColoring").value = "Attiva colorazione ad area";
        document.getElementById("activateDragColoring").setAttribute("data-state", "disabled");
        document.querySelector('.hint').style.display = 'none';
        addBalloon = false;
        removeBalloon = false;
        rowDelete = true;
        disableBtns(this.getAttribute("id"));
        for (let i = 0; i < balloons.length; i++) {
            balloons[i].setAttributeNS(null, "fill-opacity", "0.3");
            balloons[i].setAttributeNS(null, "stroke-opacity", "0.3");
        }
        let selectedBalloons = document.querySelectorAll(".selected-balloon");
        for (let i = 0; i < selectedBalloons.length; i++) {
            if (selectedBalloons[i].getAttributeNS(null, "id").indexOf("overlay") > -1) {
                document.getElementById(selectedBalloons[i].getAttributeNS(null, "id")).style.pointerEvents = "none";
            }
        }
        confirmDeleteRow = true;
    } else {
        this.value = "Elimina riga";
        setBtns(structureInfo.structureType);
        rowDelete = false;
        for (let i = 0; i < balloons.length; i++) {
            balloons[i].setAttributeNS(null, "fill-opacity", "1");
            balloons[i].setAttributeNS(null, "stroke-opacity", "1");
        }
        let selectedBalloons = document.querySelectorAll(".selected-balloon");
        for (let i = 0; i < selectedBalloons.length; i++) {
            if (selectedBalloons[i].getAttributeNS(null, "id").indexOf("overlay") > -1) {
                document.getElementById(selectedBalloons[i].getAttributeNS(null, "id")).style.pointerEvents = "auto";
            }
        }
        confirmDeleteRow = false;
    }
});


// delete one column from the structure
document.getElementById("deleteColonnaBtn").addEventListener("click", function () {
    structureInfo.updating = true;
    let balloons = document.querySelectorAll(".balloon");
    if (!confirmDeleteColumn) {
        this.value = "Conferma";
        addMultiple = false;
        startX = -1;
        startY = -1;
        endX = -1;
        endY = -1;
        activateDragColoring = false;
        document.getElementById("activateDragColoring").value = "Attiva colorazione ad area";
        document.getElementById("activateDragColoring").setAttribute("data-state", "disabled");
        document.querySelector('.hint').style.display = 'none';
        addBalloon = false;
        removeBalloon = false;
        columnDelete = true;
        disableBtns(this.getAttribute("id"));
        for (let i = 0; i < balloons.length; i++) {
            balloons[i].setAttributeNS(null, "fill-opacity", "0.3");
            balloons[i].setAttributeNS(null, "stroke-opacity", "0.3");
        }
        let selectedBalloons = document.querySelectorAll(".selected-balloon");
        for (let i = 0; i < selectedBalloons.length; i++) {
            if (selectedBalloons[i].getAttributeNS(null, "id").indexOf("overlay") > -1) {
                document.getElementById(selectedBalloons[i].getAttributeNS(null, "id")).style.pointerEvents = "none";
            }
        }
        confirmDeleteColumn = true;
    } else {
        this.value = "Elimina Colonna";
        setBtns(structureInfo.structureType);
        columnDelete = false;
        for (let i = 0; i < balloons.length; i++) {
            balloons[i].setAttributeNS(null, "fill-opacity", "1");
            balloons[i].setAttributeNS(null, "stroke-opacity", "1");
        }
        let selectedBalloons = document.querySelectorAll(".selected-balloon");
        for (let i = 0; i < selectedBalloons.length; i++) {
            if (selectedBalloons[i].getAttributeNS(null, "id").indexOf("overlay") > -1) {
                document.getElementById(selectedBalloons[i].getAttributeNS(null, "id")).style.pointerEvents = "auto";
            }
        }
        confirmDeleteColumn = false;
    }
});
