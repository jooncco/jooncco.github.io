/*
 * 'blockquote.career-title' actions
 **/
const careerTitles= document.getElementsByClassName("career-title");
for (const careerTitle of careerTitles) {
    careerTitle.addEventListener("click", function() {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}