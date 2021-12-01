let rowDelete = false;
let columnDelete = false;
let confirmDeleteRow = false;
let confirmDeleteColumn = false;
let addBalloon = false; // detemines a balloon will be selected or not | true = select
let removeBalloon = false;// detemines a balloon will be removed or not | true = remove
let startX = -1;
let startY = -1;
let endX = -1;
let endY = -1;
let addMultiple = false;
let removeMultiple = false;

const deleteRow = balloon => {
    addBalloon = false;
    removeBalloon = false;
    let okDelete = confirm("Sei sicuro di voler cancellare questa riga?");
    if (okDelete) {
        const currentRow = balloon.getAttribute("data-row");
        let balloons = document.querySelectorAll(".balloon");
        for (let i = 0; i < balloons.length; i++) {
            if (balloons[i].getAttribute("data-row") == currentRow) {
                if (balloons[i].classList.contains("selected-balloon")) {
                    if ((balloons[i].getAttributeNS(null, "id").indexOf("overlay") < 0)) {
                        removeFromSelectedBalloon(document.getElementById(`${balloons[i].getAttribute("id")}overlay`).getAttributeNS(null, "fill"), balloons[i].getAttribute("id"), balloons[i].getAttribute("data-balloonShape"), balloons[i].getAttribute("data-amount"));

                        let overlayContainer = document.getElementById("allOverlays");
                        overlayContainer.removeChild(document.getElementById(`${balloons[i].getAttribute("id")}overlay`));
                        overlayContainer.removeChild(document.getElementById(`${balloons[i].getAttribute("id")}balloonTop`));
                        if (balloons[i].classList.contains("top")) {
                            const useContainerTop = document.getElementById("useTop");
                            useContainerTop.removeChild(use);
                            useContainerTop.removeChild(use1);
                        } else if (balloon.classList.contains("overlay")) {
                            const useContainer = document.getElementById("use");
                            useContainer.removeChild(use);
                            useContainer.removeChild(use1);
                        }
                        balloons[i].parentElement.removeChild(balloons[i]);
                    }
                } else {
                    balloons[i].parentElement.removeChild(balloons[i]);
                }
            }
        }
        updateRemoveRowInformation(currentRow);
        structureInfo.row -= 1;
        changeDimension(structureInfo.structureType, structureInfo.balloonSize);
        createDeisgn(structure = structureInfo.structureType, row = structureInfo.row, column = structureInfo.column);
    }
}

const deleteColumn = balloon => {
    addBalloon = false;
    removeBalloon = false;
    let okDelete = confirm("Sei sicuro di voler cancellare questa colonna?");
    if (okDelete) {
        const currentColumn = balloon.getAttribute("data-column");
        let balloons = document.querySelectorAll(".balloon");
        for (let i = 0; i < balloons.length; i++) {
            if (balloons[i].getAttribute("data-column") == currentColumn) {
                if (balloons[i].classList.contains("selected-balloon")) {
                    if ((balloons[i].getAttributeNS(null, "id").indexOf("overlay") < 0)) {
                        removeFromSelectedBalloon(document.getElementById(`${balloons[i].getAttribute("id")}overlay`).getAttributeNS(null, "fill"), balloons[i].getAttribute("id"), balloons[i].getAttribute("data-balloonShape"), balloons[i].getAttribute("data-amount"));

                        let overlayContainer = document.getElementById("allOverlays");
                        overlayContainer.removeChild(document.getElementById(`${balloons[i].getAttribute("id")}overlay`));
                        overlayContainer.removeChild(document.getElementById(`${balloons[i].getAttribute("id")}balloonTop`));
                        if (balloons[i].classList.contains("top")) {
                            const useContainerTop = document.getElementById("useTop");
                            useContainerTop.removeChild(use);
                            useContainerTop.removeChild(use1);
                        } else if (balloon.classList.contains("overlay")) {
                            const useContainer = document.getElementById("use");
                            useContainer.removeChild(use);
                            useContainer.removeChild(use1);
                        }
                        balloons[i].parentElement.removeChild(balloons[i]);
                    }
                } else {
                    balloons[i].parentElement.removeChild(balloons[i]);
                }
            }
        }
        updateRemoveColumnInformation(currentColumn);
        structureInfo.column -= 1;
        changeDimension(structureInfo.structureType, structureInfo.balloonSize);
        createDeisgn(structure = structureInfo.structureType, row = structureInfo.row, column = structureInfo.column);
    }
}
/**
 * handle selection  and events for all the structure
 * @function
 * @name handleBalloons
 * @param {Element} container - SVG Container element
 * @param {Element} element - SVG element(Balloon)
 */
const handleBalloons = (container, balloon) => {
    balloon.classList.add("selected-balloon");
    const useContainer = document.getElementById("use");
    const useContainerTop = document.getElementById("useTop");

    const balloonId = balloon.getAttribute("id");
    const shape = balloon.getAttribute("data-balloonShape");
    const amount = balloon.getAttribute("data-amount");
    // Updating the selected balloon list
    updateSelectedBalloon(balloonId, shape, amount);

    let overlayballoon = createOverlayBalloon(null, element = balloon);// creating the ballon object (svg circle)
    overlayballoon.setAttributeNS(null, "id", `${balloonId}overlay`);
    let balloonTop = createBalloonTop(balloon);
    balloonTop.setAttributeNS(null, "id", `${balloonId}balloonTop`);

    if (structureInfo.structureType == '6" Grid') {
        if (overlayballoon.nodeName === "ellipse") {
            if (overlayballoon.getAttribute("rx") < overlayballoon.getAttribute("ry")) {
                balloonTop.setAttributeNS(null, "transform", `translate(-${overlayballoon.getAttribute("rx") / 5},-${overlayballoon.getAttribute("ry") / 1.7}) rotate(30,${overlayballoon.getAttribute("cx")},${overlayballoon.getAttribute("cy")})`)// transforming balloon top ellipse 
            } else {
                balloonTop.setAttributeNS(null, "transform", `translate(-${overlayballoon.getAttribute("rx") / 1.7},-${overlayballoon.getAttribute("ry") / 4}) rotate(60,${overlayballoon.getAttribute("cx")},${overlayballoon.getAttribute("cy")})`)// transforming balloon top ellipse 
            }
        }
    }

    let use, use1;
    if (balloon.classList.contains("top") || balloon.classList.contains("overlay")) {
        use = createUse(`${balloonId}overlay`);
        use1 = createUse(`${balloonId}balloonTop`);
        if (balloon.classList.contains("top")) {
            useContainerTop.appendChild(use);
            useContainerTop.appendChild(use1);
        } else if (balloon.classList.contains("overlay")) {
            useContainer.appendChild(use);
            useContainer.appendChild(use1);
        }
    }

    overlayballoon.addEventListener("click", function () {
        balloon.classList.remove("selected-balloon");
        if (balloon.classList.contains("top")) {
            useContainerTop.removeChild(use);
            useContainerTop.removeChild(use1);
        } else if (balloon.classList.contains("overlay")) {
            useContainer.removeChild(use);
            useContainer.removeChild(use1);
        }
        removeFromSelectedBalloon(this.getAttributeNS(null, "fill"), balloon.getAttribute("id"), balloon.getAttribute("data-balloonShape"), balloon.getAttribute("data-amount"));
        this.parentElement.removeChild(this.nextElementSibling);
        this.parentElement.removeChild(this);
    });

    overlayballoon.addEventListener('mousedown', function () {
        if (removeBalloon) {
            balloon.classList.remove("selected-balloon");
            if (balloon.classList.contains("top")) {
                useContainerTop.removeChild(use);
                useContainerTop.removeChild(use1);
            } else if (balloon.classList.contains("overlay")) {
                useContainer.removeChild(use);
                useContainer.removeChild(use1);
            }
            removeFromSelectedBalloon(this.getAttributeNS(null, "fill"), balloon.getAttribute("id"), balloon.getAttribute("data-balloonShape"), balloon.getAttribute("data-amount"));
            this.parentElement.removeChild(this.nextElementSibling);
            this.parentElement.removeChild(this);
        }
    }, true);

    overlayballoon.addEventListener("mouseenter", function () {
        if (removeBalloon) {
            balloon.classList.remove("selected-balloon");
            if (balloon.classList.contains("top")) {
                useContainerTop.removeChild(use);
                useContainerTop.removeChild(use1);
            } else if (balloon.classList.contains("overlay")) {
                useContainer.removeChild(use);
                useContainer.removeChild(use1);
            }
            removeFromSelectedBalloon(this.getAttributeNS(null, "fill"), balloon.getAttribute("id"), balloon.getAttribute("data-balloonShape"), balloon.getAttribute("data-amount"));
            this.parentElement.removeChild(this.nextElementSibling);
            this.parentElement.removeChild(this);
        }
    });
    container.appendChild(overlayballoon); // appending an overlay balloon on selected balloon
    container.appendChild(balloonTop); // appending the balloon top(ellipse) to the svg in the html
}

