/*
 * 'blockquote.title' actions
 **/
const careerTitles= document.getElementsByClassName("career-title");
for (const careerTitle of careerTitles) {
    careerTitle.addEventListener("click", function() {
        const details= document.getElementById(this.id+"-details");
        details.classList.toggle("collapsed");
    });
    careerTitle.addEventListener("mouseenter", function(e) {
        e.target.className = "career-title hover";
    });
    careerTitle.addEventListener("mouseleave", function(e) {
        e.target.className = "career-title";
    });
}