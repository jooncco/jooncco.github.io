/*
 * 'blockquote.title' actions
 **/
const footstepTitles= document.getElementsByClassName("footstep-title");
for (const footstepTitle of footstepTitles) {
    footstepTitle.addEventListener("click", function() {
        const details= document.getElementById(this.id+"-details");
        details.classList.toggle("collapsed");
    });
    footstepTitle.addEventListener("mouseenter", function(e) {
        e.target.className = "footstep-title hover";
    });
    footstepTitle.addEventListener("mouseleave", function(e) {
        e.target.className = "footstep-title";
    });
}