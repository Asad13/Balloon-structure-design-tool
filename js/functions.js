// This file will contain all the utility functions and variables to create designs of balloon
/*
An object containing arrays for size options for different structures
*/
const sizes = {
    "Duplet Square Pack": ['3"', '3.5"', '4"', '4.5"', '5"', '5.5"', '6"', '6.5"', '7"', '7.5"', '8"', '8.5"', '9"', '9.5"', '10"', '10.5"', '11"', '11.5"', '12"'],
    "Alternate Size Pack": ['6" / 4.5"', '7" / 5.5"', '8" / 6.5"', '9" / 7"', '9" / 7.5"', '10" / 8.5"'],
    "Gridz": ['6"', '12"'],
    "Gridz Alternate Horizontal": ['6"', '12"'],
    "Gridz Alternate Vertical": ['6"', '12"'],
    '6" Grid': [],
    '12" Grid': [],
    '12" X-Pattern': [],
    "Column": ['4"', '5"', '6"', '7"', '8"', '9"', '10"', '11"', '12"'],
    "Arch": ['4"', '5"', '6"', '7"', '8"', '9"', '10"', '11"', '12"']
}

// Contains width of each column and height of each row for standard size(initial) of balloons for all structures
const dimensions = {
    "Duplet Square Pack": {
        "baseColumnWidth": 13.1955,
        "baseRowHeight": 8.103
    },
    "Alternate Size Pack": {
        "baseColumnWidth": 26.03,
        "baseRowHeight": 10.8
    },
    "Gridz": {
        "baseColumnWidth": 15.3942858,
        "baseRowHeight": 15.672
    },
    "Gridz Alternate Horizontal": {
        "baseColumnWidth": 15.621,
        "baseRowHeight": 15.685
    },
    "Gridz Alternate Vertical": {
        "baseColumnWidth": 15.3590625,
        "baseRowHeight": 16.383
    },
    '6" Grid': {
        "baseColumnWidth": 24.17470588,
        "baseRowHeight": 24.25666667
    },
    '12" Grid': {
        "baseColumnWidth": 32.292,
        "baseRowHeight": 33.376
    },
    '12" X-Pattern': {
        "baseColumnWidth": 46.69692308,
        "baseRowHeight": 48.26
    },
    "Column": {
        "baseColumnWidth": 9.313333,
        "baseRowHeight": 15.90625
    },
    "Arch": {
        "baseColumnWidth": 5.179607205,
        "baseRowHeight": null
    }
}

// Contains information about types of balloons and amount to multiply per each balloon of different types for different structures
const balloonsInfo = {
    "Duplet Square Pack": {
        "Tondo": {
            typeName: "Tondo",
            amount: 4
        }
    },
    "Alternate Size Pack": {
        "Tondo1": {
            typeName: "Tondo",
            amount: 2
        },
        "Tondo2": {
            typeName: "Tondo",
            amount: 2
        }
    },
    "Gridz": {
        "Squareloon": {
            typeName: "Squareloon",
            amount: 4
        },
        "Tondo": {
            typeName: "Tondo",
            amount: 8
        }
    },
    "Gridz Alternate Horizontal": {
        "Squareloon": {
            typeName: "Squareloon",
            amount: 16
        },
        "Tondo": {
            typeName: "Tondo",
            amount: 32
        }
    },
    "Gridz Alternate Vertical": {
        "Squareloon": {
            typeName: "Squareloon",
            amount: 4
        },
        "Tondo": {
            typeName: "Tondo",
            amount: 8
        }
    },
    '6" Grid': {
        "Tondo1": {
            typeName: "Tondo",
            amount: 2
        },
        "Quicklink": {
            typeName: "Quicklink",
            amount: 2
        },
        "Tondo2": {
            typeName: "Tondo",
            amount: 2
        }
    },
    '12" Grid': {
        "Tondo1": {
            typeName: "Tondo",
            amount: 2
        },
        "Quicklink": {
            typeName: "Quicklink",
            amount: 2
        },
        "Tondo2": {
            typeName: "Tondo",
            amount: 2
        }
    },
    '12" X-Pattern': {
        "Quicklink": {
            typeName: "Quicklink",
            amount: 4
        },
        "Tondo1": {
            typeName: "Tondo",
            amount: 4
        },
        "Tondo2": {
            typeName: "Tondo",
            amount: 4
        }
    },
    "Column": {
        "Tondo": {
            typeName: "Tondo",
            amount: 7
        }
    },
    "Arch": {
        "Tondo": {
            typeName: "Tondo",
            amount: 6
        }
    }
}


