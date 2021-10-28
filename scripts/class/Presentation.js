class Presentation{
    constructor(name, slides, activeSlide){
        this.name = name
        this.slides = slides
        this.activeSlide = activeSlide
    }

    save(){
        localStorage.setItem('presentation', JSON.stringify(this))
    }

    load(){
        var temp = []
        this.slides.forEach(e => {
            var s = new Slide(e.count, e.isActive, e.objects)
            s.load()
            temp.push(s)
        })
        this.slides = temp
    }

    changePresentationName(name){
        this.name = name
        this.save()
    }

    changeActiveSlide(index) {
        this.slides.forEach((e) => e.isActive = false)
        this.slides[index - 1].isActive = true
        presentation.activeSlide = index
        $(".object").each((i, e) => {
            disableInteractivityOnObject($(e))
        })
        $("#workspace").empty()
        this.slides[index-1].showAllObject()
    
        $(".slide-container").each((i, e) => e.classList.remove("active"))
        $(".slide-container").eq(index - 1).addClass("active")
        // this.save()
    }
    
    addSlide() {
        this.slides.push(new Slide(this.slides.length + 1, false, []))
        this.showAllSlides()
    }

    getActiveSlide(){
        return this.slides[this.activeSlide - 1]
    }

    showAllSlides() {
        $("#slides-container").empty()
    
        this.slides.forEach((e) => {
            var template = `
            <div class="slide-container unselectable" onclick="changeActiveSlideListener(${e.count})">
                <div class="slide-count">${e.count}</div>
                <div class="slide">
                    <img src="../assets/slides-logo.png" alt="" />
                </div>
            </div>
            `
    
            if (e.isActive) {
                template = `
                <div class="slide-container active unselectable" onclick="changeActiveSlideListener(${e.count})">
                    <div class="slide-count">${e.count}</div>
                    <div class="slide">
                        <img src="../assets/slides-logo.png" alt="" />
                    </div>
                </div>
                `
            }
    
            $("#slides-container").append(template)
        })
    }
}