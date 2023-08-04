const API_BASE_URL = "https://api.github.com";
const TOKEN = process.env.REACT_APP_TOKEN;

const fetchData = async (url) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json();
    if (response.status === 403) {
      throw new Error(`FORBIDDEN: ${errorData.message}`);
    } else if (response.status === 401) {
      throw new Error(`UNAUTHORIZED: ${errorData.message}`);
    } else if (response.status === 404) {
      throw new Error(`NOT FOUND: ${errorData.message}`);
    } else if (response.status === 500) {
      throw new Error(`INTERNAL SERVER ERROR: ${errorData.message}`);
    } else if (response.status === 502) {
      throw new Error(`BAD GATEWAY: ${errorData.message}`);
    } else {
      throw new Error(`Error fetching data: ${errorData.message}`);
    }
  }
};

const fetchUserData = async (username) => {
  return fetchData(`${API_BASE_URL}/users/${username}`);
};

const fetchRepositories = async (username) => {
  return fetchData(
    `${API_BASE_URL}/users/${username}/repos?sort=created&per_page=12`
  );
};

const fetchFollowers = async (username) => {
  return fetchData(`${API_BASE_URL}/users/${username}/followers`);
};

const fetchFollowing = async (username) => {
  return fetchData(`${API_BASE_URL}/users/${username}/following`);
};

// Utility function to fetch user data and update state
export const fetchAllData = async (
  userName,
  setUserData,
  setIsLoading,
  setErrorMsg
) => {
  try {
    const [user, allRepos, followers, following] = await Promise.all([
      fetchUserData(userName),
      fetchRepositories(userName),
      fetchFollowers(userName),
      fetchFollowing(userName),
    ]);

    const repos = allRepos.filter((item) => !item.fork);
    const forkedrepos = allRepos.filter((item) => item.fork);

    setUserData({
      user: user,
      repositories: repos,
      forkedRepos: forkedrepos,
      followers,
      following,
    });

    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    if (error.message.startsWith("FORBIDDEN")) {
      setErrorMsg("You are not allowed to access this data.");
    } else if (error.message.startsWith("NOT FOUND")) {
      setErrorMsg("There is no account with this username yet.");
    } else if (error.message.startsWith("UNAUTHORIZED")) {
      setErrorMsg(
        "The authentication credentials are missing, or if supplied are not valid or not sufficient to access the resource."
      );
    } else if (error.message.startsWith("INTERNAL SERVER ERROR")) {
      setErrorMsg("SERVER ERROR: Something is horribly wrong.");
    } else if (error.message.startsWith("BAD GATEWAY")) {
      setErrorMsg("The service is down or being upgraded. Try again later.");
    } else {
      setErrorMsg("An error occurred while fetching data.");
    }
  }
};
