/*
 * 'div#project' actions
 **/
const projectTitles= document.getElementById('project').getElementsByClassName('project-title');
for (const projectTitle of projectTitles) {
    projectTitle.addEventListener('click', function() {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    });
}