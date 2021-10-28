var curr = 0

setInterval(() => {
    curr++
    if(curr == $('.slide').length){
        $('.slides').animate({'margin-left': '0'}, 1000);
        curr = 0;
    }
    else{
        $('.slides').animate({'margin-left': '-=100vw'}, 1000)
    }
}, 3000)

const options = {
	rootMargin: "-71.4px 0px 0px 0px",
}

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) {
			$(".nav-secondary-links").animate({ "margin-right": "0" }, 100)
			$("header").addClass("header-scrolled")
		} else {
			$(".nav-secondary-links").animate({ "margin-right": "-206.31" }, 100)
			$("header").removeClass("header-scrolled")
		}
	})
}, options)
observer.observe($(".intro-container")[0])

function tabOnclick(index){
  var itabs = $(".image-tab")
  var ctabs = $(".content-tab")

  $.each(itabs, (index, value) => {
    value.classList.remove("active")
  })

  $.each(ctabs, (index, value) => {
    value.classList.remove("active")
  })

  itabs[index].classList.add("active")
  ctabs[index].classList.add("active")
}