const updateSelection = () => {
    Object.entries(selectedBalloons).forEach(([key, value1]) => {
        Object.entries(value1).forEach(([key, value]) => {
            const leftLimit = (startX <= endX) ? startX : endX;
            const rightLimit = (startX > endX) ? startX : endX;
            const topLimit = (startY <= endY) ? startY : endY;
            const bottomLimit = (startY > endY) ? startY : endY;
            if (addMultiple) {
                if (key == "transparent") {
                    for (let i = 0; i < value.selectedBalloonsIds.length; i++) {
                        const container = document.getElementById("allOverlays");
                        const balloon = document.getElementById(value.selectedBalloonsIds[i].id);
                        if (balloon.nodeName == "circle" || balloon.nodeName == "ellipse") {
                            let cx = parseFloat(balloon.getAttributeNS(null, "cx"));
                            let cy = parseFloat(balloon.getAttributeNS(null, "cy"));
                            if (cx >= leftLimit && cx <= rightLimit && cy >= topLimit && cy <= bottomLimit) {
                                handleBalloons(container, balloon);
                            }
                        } else if (balloon.nodeName == "rect") {
                            let cx = parseFloat(balloon.getAttributeNS(null, "x")) + (parseFloat(balloon.getAttributeNS(null, "width")) / 2);
                            let cy = parseFloat(balloon.getAttributeNS(null, "y")) + (parseFloat(balloon.getAttributeNS(null, "height")) / 2);
                            if (cx >= leftLimit && cx <= rightLimit && cy >= topLimit && cy <= bottomLimit) {
                                handleBalloons(container, balloon);
                            }
                        }
                    }
                }
            } else {
                if (key != "transparent") {
                    for (let i = 0; i < value.selectedBalloonsIds.length; i++) {
                        //const container = document.getElementById("allOverlays");
                        const balloonId = value.selectedBalloonsIds[i].id;
                        const balloon = document.getElementById(balloonId);
                        let cx = -1, cy = -1;
                        if (balloon.nodeName == "circle" || balloon.nodeName == "ellipse") {
                            cx = parseFloat(balloon.getAttributeNS(null, "cx"));
                            cy = parseFloat(balloon.getAttributeNS(null, "cy"));
                        } else if (balloon.nodeName == "rect") {
                            cx = parseFloat(balloon.getAttributeNS(null, "x")) + (parseFloat(balloon.getAttributeNS(null, "width")) / 2);
                            cy = parseFloat(balloon.getAttributeNS(null, "y")) + (parseFloat(balloon.getAttributeNS(null, "height")) / 2);
                        }
                        if (cx >= leftLimit && cx <= rightLimit && cy >= topLimit && cy <= bottomLimit) {
                            balloon.classList.remove("selected-balloon");
                            if (balloon.classList.contains("top")) {
                                let use = document.getElementById(`${balloonId}overlay-use`);
                                let use1 = document.getElementById(`${balloonId}balloonTop-use`);

                                document.getElementById("useTop").removeChild(use);
                                document.getElementById("useTop").removeChild(use1);
                            } else if (balloon.classList.contains("overlay")) {
                                let use = document.getElementById(`${balloonId}overlay-use`);
                                let use1 = document.getElementById(`${balloonId}balloonTop-use`);

                                document.getElementById("use").removeChild(use);
                                document.getElementById("use").removeChild(use1);
                            }
                            let overlayballoon = document.getElementById(`${balloonId}overlay`);
                            let balloonTop = document.getElementById(`${balloonId}balloonTop`);
                            removeFromSelectedBalloon(overlayballoon.getAttributeNS(null, "fill"), balloon.getAttribute("id"), balloon.getAttribute("data-balloonShape"), balloon.getAttribute("data-amount"));
                            overlayballoon.parentElement.removeChild(overlayballoon);
                            balloonTop.parentElement.removeChild(balloonTop);
                        }
                    }
                }
            }
        });
    });
}

document.querySelector(".balloon-structure").addEventListener("mousedown", function (event) {
    const addMultipleEnabled = document.getElementById("activateDragColoring").getAttribute("data-state");
    if (addMultipleEnabled == "enabled") {
        addMultiple = true;
    } else {
        addMultiple = false;
    }

    const removeMultipleEnabled = document.getElementById("activateDragDecoloring").getAttribute("data-state");
    if (removeMultipleEnabled == "enabled") {
        removeMultiple = true;
    } else {
        removeMultiple = false;
    }

    if (addMultiple || removeMultiple) {
        startX = event.offsetX;
        startY = event.offsetY;
    } else {
        if (event.target.classList.contains("selected-balloon") || event.target.classList == "") {
            addBalloon = false;
            removeBalloon = true;
        } else {
            removeBalloon = false;
            addBalloon = true;
        }
    }
}, true);

let boundingBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
document.querySelector(".balloon-structure").addEventListener("mousemove", function (event) {
    if (startX >= 0 && startY >= 0) {
        if (addMultiple || removeMultiple) {
            endX = event.offsetX;
            endY = event.offsetY;
            let attributes = {
                "x": `${((startX <= endX) ? startX : endX) + 2.5}`,
                "y": `${((startY <= endY) ? startY : endY) + 2.5}`,
                "width": `${Math.abs(endX - startX)}`,
                "height": `${Math.abs(endY - startY)}`,
                "stroke": "#333310",
                "stroke-width": "5",
                "fill": "rgba(255,255,0,0.4)"
            }
            if (removeMultiple) {
                attributes["stroke-dasharray"] = "20,20";
            } else {
                attributes["stroke-dasharray"] = "null";
            }
            setAllAttributes(boundingBox, attributes);
            this.appendChild(boundingBox);
        } else {
            updateSelection();
            if (this.contains(boundingBox)) {
                this.removeChild(boundingBox);
            }
        }
    }
});


document.querySelector(".balloon-structure").addEventListener("mouseup", function (event) {
    addBalloon = false;
    removeBalloon = false;
    updateSelection();
    if (addMultiple || removeMultiple) {
        addMultiple = false;
        removeMultiple = false;
        this.removeChild(boundingBox);
        startX = -1;
        startY = -1;
        endX = -1;
        endY = -1;
    }
});

/**
 * Sets all the attributes for a svg
 * @function
 * @name setBalloons
 * @param {Element} container - The svg element
 * @param {Element} element - The svg circle element(Balloon)
 */
function setBalloons(container, balloon) {
    balloon.addEventListener("mouseenter", function () {
        if (addBalloon) {
            handleBalloons(container, balloon);
        } else if (rowDelete) {
            const row = this.getAttribute("data-row");
            let balloons = document.querySelectorAll(".balloon");
            for (let i = 0; i < balloons.length; i++) {
                if (balloons[i].getAttribute("data-row") == row) {
                    balloons[i].setAttributeNS(null, "stroke", "#0f0f0f");
                }
            }
            confirmDeleteRow = true;
        } else if (columnDelete) {
            const column = this.getAttribute("data-column");
            let balloons = document.querySelectorAll(".balloon");
            for (let i = 0; i < balloons.length; i++) {
                if (balloons[i].getAttribute("data-column") == column) {
                    balloons[i].setAttributeNS(null, "stroke", "#0f0f0f");
                }
            }
            confirmDeleteColumn = true;
        }
    });

    balloon.addEventListener("mouseleave", function () {
        if (rowDelete) {
            const row = this.getAttribute("data-row");
            let balloons = document.querySelectorAll(".balloon");
            for (let i = 0; i < balloons.length; i++) {
                if (balloons[i].getAttribute("data-row") == row) {
                    if (balloons[i].classList.contains("selected-balloon")) {
                        balloons[i].setAttributeNS(null, "stroke", "#333310");
                    } else {
                        balloons[i].setAttributeNS(null, "stroke", "#ccc");
                    }
                }
            }
        } else if (columnDelete) {
            const column = this.getAttribute("data-column");
            let balloons = document.querySelectorAll(".balloon");
            for (let i = 0; i < balloons.length; i++) {
                if (balloons[i].getAttribute("data-column") == column) {
                    if (balloons[i].classList.contains("selected-balloon")) {
                        balloons[i].setAttributeNS(null, "stroke", "#333310");
                    } else {
                        balloons[i].setAttributeNS(null, "stroke", "#ccc");
                    }
                }
            }
        }
    })

    balloon.addEventListener('mousedown', function () {
        if (rowDelete) {
            deleteRow(this);
        } else if (columnDelete) {
            deleteColumn(this);
        } else if (addBalloon) {
            handleBalloons(container, balloon);
        }
    }, true);
}

/**
 * This will create design of balloons based on specific structure and size
 * @function
 * @name createDupletSquare
 * @param {number} row number of rows
 * @param {number} column number of columns
 */
const createDupletSquare = (row = 10, column = 20) => {
    let rgap = 0;
    if (structureInfo.rowGap) {
        rgap = 20;
    }
    const setUpValues = initialSetup(row = row, unitheight = 40, needsUse = false, rGap = rgap);

    let cgap = 0;
    if (structureInfo.columnGap) {
        cgap = setUpValues.width / 100;
    }

    const radius = ((setUpValues.width / column) - (((Math.sqrt(3) + 4) / 4) * setUpValues.strokeWidth)) / (1.72 + Math.sqrt(3)) - (cgap / 2); // radius of each balloon(For mobiles)

    const verticalDis = ((2 * radius) + (setUpValues.strokeWidth / 2));  // vertical distance between the centers of two adjacent balloons
    const horizontalDis = (Math.sqrt(3) * verticalDis) / 2; // horizontal distance between the centers of two adjacent balloons
    const circle = createBalloonElement("circle");
    setAllAttributes(circle, {
        "r": radius
    });

    for (let i = 1; i <= row; i++) {
        let cy = (radius + (setUpValues.strokeWidth / 2)) + (i - 1) * verticalDis + (i - 1) * rgap;
        for (let j = 1; j <= column; j++) {
            let cx = (radius + (setUpValues.strokeWidth / 2)) + (j - 1) * (2 * horizontalDis) + (j - 1) * 1.8 * cgap;
            const balloon1 = circle.cloneNode(false);
            setAllAttributes(balloon1, {
                "cx": `${cx}`,
                "cy": `${cy}`,
            });
            balloon1.setAttribute("data-balloonShape", "Tondo");
            balloon1.setAttribute("data-amount", "2");
            balloon1.setAttribute("data-row", `${i}`);
            balloon1.setAttribute("data-column", `${j}`);
            selectedBalloons["Tondo"]["transparent"].selectedBalloonsIds.push({
                "id": `${i}${j}1`,
                "amount": 2
            });
            balloon1.classList.add("balloon");
            balloon1.setAttribute("id", `${i}${j}1`);
            setBalloons(setUpValues.overlaysContainer, balloon1);
            setUpValues.container.insertBefore(balloon1, setUpValues.overlaysContainer);

            const balloon2 = circle.cloneNode(false);
            setAllAttributes(balloon2, {
                "cx": `${cx + horizontalDis}`,
                "cy": `${cy + radius}`,
            });
            balloon2.setAttribute("data-balloonShape", "Tondo");
            selectedBalloons["Tondo"]["transparent"].selectedBalloonsIds.push({
                "id": `${i}${j}2`,
                "amount": 2
            });
            balloon2.classList.add("balloon");
            balloon2.setAttribute("id", `${i}${j}2`);
            balloon2.setAttribute("data-amount", "2");
            balloon2.setAttribute("data-row", `${i}`);
            balloon2.setAttribute("data-column", `${j}`);
            setBalloons(setUpValues.overlaysContainer, balloon2);
            setUpValues.container.insertBefore(balloon2, setUpValues.overlaysContainer);
        }
    }
    if (structureInfo.updating) {
        createOverlayBalloons(setUpValues.overlaysContainer);
    }
}