// Contains the information about the current structure
const structureInfo = {
    "structureType": "Duplet Square Pack",
    "balloonSize": '5"',
    "row": 10,
    "column": 20,
    "verticalDis": 0,
    "horizontalDis": 0,
    "rowGap": false,
    "columnGap": false,
    "updating": false,
    "width": "439.91",
    "height": "134.38",
    "structure": null,
};

// containing infos of the selected balloons
let selectedBalloons = {};

/**
 * add information of newly added row to the selectedBalloons object
 * @function
 * @name updateAddRowInformation
 */
const updateAddRowInformation = () => {
    let changes = [];
    switch (structureInfo.structureType) {
        case "Duplet Square Pack":
            changes.push(structureInfo.column * 4);
            break;
        case "Column":
            changes.push(7);
            break;
        case "Alternate Size Pack":
            let amount1 = 0, amount2 = 0;
            if (structureInfo.row % 2 == 1) {
                for (let i = 0; i < structureInfo.column; i++) {
                    if (i % 2 == 1) {
                        amount1 += 4;
                    } else {
                        amount2 += 4;
                    }
                }
            } else {
                for (let i = 0; i < structureInfo.column; i++) {
                    if (i % 2 == 1) {
                        amount2 += 4;
                    } else {
                        amount1 += 4;
                    }
                }
            }
            changes.push(amount1, amount2);
            break;
        case '6" Grid':
        case '12" Grid':
            let amountGrid = 0;
            for (let i = 0; i < structureInfo.column; i++) {
                amountGrid += 2;
            }
            changes.push(amountGrid, amountGrid, amountGrid);
            break;
        case '12" X-Pattern':
            let amountX = 0;
            for (let i = 0; i < structureInfo.column; i++) {
                amountX += 4;
            }
            changes.push(amountX, amountX, amountX);
            break;
        case "Gridz":
        case "Gridz Alternate Vertical":
            let amountG1 = 0, amountG2 = 0;
            for (let i = 0; i < (structureInfo.column * 4); i++) {
                amountG1 += 1;
                amountG2 += 2;
            }
            changes.push(amountG1, amountG2);
            break;
        case "Gridz Alternate Horizontal":
            let amountGH1 = 0, amountGH2 = 0;
            for (let i = 0; i < (structureInfo.column * 4); i++) {
                amountGH1 += 4;
                amountGH2 += 8;
            }
            changes.push(amountGH1, amountGH2);
            break;
        default:
            changes.push(structureInfo.column * 4);
    }

    let i = 0;
    Object.entries(selectedBalloons).forEach(([key, value]) => {
        selectedBalloons[key]["transparent"].count += changes[i];
        i++;
        const infoTable = document.getElementById(key);
        infoTable.querySelector(".transparent").querySelector(".balloon-amount").innerHTML = selectedBalloons[key]["transparent"].count;
    });
}

/**
 * add information of newly added column to the selectedBalloons object
 * @function
 * @name updateAddColumnInformation
 */
