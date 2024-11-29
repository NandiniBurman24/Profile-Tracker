const input = document.getElementById('username');
const submit = document.querySelector('input[type="submit"]');
const insert = document.querySelector('.insert');
let username = "";

submit.addEventListener('click', function(){
    username = input.value;
    getAccount(username);
});

async function getAccount(username) {
    let api = "https://api.github.com/users/"
    api += username;
    try {
        const response = await fetch(api);
        const data = await response.json();
        console.log(data);
        
        // Fetch user's repositories
        const reposResponse = await fetch(`${api}/repos?per_page=3`);
        const repos = await reposResponse.json();

        insert.innerHTML = `
        <div class="card">
            <div class="userDP">
                <img src=${data.avatar_url} alt="" id="dp">
            </div>
            <div class="user-info">
                <h2>Target's Name is ${data.name || username}</h2>
                <p>${data.bio || 'No bio available'}</p>

                <ul class="info">
                    <li>${data.followers} <strong>Followers</strong></li>
                    <li>${data.following} <strong>Following</strong></li>
                    <li>${data.public_repos} <strong>Repos</strong></li>
                </ul>            
                <div class="repos">
                    ${repos.slice(0,3).map((repo, index) => `
                        <a href="${repo.html_url}" class="repo" target="_blank">Repo ${index + 1}</a>
                    `).join('')}
                </div>
            </div>
        </div>`;
    } catch (error) {
        insert.innerHTML = `<h2 style="color: red;">Error fetching user data</h2>`;
        console.error('Error:', error);
    }
}