//DrawRectangle.js
function main() {
    //retrieve <canvas> element
    var canvas = document.getElementById('example');
    if(!canvas){
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    
    //Get the rendering context for 2DCG
    var ctx = canvas.getContext('2d');

    //draw a blue rectangle
    ctx.fillStyle = 'rgba(0, 0 , 0, 1.0)'; //Set a blue color
    ctx.fillRect(0, 0, canvas.width, canvas.height); //Fill a rectangle with the color

    const v1 = new Vector3([2.25,2.25,0]);
    //console.log(v1.elements[0]);
    drawVector(v1, "red");
    document.getElementById('button').addEventListener("click", function() {
        handleDrawEvent();
    });
    document.getElementById('obutton').addEventListener("click", function(){
        handleDrawOperationEvent();
    });
}

function drawVector(v, color){
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(canvas.width/2,canvas.height/2);
    ctx.lineTo((canvas.width/2) + v.elements[0]*20, (canvas.height/2) - v.elements[1]*20);
    ctx.strokeStyle = color;
    ctx.stroke();
    return;
}

function handleDrawEvent(){
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'rgba(0, 0 , 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var x = document.getElementById('X');
    var y = document.getElementById('Y');

    const v1 = new Vector3([x.value,y.value,0]);
    drawVector(v1, "red");

    var x2 = document.getElementById('X2');
    var y2 = document.getElementById('Y2');

    const v2 = new Vector3([x2.value,y2.value,0]);
    drawVector(v2, "blue");
}

function handleDrawOperationEvent(){
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'rgba(0, 0 , 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var x = document.getElementById('X');
    var y = document.getElementById('Y');

    const v1 = new Vector3([x.value,y.value,0]);
    drawVector(v1, "red");

    x = document.getElementById('X2');
    y = document.getElementById('Y2');

    const v2 = new Vector3([x.value,y.value,0]);
    drawVector(v2, "blue");

    var operation = document.getElementById('operators');
    var scalar = document.getElementById('scalar');
    if(operation.value === "Add"){
        v1.add(v2);
        drawVector(v1, "green");
    }else if(operation.value === "Subtract"){
        v1.sub(v2);
        drawVector(v1, "green");
    }else if(operation.value === "Multiply"){
        v1.mul(scalar.value);
        v2.mul(scalar.value);
        drawVector(v1, "green");
        drawVector(v2, "green");
    }else if(operation.value === "Divide"){
        v1.div(scalar.value);
        v2.div(scalar.value);
        drawVector(v1, "green");
        drawVector(v2, "green");
    }else if(operation.value === "Magnitude"){
        let m = v1.magnitude();
        console.log("Magnitude v1: "+m);
        m = v2.magnitude();
        console.log("Magnitude v2: "+m);
    }else if(operation.value === "Normalize"){
        v1.normalize();
        v2.normalize();
        drawVector(v1, "green");
        drawVector(v2, "green");
    }else if(operation.value === "Angle Between"){
        let angle = angleBetween(v1, v2);
        console.log("Angle: "+angle);
    }else if(operation.value === "Area"){
        let area = areaTriangle(v1, v2);
        console.log("Area of the triangle: " + area);
    }
}

function angleBetween(v1, v2){
    let d = Vector3.dot(v1, v2);
    let m1 = v1.magnitude();
    let m2 = v2.magnitude();
    d = d/(m1*m2);
    d = Math.acos(d);
    d = (d*180)/Math.PI;
    return d;
}

function areaTriangle(v1, v2){
    let v3 = Vector3.cross(v1, v2);
    let m = v3.magnitude();
    return m/2;
}