/**
 * This will create design of balloons based on specific structure and size
 * @function
 * @name createAlternateSquarePack
 * @param {number} row number of rows
 * @param {number} column number of columns
 */
function createAlternateSquarePack(row = 8, column = 10) {
    let rgap = 0;
    if (structureInfo.rowGap) {
        rgap = 20;
    }
    const setUpValues = initialSetup(row = row, unitheight = 50, needsUse = true, rGap = rgap);
    selectedBalloonssCount = 0;

    let cgap = 0;
    if (structureInfo.columnGap) {
        cgap = setUpValues.width / 61;
    }

    let [ratioBigger, ratioSmaller] = document.getElementById("size").value.split("/"); // Getting the sizes for the balloon

    console.log(ratioBigger);
    ratioBigger = parseInt(ratioBigger.trim().substring(0, ratioBigger.trim().indexOf(`"`))); // need to be fixed
    ratioSmaller = parseInt(ratioSmaller.trim().substring(0, ratioSmaller.trim().indexOf(`"`)));// need to be fixed
    let multiplyBigger = 1.16;
    switch (ratioBigger) {
        case 6:
            multiplyBigger = 1.16;
            break;
        case 7:
            multiplyBigger = 1.2;
            break;
        case 8:
        case 9:
        case 10:
            multiplyBigger = 1.25;
            break;
        default:
            multiplyBigger = 1.16;
    }
    let radiusbigger = multiplyBigger * (Math.floor((ratioBigger / (ratioBigger + ratioSmaller)) * (setUpValues.width / (column * 2.5)))) - (cgap / 2); // radius of bigger balloons(For mobiles)
    let radiusSmaller = (2 / 3) * radiusbigger; // radius of smaller balloons(For mobiles)

    let cy = radiusbigger + (setUpValues.strokeWidth / 2);
    const smallSmallDis = radiusbigger + (setUpValues.strokeWidth / 4);
    const verticalDis = Math.sqrt(Math.pow((radiusbigger + radiusSmaller + (setUpValues.strokeWidth / 2)), 2) - Math.pow(smallSmallDis, 2));
    const smallBigdis = Math.sqrt(Math.pow(((2 * radiusbigger) + (setUpValues.strokeWidth / 2)), 2) - Math.pow(verticalDis, 2));


    const circle = createBalloonElement("circle"); // Mold for creating rectangular balloons

    for (let i = 1; i <= row; i++) {
        let cx = 0;
        if (i != 1) {
            cy += (verticalDis + rgap);
        }
        for (let j = 1; j <= column; j++) {// creating the ballon object (svg circle)
            const balloon = circle.cloneNode(false);// creating the ballon object (svg circle)
            setAllAttributes(balloon, {
                "cy": `${cy}`
            });
            if (i % 2 == 1) {
                if (j % 2 == 1) {
                    cx += (smallBigdis + (1.8 * cgap));
                    if (j == 1) {
                        cx -= (0.9 * cgap);
                    }
                    setAllAttributes(balloon, {
                        "cx": `${cx}`,
                        "r": `${radiusbigger}`
                    });
                    balloon.setAttribute("id", `${i}${j}1`);
                    balloon.classList.add("overlay", "balloon");
                    balloon.setAttribute("data-balloonShape", "Tondo1");
                    balloon.setAttribute("data-amount", "2");
                    balloon.setAttribute("data-row", `${i}`);
                    balloon.setAttribute("data-column", `${j}`);
                    selectedBalloons["Tondo1"]["transparent"].selectedBalloonsIds.push({
                        "id": `${i}${j}1`,
                        "amount": 2
                    });
                    setBalloons(setUpValues.overlaysContainer, balloon);
                    setUpValues.container.insertBefore(balloon, setUpValues.overlaysContainer);

                    const balloon1 = circle.cloneNode(false);// creating the 2nd big ballon object (svg circle)
                    cx += (2 * radiusbigger);
                    setAllAttributes(balloon1, {
                        "cx": `${cx}`,
                        "cy": `${cy}`,
                        "r": `${radiusbigger}`
                    });
                    balloon1.classList.add("overlay", "balloon");
                    balloon1.setAttribute("id", `${i}${j}2`);
                    balloon1.setAttribute("data-balloonShape", "Tondo1");
                    balloon1.setAttribute("data-amount", "2");
                    balloon1.setAttribute("data-row", `${i}`);
                    balloon1.setAttribute("data-column", `${j}`);
                    selectedBalloons["Tondo1"]["transparent"].selectedBalloonsIds.push({
                        "id": `${i}${j}2`,
                        "amount": 2
                    });
                    setBalloons(setUpValues.overlaysContainer, balloon1);
                    setUpValues.container.insertBefore(balloon1, setUpValues.overlaysContainer);
                } else {
                    cx += (smallBigdis + (1.8 * cgap));
                    setAllAttributes(balloon, {
                        "cx": `${cx}`,
                        "r": `${radiusSmaller}`
                    });
                    balloon.classList.add("balloon");
                    balloon.setAttribute("id", `${i}${j}1`);
                    balloon.setAttribute("data-balloonShape", "Tondo2");
                    balloon.setAttribute("data-amount", "1");
                    balloon.setAttribute("data-row", `${i}`);
                    balloon.setAttribute("data-column", `${j}`);
                    selectedBalloons["Tondo2"]["transparent"].selectedBalloonsIds.push({
                        "id": `${i}${j}1`,
                        "amount": 1
                    });
                    setBalloons(setUpValues.overlaysContainer, balloon);
                    setUpValues.container.insertBefore(balloon, setUpValues.overlaysContainer);

                    let balloon1 = circle.cloneNode(false);// creating the 2nd small ballon object (svg circle)
                    cx += smallSmallDis;
                    setAllAttributes(balloon1, {
                        "cx": `${cx}`,
                        "cy": `${cy}`,
                        "r": `${radiusSmaller}`
                    });
                    balloon1.classList.add("overlay", "balloon");
                    balloon1.setAttribute("id", `${i}${j}2`);
                    balloon1.setAttribute("data-balloonShape", "Tondo2");
                    balloon1.setAttribute("data-amount", "2");
                    balloon1.setAttribute("data-row", `${i}`);
                    balloon1.setAttribute("data-column", `${j}`);
                    selectedBalloons["Tondo2"]["transparent"].selectedBalloonsIds.push({
                        "id": `${i}${j}2`,
                        "amount": 2
                    });
                    setBalloons(setUpValues.overlaysContainer, balloon1);
                    setUpValues.container.insertBefore(balloon1, setUpValues.overlaysContainer);

                    let balloon2 = circle.cloneNode(false);// creating the 3rd small ballon object (svg circle)
                    cx += smallSmallDis;
                    setAllAttributes(balloon2, {
                        "cx": `${cx}`,
                        "cy": `${cy}`,
                        "r": `${radiusSmaller}`
                    });
                    balloon2.classList.add("balloon");
                    balloon2.setAttribute("id", `${i}${j}3`);
                    balloon2.setAttribute("data-balloonShape", "Tondo2");
                    balloon2.setAttribute("data-amount", "1");
                    balloon2.setAttribute("data-row", `${i}`);
                    balloon2.setAttribute("data-column", `${j}`);
                    selectedBalloons["Tondo2"]["transparent"].selectedBalloonsIds.push({
                        "id": `${i}${j}3`,
                        "amount": 1
                    });
                    setBalloons(setUpValues.overlaysContainer, balloon2);
                    setUpValues.container.insertBefore(balloon2, setUpValues.overlaysContainer);
                }
            } else {
                if (j % 2 == 0) {
                    attributes["r"] = radiusbigger;
                    cx += (smallBigdis + (1.8 * cgap));
                    setAllAttributes(balloon, {
                        "cx": `${cx}`,
                        "r": `${radiusbigger}`
                    });
                    balloon.classList.add("overlay", "balloon");
                    balloon.setAttribute("id", `${i}${j}1`);
                    balloon.setAttribute("data-balloonShape", "Tondo1");
                    balloon.setAttribute("data-amount", "2");
                    balloon.setAttribute("data-row", `${i}`);
                    balloon.setAttribute("data-column", `${j}`);
                    selectedBalloons["Tondo1"]["transparent"].selectedBalloonsIds.push({
                        "id": `${i}${j}1`,
                        "amount": 2
                    });
                    setBalloons(setUpValues.overlaysContainer, balloon);
                    setUpValues.container.insertBefore(balloon, setUpValues.overlaysContainer);

                    let balloon1 = circle.cloneNode(false);// creating the 2nd big ballon object (svg circle)
                    cx += (2 * radiusbigger);
                    attributes["cx"] = cx;// Second big circle
                    setAllAttributes(balloon1, {
                        "cx": `${cx}`,
                        "cy": `${cy}`,
                        "r": `${radiusbigger}`
                    });
                    balloon1.classList.add("overlay", "balloon");
                    balloon1.setAttribute("id", `${i}${j}2`);
                    balloon1.setAttribute("data-balloonShape", "Tondo1");
                    balloon1.setAttribute("data-amount", "2");
                    balloon1.setAttribute("data-row", `${i}`);
                    balloon1.setAttribute("data-column", `${j}`);
                    selectedBalloons["Tondo1"]["transparent"].selectedBalloonsIds.push({
                        "id": `${i}${j}2`,
                        "amount": 2
                    });
                    setBalloons(setUpValues.overlaysContainer, balloon1);
                    setUpValues.container.insertBefore(balloon1, setUpValues.overlaysContainer);
                } else {
                    cx += (smallBigdis + (1.8 * cgap));
                    if (j == 1) {
                        cx -= (0.9 * cgap);
                    }
                    setAllAttributes(balloon, {
                        "cx": `${cx}`,
                        "r": `${radiusSmaller}`
                    });
                    balloon.classList.add("balloon");
                    balloon.setAttribute("id", `${i}${j}1`);
                    balloon.setAttribute("data-balloonShape", "Tondo2");
                    balloon.setAttribute("data-amount", "1");
                    balloon.setAttribute("data-row", `${i}`);
                    balloon.setAttribute("data-column", `${j}`);
                    selectedBalloons["Tondo2"]["transparent"].selectedBalloonsIds.push({
                        "id": `${i}${j}1`,
                        "amount": 1
                    });
                    setBalloons(setUpValues.overlaysContainer, balloon);
                    setUpValues.container.insertBefore(balloon, setUpValues.overlaysContainer);

                    let balloon1 = circle.cloneNode(false);// creating the 2nd small ballon object (svg circle)
                    cx += smallSmallDis;
                    setAllAttributes(balloon1, {
                        "cx": `${cx}`,
                        "cy": `${cy}`,
                        "r": `${radiusSmaller}`
                    });
                    balloon1.classList.add("overlay", "balloon");
                    balloon1.setAttribute("id", `${i}${j}2`);
                    balloon1.setAttribute("data-balloonShape", "Tondo2");
                    balloon1.setAttribute("data-amount", "2");
                    balloon1.setAttribute("data-row", `${i}`);
                    balloon1.setAttribute("data-column", `${j}`);
                    selectedBalloons["Tondo2"]["transparent"].selectedBalloonsIds.push({
                        "id": `${i}${j}2`,
                        "amount": 2
                    });
                    setBalloons(setUpValues.overlaysContainer, balloon1);
                    setUpValues.container.insertBefore(balloon1, setUpValues.overlaysContainer);

                    let balloon2 = circle.cloneNode(false);// creating the 3rd small ballon object (svg circle)
                    cx += smallSmallDis;
                    setAllAttributes(balloon2, {
                        "cx": `${cx}`,
                        "cy": `${cy}`,
                        "r": `${radiusSmaller}`
                    });
                    balloon2.classList.add("balloon");
                    balloon2.setAttribute("id", `${i}${j}3`);
                    balloon2.setAttribute("data-balloonShape", "Tondo2");
                    balloon2.setAttribute("data-amount", "1");
                    balloon2.setAttribute("data-row", `${i}`);
                    balloon2.setAttribute("data-column", `${j}`);
                    selectedBalloons["Tondo2"]["transparent"].selectedBalloonsIds.push({
                        "id": `${i}${j}3`,
                        "amount": 1
                    });
                    setBalloons(setUpValues.overlaysContainer, balloon2);
                    setUpValues.container.insertBefore(balloon2, setUpValues.overlaysContainer);
                }
            }
        }
    }
    if (structureInfo.updating) {
        createOverlayBalloons(setUpValues.overlaysContainer);
    }
}