const updateAddColumnInformation = () => {
    let changes = [];
    switch (structureInfo.structureType) {
        case "Duplet Square Pack":
            changes.push(structureInfo.row * 4);
            break;
        case "Arch":
            changes.push(7);
            break;
        case "Alternate Size Pack":
            let amount1 = 0, amount2 = 0;
            if (structureInfo.column % 2 == 1) {
                for (let i = 0; i < structureInfo.row; i++) {
                    if (i % 2 == 1) {
                        amount1 += 4;
                    } else {
                        amount2 += 4;
                    }
                }
            } else {
                for (let i = 0; i < structureInfo.row; i++) {
                    if (i % 2 == 1) {
                        amount2 += 4;
                    } else {
                        amount1 += 4;
                    }
                }
            }
            changes.push(amount1, amount2);
            break;
        case '6" Grid':
        case '12" Grid':
            let amountGrid = 0;
            for (let i = 0; i < structureInfo.row; i++) {
                amountGrid += 2;
            }
            changes.push(amountGrid, amountGrid, amountGrid);
            break;
        case '12" X-Pattern':
            let amountX = 0;
            for (let i = 0; i < structureInfo.row; i++) {
                amountX += 4;
            }
            changes.push(amountX, amountX, amountX);
            break;
            break;
        case "Gridz":
            let amountG1 = 0, amountG2 = 0;
            for (let i = 0; i < structureInfo.row; i++) {
                amountG1 += 1;
                amountG2 += 2;
            }
            changes.push(amountG1, amountG2);
            break;
        case "Gridz Alternate Horizontal":
        case "Gridz Alternate Vertical":
            let amountGV1 = 0, amountGV2 = 0;
            for (let i = 0; i < structureInfo.row; i++) {
                amountGV1 += 4;
                amountGV2 += 8;
            }
            changes.push(amountGV1, amountGV2);
            break;
        default:
            changes.push(structureInfo.row * 4);
    }

    let i = 0;
    Object.entries(selectedBalloons).forEach(([key, value]) => {
        selectedBalloons[key]["transparent"].count += changes[i];
        i++;
        const infoTable = document.getElementById(key);
        infoTable.querySelector(".transparent").querySelector(".balloon-amount").innerHTML = selectedBalloons[key]["transparent"].count;
    });
}

/**
 * change information for newly removed row from the selectedBalloons object
 * @function
 * @name updateRemoveRowInformation
 */
const updateRemoveRowInformation = (row) => {
    Object.entries(selectedBalloons).forEach(([key1, value1]) => {
        Object.entries(value1).forEach(([key, value]) => {
            //let removedIndex = [];
            for (let i = 0; i < value.selectedBalloonsIds.length; i++) {
                const id = value.selectedBalloonsIds[i].id;
                // let currentRow = id.substring(0, row.length);
                let currentRow = value.selectedBalloonsIds[i].row;
                if (parseInt(currentRow) == parseInt(row)) {
                    value.count -= value.selectedBalloonsIds[i].amount;
                    //value.selectedBalloonsIds.splice(i, 1);
                    //removedIndex.push(i);

                    const infoTable = document.getElementById(key1);
                    const rowClass = (key == "transparent") ? "transparent" : `color-${key.substring(1, key.length)}`;
                    if (value.count > 0) {
                        infoTable.querySelector(`.${rowClass}`).querySelector(".balloon-amount").innerHTML = value.count;
                    } else {
                        infoTable.removeChild(infoTable.querySelector(`.${rowClass}`));
                    }
                }
                // else if (parseInt(currentRow) > parseInt(row)) {
                //     const newRow = `${parseInt(currentRow) - 1}`;
                //     value.selectedBalloonsIds[i].id = `${newRow}` + `${value.selectedBalloonsIds[i].column}` + id.charAt(id.length - 1);
                //     value.selectedBalloonsIds[i].row = `${newRow}`;
                // }
            }
            if (key == "transparent") {
                value.selectedBalloonsIds = [];
            }
        });
    });
}

/**
 * change information for newly removed column from the selectedBalloons object
 * @function
 * @name updateRemoveColumnInformation
 */
