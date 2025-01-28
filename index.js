const LST = document.querySelector(".main__source");
const USER_NAME = "M-it-2";

const localGetUser = async () => {
  const storedRepos = JSON.parse(localStorage.getItem("repos")) || [];
  const latestRepos = await fetchLatestRepos(USER_NAME);

  if (!latestRepos) {
    if (storedRepos.length > 0) {
      displayRepos(storedRepos);
    }
    return;
  }

  const isUpdated = JSON.stringify(latestRepos) !== JSON.stringify(storedRepos);

  if (isUpdated) {
    localStorage.setItem("repos", JSON.stringify(latestRepos));
    LST.innerHTML = "";
    displayRepos(latestRepos);
  } else {
    displayRepos(storedRepos);
  }
};

document.addEventListener("DOMContentLoaded", localGetUser);

const fetchLatestRepos = async (username) => {
  try {
    const res = await fetch(https://api.github.com/users/${username}/repos);

    if (!res.ok) {
      throw new Error('Error while fetching data');
    }

    const repos = await res.json();
    repos.sort((a, b) => a.name.localeCompare(b.name));

    return repos.slice(0, 5);
  } catch (e) {
    console.error('Error: ', e);
    return null;
  }
};

const displayRepos = (repos) => {
  repos.forEach(repo => {
    LST.insertAdjacentHTML("beforeend", `
      <li class="source__item">
        <a class="source__link" href="${repo.html_url}" target="_blank" rel="noopener noreferrer nofollow">${repo.name}</a>
      </li>
    `);
  });
};