/**
 * This will create design of balloons based on specific structure and size
 * @function
 * @name createGridz
 * @param {String} structure structure of the design
 * @param {number} row number of rows
 * @param {number} column number of columns
 */
function createGridz(structure, row = 10, column = 7) {
    let rgap = 0;
    if (structureInfo.rowGap) {
        rgap = 20;
    }
    const setUpValues = initialSetup(row = row, unitheight = 50, needsUse = true, rGap = rgap);
    selectedBalloonssCount = 0;
    const totalColumns = parseInt(column * 4);

    let cgap = 0;
    if (structureInfo.columnGap) {
        cgap = setUpValues.width / 100;
    }

    let balloonDimension = (setUpValues.width / totalColumns) - (setUpValues.strokeWidth / 2) - cgap; // determining the dimension of the balloons
    if (structure === "Gridz Alternate Horizontal") {
        balloonDimension -= 0.5;
    }

    const rect = createBalloonElement("rect"); // Mold for creating rectangular balloons
    setAllAttributes(rect, {
        "rx": `${balloonDimension / 3}`,
        "ry": `${balloonDimension / 3}`,
        "width": `${balloonDimension}`,
        "height": `${balloonDimension}`
    });

    const circle = createBalloonElement("circle"); // Mold for creating rectangular balloons
    setAllAttributes(circle, {
        "r": `${balloonDimension / 4.8}`,
    });

    for (let i = 1; i <= row; i++) {
        let yPrimary = (i - 1) * balloonDimension + (setUpValues.strokeWidth / 2) + (i - 1) * rgap;// determining the top left point(y) of the balloons
        for (let j = 1; j <= totalColumns; j++) {
            let x = (j - 1) * balloonDimension + (setUpValues.strokeWidth / 2) + (j - 1) * cgap + (cgap / 2);

            let y = yPrimary;
            if (structure === "Gridz Alternate Horizontal" && (i % 4 == 3 || i % 4 == 0)) {
                x += (balloonDimension / 2);
            } else if (structure === "Gridz Alternate Vertical" && (j % 4 == 3 || j % 4 == 0)) {
                y += (balloonDimension / 2);
            }
            let balloon = rect.cloneNode(false);// creating the ballon object (svg circle)
            setAllAttributes(balloon, {
                "x": `${x}`,
                "y": `${y}`
            });
            balloon.setAttribute("data-balloonShape", "Squareloon");
            balloon.setAttribute("data-amount", "1");
            balloon.setAttribute("data-row", `${i}`);
            balloon.setAttribute("data-column", `${j}`);
            selectedBalloons["Squareloon"]["transparent"].selectedBalloonsIds.push({
                "id": `${i}${j}1`,
                "amount": 1
            });
            balloon.classList.add("balloon");
            balloon.setAttribute("id", `${i}${j}1`);
            setBalloons(setUpValues.overlaysContainer, balloon);// setting the attributes of the balloon
            setUpValues.container.insertBefore(balloon, setUpValues.overlaysContainer);// Adding the balloon to the svg element

            let centerBalloon = circle.cloneNode(false);// creating the ballon object (svg circle)
            setAllAttributes(centerBalloon, {
                "cx": `${x + balloonDimension}`,
                "cy": `${y + balloonDimension}`
            });
            centerBalloon.setAttribute("data-balloonShape", "Tondo");
            centerBalloon.setAttribute("data-amount", "2");
            centerBalloon.setAttribute("data-row", `${i}`);
            centerBalloon.setAttribute("data-column", `${j}`);
            selectedBalloons["Tondo"]["transparent"].selectedBalloonsIds.push({
                "id": `${i}${j}2`,
                "amount": 2
            });
            centerBalloon.classList.add("overlay", "balloon");
            centerBalloon.setAttribute("id", `${i}${j}2`);
            setBalloons(setUpValues.overlaysContainer, centerBalloon); // setting the attributes of the center small balloon
            setUpValues.container.insertBefore(centerBalloon, setUpValues.overlaysContainer);// Adding the center balloon to the svg element
        }
    }
    if (structureInfo.updating) {
        createOverlayBalloons(setUpValues.overlaysContainer);
    }
}

/**
 * This will create design of balloons based on specific structure and size
 * @function
 * @name createSixInGrid
 * @param {number} row number of rows
 * @param {number} column number of columns
 */