const updateRemoveColumnInformation = (column) => {
    Object.entries(selectedBalloons).forEach(([key1, value1]) => {
        Object.entries(value1).forEach(([key, value]) => {
            //let removedIndex = [];
            for (let i = 0; i < value.selectedBalloonsIds.length; i++) {
                const id = value.selectedBalloonsIds[i].id;

                let currentColumn = value.selectedBalloonsIds[i].column;
                if (parseInt(currentColumn) == parseInt(column)) {
                    value.count -= value.selectedBalloonsIds[i].amount;
                    //value.selectedBalloonsIds.splice(i, 1);
                    //removedIndex.push(i);

                    const infoTable = document.getElementById(key1);
                    const rowClass = (key == "transparent") ? "transparent" : `color-${key.substring(1, key.length)}`;
                    if (value.count > 0) {
                        infoTable.querySelector(`.${rowClass}`).querySelector(".balloon-amount").innerHTML = value.count;
                    } else {
                        infoTable.removeChild(infoTable.querySelector(`.${rowClass}`));
                    }
                }
                // else if (parseInt(currentColumn) > parseInt(column)) {
                //     const newColumn = `${parseInt(currentColumn) - 1}`;
                //     value.selectedBalloonsIds[i].id = `${value.selectedBalloonsIds[i].row}` + `${newColumn}` + id.charAt(id.length - 1);
                //     value.selectedBalloonsIds[i].column = `${newColumn}`;
                // }
            }
            if (key == "transparent") {
                value.selectedBalloonsIds = [];
            }
        });
    });
}

// Create rows of table in information section
const createTableRow = (color, amount) => {
    const infoTableRow = document.createElement("tr");
    const colorClass = (color == "transparent") ? "transparent" : `color-${color.substring(1, color.length)}`;
    infoTableRow.classList.add("balloon-info", colorClass);

    const infoTableData1 = document.createElement("td");
    infoTableData1.classList.add("balloon-type");
    infoTableData1.innerHTML = (color == "transparent") ? "Senza colore" : color.toUpperCase();
    infoTableRow.appendChild(infoTableData1);

    const infoTableData2 = document.createElement("td");
    infoTableData2.classList.add("balloon-color");
    const infoTableData2Span = document.createElement("span");
    infoTableData2Span.style.background = color;
    infoTableData2.appendChild(infoTableData2Span);
    infoTableRow.appendChild(infoTableData2);

    const infoTableData3 = document.createElement("td");
    infoTableData3.classList.add("balloon-amount");
    infoTableData3.innerHTML = amount;
    infoTableRow.appendChild(infoTableData3);

    return infoTableRow;
}

// const setSelectedBalloon = structure => {
//     const balloonGroups = balloonsInfo[structure];
//     for (let i)
// }

// Creates balloon information table and inserts it in the information section
const setInformationTable = structure => {
    const infoTableContainer = document.querySelector(".information-box"); // Information table elements container
    while (infoTableContainer.firstElementChild) {
        infoTableContainer.removeChild(infoTableContainer.firstElementChild);
    }
    //setSelectedBalloon(structure);

    const balloonGroups = balloonsInfo[structure];
    const sizeValue = document.getElementById("size").value;
    let sizes = [];
    switch (structure) {
        case "Duplet Square Pack":
        case "Column":
        case "Arch":
            sizes.push(sizeValue);
            break;
        case "Alternate Size Pack":
            sizes = [...sizeValue.split("/")]
            break;
        case '6" Grid':
            sizes = ['3.5"', '6"', '6"'];
            break;
        case '12" Grid':
            sizes = ['4"', '10"', '7"'];
            break;
        case '12" X-Pattern':
            sizes = ['10"', '4"', '7"'];
            break;
        case "Gridz":
        case "Gridz Alternate Vertical":
            if (sizeValue == '6"') {
                sizes = ['4"', '2.5"'];
            } else {
                sizes = ['8"', '5"'];
            }
            break;
        case "Gridz Alternate Horizontal":
            if (sizeValue == '6"') {
                sizes = ['4"', '2.5"'];
            } else {
                sizes = ['8"', '5.1"'];
            }
            break;
        default:
            sizes.push(sizeValue);
    }

    let i = 0;
    Object.entries(balloonGroups).forEach(([key, value]) => {
        const headerElement = document.createElement("h4");
        headerElement.innerHTML = value.typeName + " da " + sizes[i];
        i++;

        let amount = 0;
        if (structure == "Column") {
            amount = value.amount * structureInfo.row;
        } else if (structure == "Arch") {
            amount = value.amount * (structureInfo.row - 1) + 4;
        } else {
            amount = value.amount * structureInfo.row * structureInfo.column;
        }
        selectedBalloons[key] = {
            "transparent": {
                count: amount,
                selectedBalloonsIds: []
            }
        };

        const infoTable = document.createElement("table");
        infoTable.classList.add("balloon-info-table");
        infoTable.setAttribute("id", key);
        const infoTableRow = createTableRow("transparent", amount);
        infoTable.appendChild(infoTableRow);
        infoTableContainer.appendChild(headerElement);
        infoTableContainer.appendChild(infoTable);
    });
}

