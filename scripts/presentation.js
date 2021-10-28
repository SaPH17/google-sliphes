var activeTool = 'cursor'
var presentation = new Presentation('Untitled presentation', [], 1)
var activeObject = null
var activeObjectJ = null
var activeObj = null
var autosave = true

//===============================
//======= Adding Object =========

function enableInteractivityOnObject(tag, obj){
    if(tag.is(".text-wrapper")){
        tag.keyup(function(e){
            obj.changeText($(this).children().val())
        })
    }

    tag.draggable({
        cancel: "",
        stop: function(event, ui){
            if($(this).is(".text-wrapper")){
                $(this).children().trigger('focus')
            }
            obj.changePosition(new Coordinate(ui.position.left, ui.position.top))
        }
    })
    
    tag.mousedown(function(e){
        $(".object").each((i, e) => {
            e.classList.remove("active")
        })
        if(activeObjectJ != null){
            activeObjectJ.resizable("destroy")
        }

        if(tag.is(".text-wrapper")){
            $("#text-toolbar").css("display", "flex")
            $("#shape-toolbar").css("display", "none")
            $("#font-size-input").val(obj.fontSize)
        }
        else{
            $("#text-toolbar").css("display", "none")
            $("#shape-toolbar").css("display", "flex")
        }

        if(!$(this).hasClass("text-wrapper")){
            $("textarea").each((i, e)=>{
                e.blur()
            })
        }
        else{
            $(this).children().focus()
        }

        $(this).resizable({
            stop: function(event, ui){
                obj.changeSize(ui.size.width, ui.size.height)
            }
        })
        $(this).addClass("active")

        activeObject = e.target
        activeObj = obj
        activeObjectJ = $(this)
    })
}

function disableInteractivityOnObject(tag){
    if(tag.hasClass("ui-draggable")){
        tag.draggable("destroy")
    }
    if(tag.hasClass("ui-resizable")){
        tag.resizable("destroy")
    }
    tag.off('mousedown')
}

function addTextToSlide(e){
    var obj = new Text(new Coordinate(e.offsetX, e.offsetY), 200, 50, 'black', '', 16)
    presentation.getActiveSlide().addObject(obj)
    var template = obj.getTemplate()

    var tag = $(template).appendTo("#workspace")
    tag.children().trigger('focus')

    enableInteractivityOnObject(tag, obj)
    changeActiveTool('cursor', 1)
}

function addSquareToSlide(e){
    var obj = new Square(new Coordinate(e.offsetX, e.offsetY), 100, 100, 'lightgray')
    presentation.getActiveSlide().addObject(obj)
    var template = obj.getTemplate()

    var tag = $(template).appendTo("#workspace")

    enableInteractivityOnObject(tag, obj)
    changeActiveTool('cursor', 1)
}

function addCircleToSlide(e){
    var obj = new Circle(new Coordinate(e.offsetX, e.offsetY), 100, 100, 'lightgray')
    presentation.getActiveSlide().addObject(obj)
    var template = obj.getTemplate()

    var tag = $(template).appendTo("#workspace")

    enableInteractivityOnObject(tag, obj)
    changeActiveTool('cursor', 1)
}

function addTriangleToSlide(e){
    var obj = new Triangle(new Coordinate(e.offsetX, e.offsetY), 100, 100, 'lightgray')
    presentation.getActiveSlide().addObject(obj)
    var template = obj.getTemplate()

    var tag = $(template).appendTo("#workspace")

    enableInteractivityOnObject(tag, obj)
    changeActiveTool('cursor', 1)
}

function addStarToSlide(e){
    var obj = new Star(new Coordinate(e.offsetX, e.offsetY), 100, 100, 'lightgray')
    presentation.getActiveSlide().addObject(obj)
    var template = obj.getTemplate()

    var tag = $(template).appendTo("#workspace")

    enableInteractivityOnObject(tag, obj)
    changeActiveTool('cursor', 1)
}

function addObjectToWorkspace(e){
    if(e.target != $("#workspace")[0]){
        return;
    }

    if(activeTool == "text"){
        addTextToSlide(e)
    }
    else if(activeTool == "square"){
        addSquareToSlide(e)
    }
    else if(activeTool == 'circle'){
        addCircleToSlide(e)
    }
    else if(activeTool == 'triangle'){
        addTriangleToSlide(e)
    }
    else if(activeTool == 'star'){
        addStarToSlide(e)
    }
}

$("#workspace").on('click', function(e){
    addObjectToWorkspace(e)
})

$(document).on('keydown', function(e){
    if(e.keyCode === 46 && $(".object.active").length > 0){
        disableInteractivityOnObject($(".object.active"))
        $(".object.active").remove()
        $("#text-toolbar").css("display", "none")
        $("#shape-toolbar").css("display", "none")
        presentation.getActiveSlide().removeObject(activeObjectJ)
        activeObjectJ = null
    }
    else if(e.ctrlKey && e.keyCode == 83){
        e.preventDefault()
        presentation.save()
    }
})

function initializePresentation(){
    presentation = new Presentation('Untitled presentation', [], 1)
    presentation.addSlide()
    presentation.changeActiveSlide(1)
    presentation.showAllSlides()
}

function loadPresentation(){
    var data = JSON.parse(localStorage.getItem('presentation'))
    presentation = new Presentation(data.name, data.slides, data.activeSlide)
    presentation.load()

    $("#title-input").val(presentation.name)
    presentation.showAllSlides()
    presentation.changeActiveSlide(presentation.activeSlide)
}

setInterval(() => {
    if(autosave){
        presentation.save()
    }
}, 15000)

$("#shape-color-input").on('input', (e) => {
    if(activeObjectJ.hasClass("triangle-wrapper") || activeObjectJ.hasClass("star-wrapper")){
        activeObjectJ.children().children().css("fill", document.getElementById("shape-color-input").value)
    }
    else{
        activeObjectJ.css("background-color", document.getElementById("shape-color-input").value)
    }

    activeObj.changeColor(document.getElementById("shape-color-input").value)
})

$("#text-color-input").on('input', (e) => {
    activeObjectJ.children().css("color", document.getElementById("text-color-input").value)
    activeObj.changeColor(document.getElementById("text-color-input").value)
})

$("#font-size-input").on('input', (e) => {
    activeObjectJ.children().css("font-size", `${document.getElementById("font-size-input").value}px`)
    activeObj.changeFontsize(document.getElementById("font-size-input").value)
})

if(localStorage.getItem('presentation') == null){
    initializePresentation()
}
else{
    loadPresentation()
}

// initializePresentation()