function createSixInGrid(row = 6, column = 17) {
    let rgap = 0;
    if (structureInfo.rowGap) {
        rgap = 20;
    }
    const setUpValues = initialSetup(row = row, unitheight = 77, needsUse = false, rGap = rgap);

    let cgap = 0;
    if (structureInfo.columnGap) {
        cgap = setUpValues.width / 100;
    }

    const radiusSmall = (setUpValues.width / (column * 3)) / 2 - (setUpValues.strokeWidth / 2) + 0.45 - (cgap / 2); // radius of small balloons(circles)


    let circle = createBalloonElement("circle");// Mold for creating circular balloons
    setAllAttributes(circle, {
        "r": `${radiusSmall}`
    });

    let ellipse = createBalloonElement("ellipse");// Mold for creating elliptical balloons
    setAllAttributes(ellipse, {
        "rx": `${2 * radiusSmall}`,
        "ry": `${radiusSmall}`
    });

    for (let i = 1; i <= row; i++) {
        let cy = radiusSmall + (i - 1) * 6 * radiusSmall + (setUpValues.strokeWidth / 2) + (i - 1) * rgap; // y position of center for every balloons in this row

        // Creating first line for this row
        for (let j = 1; j <= column; j++) {
            let cx = radiusSmall + (j - 1) * 6 * radiusSmall + (setUpValues.strokeWidth / 2) + (j - 1) * 3 * cgap + (1.5 * cgap);// x position of center for first balloon of this column

            let first = circle.cloneNode(false);// creating the ballon object (svg circle)
            setAllAttributes(first, {
                "cx": `${cx}`,
                "cy": `${cy}`,
            });
            first.setAttribute("data-balloonShape", "Tondo1");
            first.setAttribute("data-amount", "2");
            first.setAttribute("data-row", `${i}`);
            first.setAttribute("data-column", `${j}`);
            selectedBalloons["Tondo1"]["transparent"].selectedBalloonsIds.push({
                "id": `${i}${j}1`,
                "amount": 2
            });
            first.classList.add("balloon");
            first.setAttribute("id", `${i}${j}1`);
            setBalloons(setUpValues.overlaysContainer, first); // setting the attributes of the small circular balloon
            setUpValues.container.insertBefore(first, setUpValues.overlaysContainer);// Adding the small circular balloon to the svg element

            let second = ellipse.cloneNode(false);// creating the ballon object (svg ellipse)
            setAllAttributes(second, {
                "cx": `${cx + 3 * radiusSmall}`,
                "cy": `${cy}`
            });
            second.setAttribute("data-balloonShape", "Quicklink");
            second.setAttribute("data-amount", "1");
            second.setAttribute("data-row", `${i}`);
            second.setAttribute("data-column", `${j}`);
            selectedBalloons["Quicklink"]["transparent"].selectedBalloonsIds.push({
                "id": `${i}${j}2`,
                "amount": 1
            });
            second.classList.add("balloon");
            second.setAttribute("id", `${i}${j}2`);
            setBalloons(setUpValues.overlaysContainer, second); // setting the attributes of the elliptical  ballooncircular balloon
            setUpValues.container.insertBefore(second, setUpValues.overlaysContainer);// Adding the elliptical balloon to the svg element
        }

        // Creating second line for this row
        for (let j = 1; j <= column; j++) {
            let cx = radiusSmall + (j - 1) * 6 * radiusSmall + (setUpValues.strokeWidth / 2) + (j - 1) * 3 * cgap + (1.5 * cgap);// x position of center for first balloon of this column

            let second = ellipse.cloneNode(false);// creating the ballon object (svg ellipse)
            setAllAttributes(second, {
                "cx": `${cx}`,
                "cy": `${cy + 3 * radiusSmall}`,
                "ry": `${2 * radiusSmall}`,
                "rx": `${radiusSmall}`,
            });
            second.setAttribute("data-balloonShape", "Quicklink");
            second.setAttribute("data-amount", "1");
            second.setAttribute("data-row", `${i}`);
            second.setAttribute("data-column", `${j}`);
            selectedBalloons["Quicklink"]["transparent"].selectedBalloonsIds.push({
                "id": `${i}${j}3`,
                "amount": 1
            });
            second.classList.add("balloon");
            second.setAttribute("id", `${i}${j}3`);
            setBalloons(setUpValues.overlaysContainer, second); // setting the attributes of the elliptical  ballooncircular balloon
            setUpValues.container.insertBefore(second, setUpValues.overlaysContainer);// Adding the elliptical balloon to the svg element

            let first = circle.cloneNode(false);// creating the ballon object (svg circle)
            setAllAttributes(first, {
                "cx": `${cx + 3 * radiusSmall}`,
                "cy": `${cy + 3 * radiusSmall}`,
                "r": `${2 * radiusSmall}`
            });
            first.setAttribute("data-balloonShape", "Tondo2");
            first.setAttribute("data-amount", "2");
            first.setAttribute("data-row", `${i}`);
            first.setAttribute("data-column", `${j}`);
            selectedBalloons["Tondo2"]["transparent"].selectedBalloonsIds.push({
                "id": `${i}${j}4`,
                "amount": 2
            });
            first.classList.add("balloon");
            first.setAttribute("id", `${i}${j}4`);
            setBalloons(setUpValues.overlaysContainer, first); // setting the attributes of the small circular 
            setUpValues.container.insertBefore(first, setUpValues.overlaysContainer);// Adding the small circular balloon to the svg element
        }
    }
    if (structureInfo.updating) {
        createOverlayBalloons(setUpValues.overlaysContainer);
    }
}

/**
 * This will create design of balloons based on specific structure and size
 * @function
 * @name createColumn
 * @param {number} row number of rows
 */
function createColumn(row) {
    let rgap = 0;
    if (structureInfo.rowGap) {
        rgap = 20;
    }
    document.querySelector(".structure-design-section").style.width = "100px";
    document.querySelector(".structure-design-section").style.margin = "1.5rem auto";
    const setUpValues = initialSetup(row, unitheight = 70, needsUse = true, rGap = rgap);
    selectedBalloonssCount = 0;

    let gTop = document.createElementNS("http://www.w3.org/2000/svg", "g");// creating the ballon object (svg circle)
    gTop.setAttributeNS(null, "id", "useTop");
    setUpValues.container.appendChild(gTop);

    const radius = setUpValues.width / 4.4 - setUpValues.strokeWidth; // radius of each balloon(SVG circle)
    const cx = setUpValues.width / 2; // center x coordinate of central balloon
    const verticalDis = 1.5 * radius + setUpValues.strokeWidth / 2; // vertical distance between centers of balloons

    const circle = createBalloonElement("circle");// Mold for creating circular balloons
    setAllAttributes(circle, {
        "r": `${radius}`
    });

    for (let i = 1; i <= row; i++) {
        let cy = radius + (setUpValues.strokeWidth / 2) + (i - 1) * 2 * verticalDis + (i - 1) * rgap;
        // First Line of balloons(3)

        let first = circle.cloneNode(false);// creating the balloon object (svg circle)
        setAllAttributes(first, {
            "cx": `${cx - 1.2 * radius}`,
            "cy": `${cy}`
        });
        first.setAttribute("data-balloonShape", "Tondo");
        first.setAttribute("data-amount", "1");
        selectedBalloons["Tondo"]["transparent"].selectedBalloonsIds.push({
            "id": `${i}1`,
            "amount": 1
        });
        first.classList.add("balloon");
        first.setAttribute("id", `${i}1`);
        first.setAttribute("data-row", `${i}`);
        setBalloons(setUpValues.overlaysContainer, first); // setting the attributes of the svg element
        setUpValues.container.insertBefore(first, setUpValues.overlaysContainer);// Appending the SVG element to html

        let second = circle.cloneNode(false);// creating the balloon object (svg circle)
        setAllAttributes(second, {
            "cx": `${cx}`,
            "cy": `${cy}`
        });
        second.classList.add("top", "balloon");
        second.setAttribute("data-balloonShape", "Tondo");
        second.setAttribute("data-amount", "2");
        second.setAttribute("data-row", `${i}`);
        selectedBalloons["Tondo"]["transparent"].selectedBalloonsIds.push({
            "id": `${i}2`,
            "amount": 2
        });
        second.setAttribute("id", `${i}2`);
        setBalloons(setUpValues.overlaysContainer, second); // setting the attributes of the svg element
        setUpValues.container.insertBefore(second, setUpValues.overlaysContainer);// Appending the SVG element to html
        let third = circle.cloneNode(false);// creating the ballon object (svg circle)
        setAllAttributes(third, {
            "cx": `${cx + 1.2 * radius}`,
            "cy": `${cy}`
        });
        third.classList.add("balloon");
        third.setAttribute("data-balloonShape", "Tondo");
        third.setAttribute("data-amount", "1");
        third.setAttribute("data-row", `${i}`);
        selectedBalloons["Tondo"]["transparent"].selectedBalloonsIds.push({
            "id": `${i}3`,
            "amount": 1
        });
        third.setAttribute("id", `${i}3`);
        setBalloons(setUpValues.overlaysContainer, third); // setting the attributes of the svg element
        setUpValues.container.insertBefore(third, setUpValues.overlaysContainer);// Appending the SVG element to html

        // second line of balloons

        let fourth = circle.cloneNode(false);// creating the ballon object (svg circle)
        setAllAttributes(fourth, {
            "cx": `${cx - radius}`,
            "cy": `${cy + verticalDis}`
        });
        fourth.classList.add("overlay", "balloon");
        fourth.setAttribute("data-balloonShape", "Tondo");
        fourth.setAttribute("data-amount", "2");
        fourth.setAttribute("data-row", `${i}`);
        selectedBalloons["Tondo"]["transparent"].selectedBalloonsIds.push({
            "id": `${i}4`,
            "amount": 2
        });
        fourth.setAttribute("id", `${i}4`);
        setBalloons(setUpValues.overlaysContainer, fourth); // setting the attributes of the svg element
        setUpValues.container.insertBefore(fourth, setUpValues.overlaysContainer);// Appending the SVG element to html

        let fifth = circle.cloneNode(false);// creating the ballon object (svg circle)
        setAllAttributes(fifth, {
            "cx": `${cx + radius}`,
            "cy": `${cy + verticalDis}`
        });
        fifth.classList.add("overlay", "balloon");
        fifth.setAttribute("data-balloonShape", "Tondo");
        fifth.setAttribute("data-amount", "2");
        fifth.setAttribute("data-row", `${i}`);
        selectedBalloons["Tondo"]["transparent"].selectedBalloonsIds.push({
            "id": `${i}5`,
            "amount": 2
        });
        fifth.setAttribute("id", `${i}5`);
        setBalloons(setUpValues.overlaysContainer, fifth); // setting the attributes of the svg element
        setUpValues.container.insertBefore(fifth, setUpValues.overlaysContainer);// Appending the SVG element to html
    }
    if (structureInfo.updating) {
        createOverlayBalloons(setUpValues.overlaysContainer);
    }
}