/**
 * adds the information of the selected balloon to the selectedBalloons object
 * @function
 * @name updateSelectedBalloon
 * @param {string} id id of the selected balloon
 * @param {string} type type of the selected balloon
 * @param {number} amount amount to multiply for each of the selected balloon
 * @param {number} row row of the selected balloon
 * @param {number} column column of the selected balloon
 */
const updateSelectedBalloon = (id, type, amount, row, column, color) => {
    if (id.indexOf("overlay") > -1) {
        id = id.substring(0, id.indexOf("overlay"));
    }
    if (selectedBalloons[type]) {
        //const color = document.getElementById('colorPicker').value; // new
        const infoTable = document.getElementById(type);
        if (selectedBalloons[type][color]) {
            selectedBalloons[type][color].count += parseInt(amount);
            selectedBalloons[type][color].selectedBalloonsIds.push({
                "id": id,
                "amount": parseInt(amount),
                "row": row,
                "column": column,
            });
            infoTable.querySelector(`.color-${color.substring(1, color.length)}`).querySelector(".balloon-amount").innerHTML = selectedBalloons[type][color].count;
        } else {
            selectedBalloons[type][color] = {
                "count": parseInt(amount),
                "selectedBalloonsIds": []
            };
            selectedBalloons[type][color]["selectedBalloonsIds"].push({
                "id": id,
                "amount": parseInt(amount),
                "row": row,
                "column": column,
            });
            const infoTableRow = createTableRow(color, selectedBalloons[type][color].count);
            infoTable.appendChild(infoTableRow);
        }
        selectedBalloons[type]["transparent"].count -= parseInt(amount);
        for (let i = 0; i < selectedBalloons[type]["transparent"].selectedBalloonsIds.count; i++) {
            if (selectedBalloons[type]["transparent"].selectedBalloonsIds[i].id == id) {
                selectedBalloons[type]["transparent"].selectedBalloonsIds.splice(i, 1);
                break;
            }
        }
        infoTable.querySelector(".transparent").querySelector(".balloon-amount").innerHTML = selectedBalloons[type]["transparent"].count;
    }
}


/**
 * removes the information of the unselected balloon to the selectedBalloons object
 * @function
 * @name removeFromSelectedBalloon
 * @param {string} key key of the selectedBalloons from which the balloon will be removed
 * @param {string} id id of the selected balloon to be unselected
 * @param {string} type type of the selected balloon
 * @param {number} amount amount to multiply for each of the selected balloon
 * @param {number} row row of the selected balloon
 * @param {number} column column of the selected balloon
 */
