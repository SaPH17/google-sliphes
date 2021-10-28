class Slide{
    constructor(count, isActive, objects){
        this.count = count
        this.isActive = isActive
        this.objects = objects
    }

    load(){
        var temp = []
        this.objects.forEach(e => {
            var o = null
            if(e.type === 'text'){
                o = new Text(new Coordinate(e.coordinate.x, e.coordinate.y), e.width, e.height, e.color, e.text, e.fontSize)
            }
            else if(e.type === "square"){
                o = new Square(new Coordinate(e.coordinate.x, e.coordinate.y), e.width, e.height, e.color)
            }
            else if(e.type === "circle"){
                o = new Circle(new Coordinate(e.coordinate.x, e.coordinate.y), e.width, e.height, e.color)
            }
            else if(e.type === "triangle"){
                o = new Triangle(new Coordinate(e.coordinate.x, e.coordinate.y), e.width, e.height, e.color)
            }
            else if(e.type === "star"){
                o = new Star(new Coordinate(e.coordinate.x, e.coordinate.y), e.width, e.height, e.color)
            }

            temp.push(o) 
        })
        this.objects = temp
    }

    addObject(obj){
        return this.objects.push(obj) - 1
    }

    removeObject(obj){
        this.objects.splice(this.objects.indexOf(obj), 1)
    }

    showAllObject(){
        this.objects.forEach(e => {
            var tag = $(e.getTemplate()).appendTo("#workspace")
            enableInteractivityOnObject(tag, e)
        });
    }
}