/**
 * This will create design of balloons based on specific structure and size
 * @function
 * @name createTwelveInGrid
 * @param {number} row number of rows
 * @param {number} column number of columns
 */
function createTwelveInGrid(row = 5, column = 15) {
    let rgap = 0;
    if (structureInfo.rowGap) {
        rgap = 30;
    }
    const setUpValues = initialSetup(row = row, unitheight = 92, needsUse = true, rGap = rgap);
    selectedBalloonssCount = 0;
    let cgap = 0;
    if (structureInfo.columnGap) {
        cgap = setUpValues.width / 100;
    }

    let balloonDimension = (3 / 23) * ((setUpValues.width / column)) + 0.2 - (cgap / 5.5); // determining the radius of the smallest balloons

    const dis = (4 * balloonDimension) - (balloonDimension / 3) - (setUpValues.strokeWidth / 2);// distance between balloons centers'

    const circle = createBalloonElement("circle");// Mold for creating circular balloons
    setAllAttributes(circle, {
        "r": `${balloonDimension}`
    });

    const ellipse = createBalloonElement("ellipse");// Mold for creating elliptical balloons
    setAllAttributes(ellipse, {
        "rx": `${3 * balloonDimension}`,
        "ry": `${2.2 * balloonDimension}`
    });

    for (let i = 1; i <= row; i++) {
        let cy = (2 * balloonDimension) + ((i - 1) * 2 * dis) + (setUpValues.strokeWidth / 2) + balloonDimension + (i - 1) * rgap;// y corordinate of the center of the balloon
        // First line of balloons
        for (let j = 1; j <= column; j++) {
            let cx = (2 * balloonDimension) + ((j - 1) * 2 * dis) + (setUpValues.strokeWidth / 2) + balloonDimension + (j - 1) * 1.5 * cgap;// x corordinate of the center of the balloon
            // First of the two balloon:
            let first = circle.cloneNode(false);// creating the ballon object (svg circle)
            setAllAttributes(first, {
                "cx": `${cx}`,
                "cy": `${cy}`
            });
            first.classList.add("overlay", "balloon");
            first.setAttribute("data-balloonShape", "Tondo1");
            first.setAttribute("data-amount", "2");
            first.setAttribute("data-row", `${i}`);
            first.setAttribute("data-column", `${j}`);
            selectedBalloons["Tondo1"]["transparent"].selectedBalloonsIds.push({
                "id": `${i}${j}1`,
                "amount": 2
            });
            first.setAttribute("id", `${i}${j}1`);
            setBalloons(setUpValues.overlaysContainer, first); // setting the attributes of the svg element
            setUpValues.container.insertBefore(first, setUpValues.overlaysContainer);// Appending the SVG element to html

            // Second of the two balloon:
            let second = ellipse.cloneNode(false);// creating the ballon object (svg ellipse)
            setAllAttributes(second, {
                "cx": `${cx + dis}`,
                "cy": `${cy}`,
            });
            second.setAttribute("data-balloonShape", "Quicklink");
            second.setAttribute("data-amount", "1");
            second.setAttribute("data-row", `${i}`);
            second.setAttribute("data-column", `${j}`);
            selectedBalloons["Quicklink"]["transparent"].selectedBalloonsIds.push({
                "id": `${i}${j}2`,
                "amount": 1
            });
            second.classList.add("balloon");
            second.setAttribute("id", `${i}${j}2`);
            setBalloons(setUpValues.overlaysContainer, second); // setting the attributes of the svg element
            setUpValues.container.insertBefore(second, setUpValues.overlaysContainer);// Appending the SVG element to html
        }

        // Second line of balloons
        cy += dis;
        for (let j = 1; j <= column; j++) {
            let cx = (2 * balloonDimension) + ((j - 1) * 2 * dis) + (setUpValues.strokeWidth / 2) + balloonDimension + (j - 1) * 1.5 * cgap;// x corordinate of the center of the balloon
            // First of the two balloon:
            let second = ellipse.cloneNode(false);// creating the balloon object (svg ellipse)
            setAllAttributes(second, {
                "cx": `${cx}`,
                "cy": `${cy}`,
                "rx": `${2.2 * balloonDimension}`,
                "ry": `${3 * balloonDimension}`,
            });
            second.setAttribute("data-balloonShape", "Quicklink");
            second.setAttribute("data-amount", "1");
            second.setAttribute("data-row", `${i}`);
            second.setAttribute("data-column", `${j}`);
            selectedBalloons["Quicklink"]["transparent"].selectedBalloonsIds.push({
                "id": `${i}${j}3`,
                "amount": 1
            });
            second.classList.add("balloon");
            second.setAttribute("id", `${i}${j}3`);
            setBalloons(setUpValues.overlaysContainer, second); // setting the attributes of the svg element
            setUpValues.container.insertBefore(second, setUpValues.overlaysContainer);// Appending the SVG element to html

            // Second of the two balloon:
            let first = circle.cloneNode(false);// creating the balloon object (svg circle)
            setAllAttributes(first, {
                "cx": `${cx + dis}`,
                "cy": `${cy}`,
                "r": `${2 * balloonDimension}`,
            });
            first.classList.add("overlay", "balloon");
            first.setAttribute("data-balloonShape", "Tondo2");
            first.setAttribute("data-amount", "2");
            first.setAttribute("data-row", `${i}`);
            first.setAttribute("data-column", `${j}`);
            selectedBalloons["Tondo2"]["transparent"].selectedBalloonsIds.push({
                "id": `${i}${j}4`,
                "amount": 2
            });
            first.setAttribute("id", `${i}${j}4`);
            setBalloons(setUpValues.overlaysContainer, first); // setting the attributes of the svg element
            setUpValues.container.insertBefore(first, setUpValues.overlaysContainer);// Appending the SVG element to html
        }
    }
    if (structureInfo.updating) {
        createOverlayBalloons(setUpValues.overlaysContainer);
    }

}

/**
 * This will create design of balloons based on specific structure and size
 * @function
 * @name createTwelveInXPattern
 * @param {number} row number of rows
 * @param {number} column number of columns
 */