const removeFromSelectedBalloon = (key, id, type, amount, row, column) => {
    if (id.indexOf("overlay") > -1) {
        id = id.substring(0, id.indexOf("overlay"));
    }
    if (selectedBalloons[type][key]) {
        for (let i = 0; i < selectedBalloons[type][key].selectedBalloonsIds.length; i++) {
            if (selectedBalloons[type][key].selectedBalloonsIds[i].id == id) {
                selectedBalloons[type][key].count -= parseInt(amount);
                selectedBalloons[type][key]["selectedBalloonsIds"].splice(i, 1);
                const infoTable = document.getElementById(type);
                if (selectedBalloons[type][key].count <= 0) {
                    delete selectedBalloons[type][key];
                    infoTable.removeChild(infoTable.querySelector(`.color-${key.substring(1, key.length)}`));
                } else {
                    infoTable.querySelector(`.color-${key.substring(1, key.length)}`).querySelector(".balloon-amount").innerHTML = selectedBalloons[type][key].count;
                }

                selectedBalloons[type]["transparent"].count += parseInt(amount);
                selectedBalloons[type]["transparent"]["selectedBalloonsIds"].push({
                    "id": id,
                    "amount": amount,
                    "row": row,
                    "column": column,
                });
                infoTable.querySelector(".transparent").querySelector(".balloon-amount").innerHTML = selectedBalloons[type]["transparent"].count;
                break;
            }
        }
    }
}

/**
 * sets the initial common values for all the structure
 * @function
 * @name initialSetup
 * @param {number} row - The number of rows in the structure
 * @param {boolean} needsUse - If the structure needs the "use" svg element
 * @param {number} unitheight - height of each row of the container svg tag
 * @param {number} rgap - row gap value in pixel
 * @returns {Object} Object containing all the initial values for the structure
 */
function initialSetup(row = 1, unitheight = 70, needsUse = false, rGap = 0) {
    const setUpvalues = {};
    const container = document.querySelector(".balloon-structure"); // The svg html element where we will append the balloon svg structure

    container.setAttribute("data-structuretype", structureInfo.structureType);
    container.setAttribute("data-size", document.getElementById("size").value);
    container.setAttribute("data-rows", structureInfo.row);
    container.setAttribute("data-columns", structureInfo.column);

    const width = container.clientWidth; // width of the conatiner svg element
    setUpvalues.width = width;

    if (unitheight != 0) {
        let height = (unitheight + rGap) * row;
        container.style.height = (height + 100) + "px";
        container.style.minHeight = (height + 100) + "px";
        document.querySelector(".structure-design-section").style.minHeight = (height + 100) + "px";
    } else {
        container.style.height = `${(width / 2) + 100}px`;
        container.style.minHeight = `${(width / 2) + 100}px`;
        document.querySelector(".structure-design-section").style.minHeight = `${(width / 2) + 50}px`;
    }

    while (container.firstElementChild) {
        container.removeChild(container.firstElementChild);
    }

    let g1 = document.createElementNS("http://www.w3.org/2000/svg", "g");// creating the ballon object (svg circle)
    g1.setAttributeNS(null, "id", "allOverlays");
    container.appendChild(g1);
    const overlaysContainer = document.getElementById("allOverlays");
    setUpvalues.overlaysContainer = overlaysContainer;

    if (needsUse) {
        let g = document.createElementNS("http://www.w3.org/2000/svg", "g");// creating the ballon object (svg circle)
        g.setAttributeNS(null, "id", "use");
        container.appendChild(g);
        const useContainer = document.getElementById("use");
        setUpvalues.useContainer = useContainer;
    }

    setUpvalues.strokeWidth = "1";// stroke width of each balllon

    setUpvalues.container = container;

    return setUpvalues;
}

/**
 * Sets all the attributes for a SVG element
 * @function
 * @name setAllAttributes
 * @param {Element} element - The svg element whose attributes will be set here
 * @param {Object} attributes - An object containing all the attributes to be set in the svg
 */

function setAllAttributes(element, attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttributeNS(null, key, value);
    });
}

// Common attributes for all the SVG element
const attributes = {
    "fill": "rgba(255,255,255,0.2)",
    "stroke": "#ccc",
    "stroke-width": "1"
};

/**
 * create and return a SVG Ellipse element
 * @function
 * @name createBalloonElement
 * @param {string} balloonType - Type of the balloon element
 * @param {Object} attributes - Contains all the paramenters(attributes) to create the balloon element
 * @returns {Element} A SVG ellipse element
 */
