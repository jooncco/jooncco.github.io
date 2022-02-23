/*
 * 'div#competitive-programming' actions
 **/
const profileLinks = {
    boj: 'https://www.acmicpc.net/user/jooncco',
    codeforces: 'https://codeforces.com/profile/jooncco',
    leetcode: 'https://leetcode.com/jooncco/',
};

const rows= document.getElementById('competitive-programming').getElementsByClassName('row');
for (const row of rows) {
    const key= row.getAttribute('id');
    const profileLink= profileLinks[key];
    row.addEventListener('click', function() {
        window.open(profileLink, '_blank');
    });
}