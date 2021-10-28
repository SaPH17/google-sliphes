//#region Moving Object
//======= Moving Object ========

function dragMouseDown(e){
    draggedObject = e.target

    if(!e.ctrlKey){
        return
    }
    
    draggedObject.style.cursor = "move"
    currX = e.clientX
    currY = e.clientY

    document.onmouseup = closeDragObject
    document.onmousemove = dragObject
}

function dragObject(e) {
    if(e.target != draggedObject){
        return
    }

    diffX = e.clientX - currX
    diffY = e.clientY - currY
    currX = e.clientX
    currY = e.clientY

    e.target.style.top = (e.target.offsetTop + diffY)+ "px"
    e.target.style.left = (e.target.offsetLeft + diffX) + "px"
    // e.target.parentElement.style.top = (e.target.parentElement.offsetTop + diffY)+ "px"
    // e.target.parentElement.style.left = (e.target.parentElement.offsetLeft + diffX) + "px"
}

function closeDragObject() {
    document.onmouseup = null
    document.onmousemove = null
    draggedObject.style.cursor = "default"
    draggedObject = null
}
//#endregion


//#region Resize Object
//================================
//======= Resizing Object ========


function resizeMouseDown(e) {

    if(!e.target.classList.contains("object")){
        return
    }

    e.target.parentElement.classList.add("active")
    // var resizer = e.target.parentElement.getElementByClassName("resizer")
    var resizer = e.target.parentElement.children[1]

    resizer.addEventListener('mousedown', initializeResizeObject);
}

function initializeResizeObject(e){
    console.log(e)
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(document.defaultView.getComputedStyle(e.target).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(e.target).height, 10);

    // document.documentElement.addEventListener('mousemove', resizeObject, false);
    // document.documentElement.addEventListener('mouseup', closeResizeObject, false);
    e.target.parentElement.onmouseup = closeResizeObject
    e.target.parentElement.onmousemove = resizeObject
}

function resizeObject(e) {
    e.target.parentElement.style.width = (startWidth + e.clientX - startX) + 'px';
    e.target.parentElement.style.height = (startHeight + e.clientY - startY) + 'px';
}

function closeResizeObject(e) {
    document.documentElement.removeEventListener('mousemove', resizeObject);
    document.documentElement.removeEventListener('mouseup', closeResizeObject);
    e.target.classList.remove("active")
}

//#endregion