function createBalloonElement(balloonType) {
    let element = document.createElementNS("http://www.w3.org/2000/svg", balloonType);// creating a circular balloon(SVG circle element)
    setAllAttributes(element, attributes); // setting the attributes of svg circle(Balloon)
    element.style.cursor = "pointer";
    return element;
}

/**
 * create and return overlay balloon
 * @function
 * @name createOverlayBalloon
 * @param {Element} element - The selected balloon(SVG element)
 * @returns {Element} A SVG circle element
 */
function createOverlayBalloon(color, element) {
    if (element) {
        if (!color) {
            color = document.getElementById('colorPicker').value;
        }
        const overlayBalloon = element.cloneNode(false);
        overlayBalloon.setAttributeNS(null, "fill", color);
        overlayBalloon.setAttributeNS(null, "stroke", "#333310");
        overlayBalloon.style.cursor = "pointer";
        return overlayBalloon;
    }
    return null;
}

/**
 * create and return a SVG ellipse balloonTop for selected balloons
 * @function
 * @name createBalloonTop
 * @param {Element} element - The element on which this balloonTop will be added
 * @returns {Element} A SVG ellipse element(balloonTop)
 */
function createBalloonTop(element) {
    if (element) {
        let balloonTop = document.createElementNS("http://www.w3.org/2000/svg", "ellipse"); // balloon top when selected
        // Object containing all the attributes for the balloonTop
        let attributes = {
            "cx": `${element.getAttribute("cx")}`,
            "cy": `${element.getAttribute("cy")}`,
            "fill": "#ffffff",
            "stroke": "#333310",
            "stroke-width": `${element.getAttribute("stroke-width")}`,
        }; // attribute for the svg circle top when selected(balloon top)

        // If the element is a circle
        if (element.nodeName === "circle") {
            attributes["rx"] = `${element.getAttribute("r") / 3.5}`;
            attributes["ry"] = `${element.getAttribute("r") / 2.2}`;
            attributes["transform"] = `translate(-${element.getAttribute("r") / 2.92},-${element.getAttribute("r") / 2.92}) rotate(45,${attributes["cx"]},${attributes["cy"]})`;// transforming balloon top ellipse to left corner of the ballloon
        } else if (element.nodeName === "ellipse") {
            if (element.getAttribute("rx") < element.getAttribute("ry")) {
                attributes["rx"] = `${element.getAttribute("rx") / 3.1}`;
                attributes["ry"] = `${element.getAttribute("ry") / 2.6}`;
            } else {
                attributes["rx"] = element.getAttribute("ry") / 3.1;
                attributes["ry"] = element.getAttribute("rx") / 2.6;
            }

            if (document.getElementById("structure").value == '12" X-Pattern') {
                if (element.classList.contains("plus45")) {
                    attributes["transform"] = `translate(-${element.getAttribute("rx") / 2},-${element.getAttribute("ry") / 1.7}) rotate(40,${attributes["cx"]},${attributes["cy"]})`;
                } else {
                    attributes["rx"] = `${element.getAttribute("ry") / 1.3}`;
                    attributes["ry"] = `${element.getAttribute("rx") / 4}`;
                    attributes["transform"] = `translate(-${element.getAttribute("rx") / 4},-${element.getAttribute("ry") / 3}) rotate(-45,${attributes["cx"]},${attributes["cy"]})`;
                }
            } else {
                if (element.getAttribute("rx") < element.getAttribute("ry")) {
                    attributes["transform"] = `translate(-${element.getAttribute("rx") / 5},-${element.getAttribute("ry") / 1.7}) rotate(45,${attributes["cx"]},${attributes["cy"]})`;// transforming balloonTop ellipse
                } else {
                    attributes["transform"] = `translate(-${element.getAttribute("rx") / 1.7},-${element.getAttribute("ry") / 4}) rotate(45,${attributes["cx"]},${attributes["cy"]})`;// transforming balloonTop ellipse
                }
            }
        } else if (element.nodeName === "rect") {
            const width = element.getAttribute("width");
            const height = element.getAttribute("height");
            attributes["cx"] = `${parseFloat(element.getAttribute("x")) + (width / 2)}`;
            attributes["cy"] = `${parseFloat(element.getAttribute("y")) + (height / 2)}`;
            attributes["rx"] = `${width / 10}`;
            attributes["ry"] = `${height / 6}`;
            attributes["transform"] = `translate(-${element.getAttribute("width") / 3.5},-${element.getAttribute("height") / 3.5}) rotate(45,${attributes["cx"]},${attributes["cy"]})`;
        }

        balloonTop.style.pointerEvents = "none"; // Cancelling all pointer events
        setAllAttributes(balloonTop, attributes); // setting the attributes of svg circle(Balloon)
        return balloonTop;
    }
    return null;
}


