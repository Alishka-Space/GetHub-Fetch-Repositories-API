let container = document.createElement('div');
    container.className = 'repos-container';
    document.body.appendChild(container);
   //1
let repos = document.createElement('div');
    repos.className = 'get-repos';
    container.appendChild(repos);  
    
let input = document.createElement('input');
    input.className = 'input';
    input.placeholder = 'GitHub username';
    repos.appendChild(input);

let span = document.createElement('span');
    span.className = 'get-button';
    span.textContent = 'Get Repos';
    repos.appendChild(span);  
    
    //2
let showRepos = document.createElement('div');
    showRepos.className = 'show-data';

    let dataSpan = document.createElement('span');
    dataSpan.textContent = 'No Data To Show';
    showRepos.appendChild(dataSpan);
    container.appendChild(showRepos);    


let theInput = document.querySelector('.input');
let getButton = document.querySelector('.get-button');
let reposData = document.querySelector('.show-data');



getButton.onclick = function(){
    getRepos();
};



async function getRepos(){
    if(theInput.value === ''){
        reposData.innerHTML = "<span class='error' style='color:  #cecb94'>Please Enter Your GitHub Username </span>";
        

    } else {
        try{

            const response = await fetch(`https://api.github.com/users/${theInput.value}/repos`) // Await for fetch to complete
            const repositories = await response.json(); // Await for response conversion to JSON
            
            reposData.innerHTML = ''; // Clear the previous data

            repositories.forEach(repo =>{

                
                let mainDiv = document.createElement('div');
                    mainDiv.className = 'repo-box';
                
                let repoName = document.createTextNode(repo.name);

               
                mainDiv.appendChild(repoName);

               
                reposData.appendChild(mainDiv);

               
                let theUrl = document.createElement('a');
                    theUrl.className = 'anchor';
                let theUrlText = document.createTextNode(' Visit ');
                theUrl.appendChild(theUrlText);

                
                theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
                theUrl.setAttribute('target', '_blank');
                mainDiv.appendChild(theUrl); 

               
                let starsSpan = document.createElement('span');
                    starsSpan.className = 'stars';
                let starsText = document.createTextNode(`Stars ⭐${repo.stargazers_count}`);
                starsSpan.appendChild(starsText);
                mainDiv.appendChild(starsSpan);

            })

        }catch(error){
            reposData.innerHTML = "<span style='color: red'> Error No Data To Found </span>";
        
        }
    }

          
} 