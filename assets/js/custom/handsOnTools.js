/*
 * 'tags' buttons
 **/
let coll= document.getElementsByClassName("collapsible");
for (let i= 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function(e) {
        this.classList.toggle("active");
        let content= document.getElementById(this.id+"Tags");
        if (content.style.display === "block") {
            content.style.display= "none";
        }
        else {
            content.style.display= "block";
        }
    });
    coll[i].addEventListener("mouseenter", function(e) {
        e.target.className = "collapsible hover";
    });
    coll[i].addEventListener("mouseleave", function(e) {
        e.target.className = "collapsible";
    });
}