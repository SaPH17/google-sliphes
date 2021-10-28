function addSlideBtnListener(){
    presentation.addSlide()
}

function presentationNameListener(){
    var value = $("#title-input").val()
    presentation.changePresentationName(value)
}

function changeActiveSlideListener(index){
    presentation.changeActiveSlide(index)
}

function savePresentation(){
    presentation.save()
}

function resetPresentation(){
    initializePresentation()
}

function toggleAutosave(){
    autosave = !autosave
    $("#autosave-on").toggle()
}

function changeActiveTool(tool) {
    var tools = ['cursor', 'text', 'square', 'circle', 'triangle', 'star']
    activeTool = tool

    if (tool == 'cursor') {
        $("#workspace").css("cursor", "default")
    }
    else if (tool == 'text') {
        $("#workspace").css("cursor", "text")
    }
    else {
        $("#workspace").css("cursor", "crosshair")
    }

    $(".toolbar-btn").each((i, e) => e.classList.remove("active"))
    $(".toolbar-btn").eq(tools.indexOf(tool) + 1).addClass("active")
}

$("body").click(function(event){
    if((activeObject == null || activeObjectJ == null) 
            || event.target == activeObject 
            || event.target.classList.contains("toolbar-btn")
            || event.target.classList.contains("toolbar-btn-svg")
            || event.target.classList.contains("color-input")
            || event.target.classList.contains("color-input")
            || event.target.classList.contains("color-input-label")
            || event.target.classList.contains("font-size-input")
            || event.target.classList.contains("toolbar-btn-path")){
        return
    }

    if(activeObjectJ.hasClass("ui-resizable")){
        activeObjectJ.resizable("destroy")
    }

    $("#text-toolbar").css("display", "none")
    $("#shape-toolbar").css("display", "none")


    $(".object").each((i, e) => {
        e.classList.remove("active")
    })


    activeObjectJ = null
    activeObject = null
})