function createTwelveInXPattern(row = 4, column = 13) {
    let rgap = 0;
    if (structureInfo.rowGap) {
        rgap = 30;
    }
    const setUpValues = initialSetup(row = row, height = 112.5, needsUse = true, rGap = rgap);
    selectedBalloonssCount = 0;
    let cgap = 0;
    if (structureInfo.columnGap) {
        cgap = setUpValues.width / 61;
    }

    const unitContainerDimension = setUpValues.width / (1.02 * column) - cgap; // determining the dimension of the container of each unit
    const ellipseXRadius = unitContainerDimension / 3.5;
    const ellipseYRadius = 0.75 * ellipseXRadius;

    const ellipse = createBalloonElement("ellipse");// Mold for creating elliptical balloons
    setAllAttributes(ellipse, {
        "rx": `${ellipseXRadius}`,
        "ry": `${ellipseYRadius}`
    });

    // Center circle
    const circle = createBalloonElement("circle");// Mold for creating circular balloons
    setAllAttributes(circle, {
        "r": `${unitContainerDimension / 10}`
    });

    // Creating the structure
    for (let i = 1; i <= row; i++) {
        let cy = (2 * i - 1) * (unitContainerDimension / 2) + (setUpValues.strokeWidth / 2) + (i - 1) * rgap;// y corordinate of the center of the unit structure

        // row of balloons
        for (let j = 1; j <= column; j++) {
            let cx = (2 * j - 1) * (unitContainerDimension / 2) + (setUpValues.strokeWidth / 2) + (j - 1) * cgap;// x corordinate of the center of the balloon

            // Upper left Ellipse
            let ex = cx - (unitContainerDimension / 4);
            let ey = cy - (unitContainerDimension / 4);
            const ellipse1 = ellipse.cloneNode(false);
            if (ellipse1) {
                setAllAttributes(ellipse1, {
                    "cx": `${ex}`,
                    "cy": `${ey}`,
                    "transform": `rotate(45,${ex},${ey})`
                });//transforming balloon top ellipse

                ellipse1.classList.add("plus45", "balloon"); // This balloon has been rotated 45 degree
                ellipse1.setAttribute("data-balloonShape", "Quicklink");
                ellipse1.setAttribute("data-amount", "1");
                ellipse1.setAttribute("data-row", `${i}`);
                ellipse1.setAttribute("data-column", `${j}`);
                selectedBalloons["Quicklink"]["transparent"].selectedBalloonsIds.push({
                    "id": `${i}${j}1`,
                    "amount": 1
                });
                ellipse1.setAttribute("id", `${i}${j}1`);
                setBalloons(setUpValues.overlaysContainer, ellipse1); // setting the attributes of the svg element
                setUpValues.container.insertBefore(ellipse1, setUpValues.overlaysContainer);// Appending the SVG element to html
            }

            // Upper right Ellipse
            ex = cx + (unitContainerDimension / 4);
            const ellipse2 = ellipse.cloneNode(false);
            if (ellipse2) {
                setAllAttributes(ellipse2, {
                    "cx": `${ex}`,
                    "cy": `${ey}`,
                    "transform": `rotate(-45,${ex},${ey})`
                });//transforming balloon top ellipse
                ellipse2.classList.add("minus45", "balloon"); // This balloon has been rotated -45 degree
                ellipse2.setAttribute("data-balloonShape", "Quicklink");
                ellipse2.setAttribute("data-amount", "1");
                ellipse2.setAttribute("data-row", `${i}`);
                ellipse2.setAttribute("data-column", `${j}`);
                selectedBalloons["Quicklink"]["transparent"].selectedBalloonsIds.push({
                    "id": `${i}${j}2`,
                    "amount": 1
                });
                ellipse2.setAttribute("id", `${i}${j}2`);
                setBalloons(setUpValues.overlaysContainer, ellipse2); // setting the attributes of the svg element
                setUpValues.container.insertBefore(ellipse2, setUpValues.overlaysContainer);// Appending the SVG element to html
            }

            // Lower left Ellipse
            ex = cx - (unitContainerDimension / 4);
            ey = cy + (unitContainerDimension / 4);
            const ellipse3 = ellipse.cloneNode(false);
            if (ellipse3) {
                setAllAttributes(ellipse3, {
                    "cx": `${ex}`,
                    "cy": `${ey}`,
                    "transform": `rotate(-45,${ex},${ey})`
                });//transforming balloon top ellipse
                ellipse3.classList.add("minus45", "balloon"); // This balloon has been rotated -45 degree
                ellipse3.setAttribute("data-balloonShape", "Quicklink");
                ellipse3.setAttribute("data-amount", "1");
                ellipse3.setAttribute("data-row", `${i}`);
                ellipse3.setAttribute("data-column", `${j}`);
                selectedBalloons["Quicklink"]["transparent"].selectedBalloonsIds.push({
                    "id": `${i}${j}3`,
                    "amount": 1
                });
                ellipse3.setAttribute("id", `${i}${j}3`);
                setBalloons(setUpValues.overlaysContainer, ellipse3); // setting the attributes of the svg element
                setUpValues.container.insertBefore(ellipse3, setUpValues.overlaysContainer);// Appending the SVG element to html
            }

            // Lower right Ellipse
            ex = cx + (unitContainerDimension / 4);
            const ellipse4 = ellipse.cloneNode(false);
            if (ellipse4) {
                setAllAttributes(ellipse4, {
                    "cx": `${ex}`,
                    "cy": `${ey}`,
                    "transform": `rotate(45,${ex},${ey})`
                });//transforming balloon top ellipse
                ellipse4.classList.add("plus45", "balloon"); // This balloon has been rotated 45 degree
                ellipse4.setAttribute("data-balloonShape", "Quicklink");
                ellipse4.setAttribute("data-amount", "1");
                ellipse4.setAttribute("data-row", `${i}`);
                ellipse4.setAttribute("data-column", `${j}`);
                selectedBalloons["Quicklink"]["transparent"].selectedBalloonsIds.push({
                    "id": `${i}${j}4`,
                    "amount": 1
                });
                ellipse4.setAttribute("id", `${i}${j}4`);
                setBalloons(setUpValues.overlaysContainer, ellipse4); // setting the attributes of the svg element
                setUpValues.container.insertBefore(ellipse4, setUpValues.overlaysContainer);// Appending the SVG element to html
            }

            // Center circle
            const circleCenter = circle.cloneNode(false);
            if (circleCenter) {
                setAllAttributes(circleCenter, {
                    "cx": `${cx}`,
                    "cy": `${cy}`
                });//setting center of the balloon center circle
                circleCenter.classList.add("overlay", "balloon");
                circleCenter.setAttribute("data-balloonShape", "Tondo1");
                circleCenter.setAttribute("data-amount", "2");
                circleCenter.setAttribute("data-row", `${i}`);
                circleCenter.setAttribute("data-column", `${j}`);
                selectedBalloons["Tondo1"]["transparent"].selectedBalloonsIds.push({
                    "id": `${i}${j}5`,
                    "amount": 2
                });
                circleCenter.setAttribute("id", `${i}${j}5`);
                setBalloons(setUpValues.overlaysContainer, circleCenter); // setting the attributes of the svg element
                setUpValues.container.insertBefore(circleCenter, setUpValues.overlaysContainer);// Appending the SVG element to html
            }

            // right circle:
            const circleRight = circle.cloneNode(false);
            if (circleRight) {
                setAllAttributes(circleRight, {
                    "cx": `${cx + (unitContainerDimension / 2)}`,
                    "cy": `${cy}`,
                    "r": `${unitContainerDimension / 5}`
                });//setting center of the balloon (right circle)
                circleRight.classList.add("overlay", "balloon");
                circleRight.setAttribute("data-balloonShape", "Tondo2");
                circleRight.setAttribute("data-amount", "2");
                circleRight.setAttribute("data-row", `${i}`);
                circleRight.setAttribute("data-column", `${j}`);
                selectedBalloons["Tondo2"]["transparent"].selectedBalloonsIds.push({
                    "id": `${i}${j}6`,
                    "amount": 2
                });
                circleRight.setAttribute("id", `${i}${j}6`);
                setBalloons(setUpValues.overlaysContainer, circleRight); // setting the attributes of the svg element
                setUpValues.container.insertBefore(circleRight, setUpValues.overlaysContainer);// Appending the SVG element to html
            }

            // bottom circle:
            const circleBottom = circle.cloneNode(false);
            if (circleBottom) {
                setAllAttributes(circleBottom, {
                    "cx": `${cx}`,
                    "cy": `${cy + (unitContainerDimension / 2)}`,
                    "r": `${unitContainerDimension / 5}`
                });//setting center of the balloon (bottom circle)
                circleBottom.classList.add("overlay", "balloon");
                circleBottom.setAttribute("data-balloonShape", "Tondo2");
                circleBottom.setAttribute("data-amount", "2");
                circleBottom.setAttribute("data-row", `${i}`);
                circleBottom.setAttribute("data-column", `${j}`);
                selectedBalloons["Tondo2"]["transparent"].selectedBalloonsIds.push({
                    "id": `${i}${j}7`,
                    "amount": 2
                });
                circleBottom.setAttribute("id", `${i}${j}7`);
                setBalloons(setUpValues.overlaysContainer, circleBottom); // setting the attributes of the svg element
                setUpValues.container.insertBefore(circleBottom, setUpValues.overlaysContainer);// Appending the SVG element to html
            }

            // right bottom circle
            const circleRightBottom = circle.cloneNode(false);
            if (circleRightBottom) {
                setAllAttributes(circleRightBottom, {
                    "cx": `${cx + (unitContainerDimension / 2)}`,
                    "cy": `${cy + (unitContainerDimension / 2)}`,
                    "r": `${unitContainerDimension / 10}`
                });//setting center of the balloon (right bottom circle)
                circleRightBottom.classList.add("overlay" < "balloon");
                circleRightBottom.setAttribute("data-balloonShape", "Tondo1");
                circleRightBottom.setAttribute("data-amount", "2");
                circleRightBottom.setAttribute("data-row", `${i}`);
                circleRightBottom.setAttribute("data-column", `${j}`);
                selectedBalloons["Tondo1"]["transparent"].selectedBalloonsIds.push({
                    "id": `${i}${j}8`,
                    "amount": 2
                });
                circleRightBottom.setAttribute("id", `${i}${j}8`);
                setBalloons(setUpValues.overlaysContainer, circleRightBottom); // setting the attributes of the svg element
                setUpValues.container.insertBefore(circleRightBottom, setUpValues.overlaysContainer);// Appending the SVG element to html
            }

        }
    }
    if (structureInfo.updating) {
        createOverlayBalloons(setUpValues.overlaysContainer);
    }
}

/**
 * This will create an Arch of balloons
 * @function
 * @name createArch
 */
