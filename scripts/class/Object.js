class SlideObject{
    constructor(coordinate, width, height, color){
        this.coordinate = coordinate
        this.width = width
        this.height = height
        this.color = color
    }

    changeSize(width, height){
        this.width = width
        this.height = height
    }

    changePosition(coordinate){
        this.coordinate = coordinate
    }

    changeColor(color){
        this.color = color
    }
}

class Text extends SlideObject{
    constructor(coordinate, width, height, color, text, fontSize){
        super(coordinate, width, height, color)
        this.text = text
        this.fontSize = fontSize
        this.type = "text"
    }

    changeFontsize(fontSize){
        this.fontSize = fontSize
    }

    changeText(text){
        this.text = text
    }

    getTemplate(){
        return `
            <div class='text-wrapper object' style="top: ${this.coordinate.y}px;
                                                    left: ${this.coordinate.x}px;
                                                    width: ${this.width}px; 
                                                    height: ${this.height}px; ">
                <textarea wrap="soft" spellcheck="false" class="text-object" style="color: ${this.color}; 
                                                                            font-size: ${this.fontSize}px" >${this.text} </textarea>
            </div>
        `
    }
}

class Square extends SlideObject{
    constructor(coordinate, width, height, color){
        super(coordinate, width, height, color)
        this.type = "square"
    }

    getTemplate(){
        return `<div class='object square-object' style='top: ${this.coordinate.y}px;
                                                        left: ${this.coordinate.x}px; 
                                                        width: ${this.width}px; 
                                                        height: ${this.height}px; 
                                                        background-color: ${this.color}'>
                </div>`
    }
}

class Circle extends SlideObject{
    constructor(coordinate, width, height, color){
        super(coordinate, width, height, color)
        this.type = "circle"
    }

    getTemplate(){
        return `<div class='object circle-object' style='top: ${this.coordinate.y}px;
                left: ${this.coordinate.x}px; 
                width: ${this.width}px; 
                height: ${this.height}px; 
                background-color: ${this.color}'>
            </div>`
    }
}

class Triangle extends SlideObject{
    constructor(coordinate, width, height, color){
        super(coordinate, width, height, color)
        this.type = "triangle"
    }

    getTemplate(){
        return `<div class='triangle-wrapper object' style='top: ${this.coordinate.y}px;
                                                            left: ${this.coordinate.x}px; 
                                                            width: ${this.width}px; 
                                                            height: ${this.height}px;'>
                    <svg viewBox="0 0 490 490" preserveAspectRatio="none">
                        <path
                            d="M490,474.459H0L245.009,15.541L490,474.459z"
                            fill=${this.color}
                        />
                    </svg>
                </div>`
    }
}

class Star extends SlideObject{
    constructor(coordinate, width, height, color){
        super(coordinate, width, height, color)
        this.type = "star"
    }

    getTemplate(){
        return `<div class='star-wrapper object' style='top: ${this.coordinate.y}px;
                                                        left: ${this.coordinate.x}px; 
                                                        width: ${this.width}px; 
                                                        height: ${this.height}px;'>
                    <svg viewBox="0 0 406.125 406.125" preserveAspectRatio="none">
                        <path fill=${this.color} d="M260.133,155.967c-4.487,0-9.25-3.463-10.64-7.73L205.574,13.075c-1.39-4.268-3.633-4.268-5.023,0
                        L156.64,148.237c-1.39,4.268-6.153,7.73-10.64,7.73H3.88c-4.487,0-5.186,2.138-1.553,4.78l114.971,83.521
                        c3.633,2.642,5.454,8.242,4.064,12.51L77.452,391.932c-1.39,4.268,0.431,5.592,4.064,2.951l114.971-83.521
                        c3.633-2.642,9.519-2.642,13.152,0l114.971,83.529c3.633,2.642,5.454,1.317,4.064-2.951l-43.911-135.154
                        c-1.39-4.268,0.431-9.868,4.064-12.51l114.971-83.521c3.633-2.642,2.934-4.78-1.553-4.78H260.133V155.967z"/>
                    </svg>
                </div>`
    }
}