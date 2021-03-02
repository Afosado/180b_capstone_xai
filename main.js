//Globals
let ctx;
let clicked = false;
let classClicked;
let classToColor = {
    man: 'blue',
    car: 'purple',
    dog: 'gray',
    skateboard: 'red',
};

let classToAtt = {
    man: 'img/att/man.png',
    car: 'img/att/car.png',
    dog: 'img/att/dog.png',
    skateboard: 'img/att/skateboard.png',
};

let classToCounter = {
    man: 'img/counter/man.png',
    car: 'img/counter/car.png',
    dog: 'img/counter/dog.png',
    skateboard: 'img/counter/skateboard.png',
};

// shorthand func
function byId(e){return document.getElementById(e);}

// takes a string that contains coords eg - "227,307,261,309, 339,354, 328,371, 240,331"
// draws a line from each co-ord pair to the next - assumes starting point needs to be repeated as ending point.
function drawPoly(coOrdStr) {
    let mCoords = coOrdStr.split(',');
    let i, n;
    n = mCoords.length;
    ctx.beginPath();
    ctx.moveTo(mCoords[0], mCoords[1]);
    for (i=2; i<n; i+=2)
    {
        ctx.lineTo(mCoords[i], mCoords[i+1]);
    }
    ctx.lineTo(mCoords[0], mCoords[1]);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
}

function drawRect(coOrdStr) {
    let mCoords = coOrdStr.split(',');
    let top, left, bot, right;
    left = mCoords[0];
    top = mCoords[1];
    right = mCoords[2];
    bot = mCoords[3];
    ctx.strokeRect(left,top,right-left,bot-top); 
}

function myHover(element) {   
    if (!clicked) {
        let className = element.getAttribute('class')
        let color = classToColor[className];
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        let classElems = document.getElementsByClassName(className);
        for (let i = 0; i < classElems.length; i++) {
            let coordStr = classElems[i].getAttribute('coords');
            let areaType = classElems[i].getAttribute('shape');
            switch (areaType)
            {
                case 'poly':
                    drawPoly(coordStr);
                    break;

                case 'rect':
                    drawRect(coordStr);
            }
        }   
    } 
}

function myClick(element) {
    myHover(element)
    classClicked = element.getAttribute('class');
    clicked = true;
}

function myClear() {
    let canvas = byId('myCanvas');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clicked = false;
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
}

function myLeave() {
    if (!clicked) {
        let canvas = byId('myCanvas');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function myHighlight() {
    let mapChildren = byId('demoMap').childNodes; 
    for (let i = 0; i < mapChildren.length; i++) {
        if (mapChildren[i].tagName == 'AREA') {
            myHover(mapChildren[i]);
        }
    }

}

function runModel() {
    let counter = byId('counter');
    let att = byId('att');
    counter.src = classToCounter[classClicked];
    att.src = classToAtt[classClicked];
}

function myInit() {
    // get the target image
    let img = byId('demoImg');

    let x,y, w,h;

    // get it's position and width+height
    x = img.offsetLeft;
    y = img.offsetTop;
    w = img.clientWidth;
    h = img.clientHeight;

    // move the canvas, so it's contained by the same parent as the image
    let imgParent = img.parentNode;
    let can = byId('myCanvas');
    imgParent.appendChild(can);

    // place the canvas in front of the image
    can.style.zIndex = 1;

    // position it over the image
    can.style.left = x+'px';
    can.style.top = y+'px';

    // make same size as the image
    can.setAttribute('width', w+'px');
    can.setAttribute('height', h+'px');

    // get it's context
    ctx = can.getContext('2d');

    // set the 'default' values for the colour/width of fill/stroke operations
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;

}