function createArch(rows) {
    const setUpValues = initialSetup(row = 0, unitheight = 0, needsUse = true);
    selectedBalloonssCount = 0;

    // const archCenterX = setUpValues.width / 2;
    // const archCenterY = archCenterX + 50;
    const archRadius = setUpValues.width / 2;
    let radius = (archRadius * Math.PI) / 107 - (setUpValues.strokeWidth / 2); // determining the radius of the each circle
    let circleCenterX = 0;
    let circleCenterY = 0;

    //const centerBaseVal = archRadius + (setUpValues.strokeWidth / 2);
    const centerCircleRadius = archRadius - (2.35 * radius); // radius of the invisible circle on whose center of the center circles situated
    const leftCircleRadius = archRadius - (1.05 * radius); // radius of the invisible circle on whose center of the center circles situated
    const rightCircleRadius = archRadius - (3.65 * radius); // radius of the invisible circle on whose center of the right circles situated
    const circle = createBalloonElement("circle");// Mold for creating circular balloons

    let rgap = 0;
    let rgapAngle = 0;
    if (structureInfo.rowGap) {
        rgap = .2 * radius;
        radius -= rgap;
        rgapAngle = 1;
    }
    setAllAttributes(circle, {
        "cx": `${circleCenterX}`,
        "cy": `${circleCenterY}`,
        "r": `${radius}`
    });

    const incrementAngle = 180 / (rows - 1); // angular shifting of center of the adjacet middle circle along the arch

    let angle = 180;
    for (let i = 1; i <= rows; i++) {
        // Left of the three balloons
        circleCenterX = archRadius + leftCircleRadius * Math.cos((Math.PI * angle) / 180);
        circleCenterY = archRadius - leftCircleRadius * Math.sin((Math.PI * angle) / 180);
        const balloon1 = circle.cloneNode(false);
        setAllAttributes(balloon1, {
            "cx": `${circleCenterX}`,
            "cy": `${circleCenterY}`,
        });
        // setBalloonArch(setUpValues.container, balloon);
        balloon1.setAttribute("data-balloonShape", "Tondo");
        balloon1.setAttribute("data-amount", "1");
        balloon1.setAttribute("data-row", `${i}`);
        selectedBalloons["Tondo"]["transparent"].selectedBalloonsIds.push({
            "id": `${i}1`,
            "amount": 1
        });
        balloon1.classList.add("balloon");
        balloon1.setAttribute("id", `${i}1`);
        setBalloons(setUpValues.overlaysContainer, balloon1); // setting the attributes of the svg element
        setUpValues.container.insertBefore(balloon1, setUpValues.overlaysContainer);// Appending the SVG element to html

        // Right of the three balloons
        circleCenterX = archRadius + rightCircleRadius * Math.cos((Math.PI * angle) / 180);
        circleCenterY = archRadius - rightCircleRadius * Math.sin((Math.PI * angle) / 180);
        const balloon2 = circle.cloneNode(false);
        setAllAttributes(balloon2, {
            "cx": `${circleCenterX}`,
            "cy": `${circleCenterY}`,
        });
        // setBalloonArch(setUpValues.container, balloon);
        balloon2.setAttribute("data-balloonShape", "Tondo");
        balloon2.setAttribute("data-amount", "1");
        balloon2.setAttribute("data-row", `${i}`);
        selectedBalloons["Tondo"]["transparent"].selectedBalloonsIds.push({
            "id": `${i}3`,
            "amount": 1
        });
        balloon2.classList.add("balloon");
        balloon2.setAttribute("id", `${i}3`);
        setBalloons(setUpValues.overlaysContainer, balloon2); // setting the attributes of the svg element
        setUpValues.container.insertBefore(balloon2, setUpValues.overlaysContainer);// Appending the SVG element to html

        // Center of the three balloons
        circleCenterX = archRadius + centerCircleRadius * Math.cos((Math.PI * angle) / 180);
        circleCenterY = archRadius - centerCircleRadius * Math.sin((Math.PI * angle) / 180);
        const balloon = circle.cloneNode(false);
        setAllAttributes(balloon, {
            "cx": `${circleCenterX}`,
            "cy": `${circleCenterY}`,
        });
        balloon.classList.add("overlay", "balloon");
        // setBalloonArch(setUpValues.container, balloon);
        balloon.setAttribute("data-balloonShape", "Tondo");
        balloon.setAttribute("data-amount", "2");
        balloon.setAttribute("data-row", `${i}`);
        selectedBalloons["Tondo"]["transparent"].selectedBalloonsIds.push({
            "id": `${i}2`,
            "amount": 2
        });
        balloon.setAttribute("id", `${i}2`);
        setBalloons(setUpValues.overlaysContainer, balloon); // setting the attributes of the svg element
        setUpValues.container.insertBefore(balloon, setUpValues.overlaysContainer);// Appending the SVG element to html

        if (i == rows) {
            break;
        }

        // Left of the upper two balloons
        circleCenterX = archRadius + (centerCircleRadius + radius + ((angle >= 90) ? (setUpValues.strokeWidth / 2) : (-setUpValues.strokeWidth / 2))) * Math.cos((Math.PI * (angle - 3 + ((i < rows / 2) ? rgapAngle : -rgapAngle))) / 180) + 1;
        circleCenterY = archRadius - (centerCircleRadius + radius + ((angle >= 90) ? (setUpValues.strokeWidth / 2) : (-setUpValues.strokeWidth / 2))) * Math.sin((Math.PI * (angle - 3 + ((i < rows / 2) ? rgapAngle : -rgapAngle))) / 180);
        const balloonTopLeft = circle.cloneNode(false);
        setAllAttributes(balloonTopLeft, {
            "cx": `${circleCenterX}`,
            "cy": `${circleCenterY}`,
        });
        balloonTopLeft.classList.add("overlay", "balloon");
        // setBalloonArch(setUpValues.container, balloon);
        balloonTopLeft.setAttribute("data-balloonShape", "Tondo");
        balloonTopLeft.setAttribute("data-amount", "2");
        balloonTopLeft.setAttribute("data-row", `${i}`);
        selectedBalloons["Tondo"]["transparent"].selectedBalloonsIds.push({
            "id": `${i}4`,
            "amount": 2
        });
        balloonTopLeft.setAttribute("id", `${i}4`);
        setBalloons(setUpValues.overlaysContainer, balloonTopLeft); // setting the attributes of the svg element
        setUpValues.container.insertBefore(balloonTopLeft, setUpValues.overlaysContainer);// Appending the SVG element to html

        // Right of the upper balloons
        circleCenterX = archRadius + (centerCircleRadius - radius - ((angle >= 90) ? (setUpValues.strokeWidth / 2) : (-setUpValues.strokeWidth / 2))) * Math.cos((Math.PI * (angle - 3 + ((i < rows / 2) ? rgapAngle : -rgapAngle))) / 180) - 1;
        circleCenterY = archRadius - (centerCircleRadius - radius - ((angle >= 90) ? (setUpValues.strokeWidth / 2) : (-setUpValues.strokeWidth / 2))) * Math.sin((Math.PI * (angle - 3 + ((i < rows / 2) ? rgapAngle : -rgapAngle))) / 180);
        const balloonTopRight = circle.cloneNode(false);
        setAllAttributes(balloonTopRight, {
            "cx": `${circleCenterX}`,
            "cy": `${circleCenterY}`,
        });
        balloonTopRight.classList.add("overlay", "balloon");
        // setBalloonArch(setUpValues.container, balloon);
        balloonTopRight.setAttribute("data-balloonShape", "Tondo");
        balloonTopRight.setAttribute("data-amount", "2");
        balloonTopRight.setAttribute("data-row", `${i}`);
        selectedBalloons["Tondo"]["transparent"].selectedBalloonsIds.push({
            "id": `${i}5`,
            "amount": 2
        });
        balloonTopRight.setAttribute("id", `${i}5`);
        setBalloons(setUpValues.overlaysContainer, balloonTopRight); // setting the attributes of the svg element
        setUpValues.container.insertBefore(balloonTopRight, setUpValues.overlaysContainer);// Appending the SVG element to html

        angle -= incrementAngle;
    }
    if (structureInfo.updating) {
        createOverlayBalloons(setUpValues.overlaysContainer);
    }
}

/**
 * This will create design of balloons based on specific structure and size
 * @function
 * @name createDesign
 * @param {string} structure structure of the balloons' deisgn
 */
const createDeisgn = (structure, row = null, column = null) => {
    // Width of the container which will contain the svg design
    document.querySelector(".structure-design-section").style.width = "100%"; // width of the container of the svg element
    document.querySelector(".structure-design-section").style.margin = "1.5rem 0";

    // Saving the structure info
    structureInfo.structureType = structure;

    if (!structureInfo.updating) {
        setInformationTable(structure = structureInfo.structureType);
    }

    switch (structure) {
        case "Duplet Square Pack":
            if (row == null || row < 0) {
                row = 10;
                structureInfo.row = 10;
            }
            if (column == null || column < 0) {
                column = 20;
                structureInfo.column = 20;
            }
            createDupletSquare(row = row, column = column);
            break;
        case "Alternate Size Pack":
            if (row == null || row < 0) {
                row = 8;
                structureInfo.row = 8;
            }
            if (column == null || column < 0) {
                column = 10;
                structureInfo.column = 10;
            }
            createAlternateSquarePack(row = row, column = column);
            break;
        case "Gridz":
            if (row == null || row < 0) {
                row = 10;
                structureInfo.row = 10;
            }
            if (column == null || column < 0) {
                column = 7;
                structureInfo.column = 7;
            }
            createGridz(structure = "Gridz", row = row, column = column);
            break;
        case "Gridz Alternate Horizontal":
            if (row == null || row < 0) {
                row = 8;
                structureInfo.row = 8;
            }
            if (column == null || column < 0) {
                column = 7.5;
                structureInfo.column = 7.5;
            }
            createGridz(structure = "Gridz Alternate Horizontal", row = row, column = column);
            break;
        case "Gridz Alternate Vertical":
            if (row == null || row < 0) {
                row = 10;
                structureInfo.row = 10;
            }
            if (column == null || column < 0) {
                column = 8;
                structureInfo.column = 8;
            }
            createGridz(structure = "Gridz Alternate Vertical", row = row, column = column);
            break;
        case '6" Grid':
            if (row == null || row < 0) {
                row = 6;
                structureInfo.row = 6;
            }
            if (column == null || column < 0) {
                column = 17;
                structureInfo.column = 17;
            }
            createSixInGrid(row = row, column = column);
            break;
        case '12" Grid':
            if (row == null || row < 0) {
                row = 5;
                structureInfo.row = 5;
            }
            if (column == null || column < 0) {
                column = 15;
                structureInfo.column = 15;
            }
            createTwelveInGrid(row = row, column = column);
            break;
        case '12" X-Pattern':
            if (row == null || row < 0) {
                row = 4;
                structureInfo.row = 4;
            }
            if (column == null || column < 0) {
                column = 13;
                structureInfo.column = 13;
            }
            createTwelveInXPattern(row = row, column = column);
            break;
        case "Column":
            if (row == null || row < 0) {
                row = 8;
                structureInfo.row = 8;
            }
            structureInfo.column = 0;
            createColumn(row = row);
            break;
        case "Arch":
            if (row == null || row < 0) {
                row = 31;
                structureInfo.row = 31;
            }
            structureInfo.column = 0;
            createArch(row = row);
            break;
        default:
            if (row == null || row < 0) {
                row = 10;
                structureInfo.row = 10;
            }
            if (column == null || column < 0) {
                column = 20;
                structureInfo.column = 20;
            }
            createDupletSquare(row = row, column = column);
    }
}