/**
 * create overlay balloons when updating the structure
 * @function
 * @name createOverlayBalloons
 * @param {SVGElement} container SVG container element
 */
const createOverlayBalloons = (container) => {
    Object.entries(selectedBalloons).forEach(([key1, value1]) => {
        Object.entries(value1).forEach(([key, value]) => {
            if (key != "transparent") {
                const ids = value.selectedBalloonsIds;
                for (let i = 0; i < ids.length; i++) {
                    let tids = selectedBalloons[key1]["transparent"].selectedBalloonsIds;
                    for (let j = 0; j < tids.length; j++) {
                        if (tids[j].id == ids[i].id) {
                            selectedBalloons[key1]["transparent"].selectedBalloonsIds.splice(j, 1);
                        }
                    }
                    const balloon = document.getElementById(ids[i].id);
                    let overlayballoon = createOverlayBalloon(key, balloon);// creating the ballon object (svg circle)
                    overlayballoon.setAttributeNS(null, "id", `${ids[i].id}overlay`);
                    let balloonTop = createBalloonTop(balloon); // balloon top when selected
                    balloonTop.setAttributeNS(null, "id", `${ids[i].id}balloonTop`)

                    let useContainerTop = document.getElementById("useTop");
                    let useContainer = document.getElementById("use");
                    let use, use1;
                    if (useContainer) {
                        use = createUse(`${ids[i].id}overlay`);
                        use1 = createUse(`${ids[i].id}balloonTop`);

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
                        if (balloon.classList.contains("overlay")) {
                            useContainer.removeChild(use);
                            useContainer.removeChild(use1);
                        } else if (balloon.classList.contains("top")) {
                            useTopContainer.removeChild(use);
                            useTopContainer.removeChild(use1);
                        }
                        // remove this balloon from selected list:
                        removeFromSelectedBalloon(this.getAttributeNS(null, "fill"), balloon.getAttribute("id"), balloon.getAttribute("data-balloonshape"), balloon.getAttribute("data-amount"));
                        this.parentElement.removeChild(this.nextElementSibling);
                        this.parentElement.removeChild(this);
                    });

                    container.appendChild(overlayballoon); // appending an overlay balloon on selected balloon
                    container.appendChild(balloonTop); // appending the balloon top(ellipse) to the svg in the html
                }
            }
        });
    });
}

/**
 * create and return a SVG ellipse balloonTop for selected balloons
 * @function
 * @name createUse
 * @param {SVGElement} element - The SVG element whose reference SVG "use" element willbe created
 * @param {number} id id for the element to reference by the SVG "use" element
 * @returns {SVGElement} A SVG element containing the reference of the element
 */
function createUse(id) {
    //element.setAttribute(null, "id", `${id}`);
    let use = document.createElementNS("http://www.w3.org/2000/svg", "use");// creating the 2nd big ballon object (svg circle)
    use.setAttributeNS(null, "href", `#${id}`);
    use.setAttributeNS(null, "id", `${id}-use`)

    return use;
}
