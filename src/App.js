import { useEffect, useState } from "react";
import { Footer, Header, Profile, TabNavigation } from "./containers";
import { Error } from "./components";
import { fetchAllData } from "./apis/api";

function App() {
  const [userData, setUserData] = useState({
    user: {},
    repositories: [],
    forkedRepos: [],
    followers: [],
    following: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchUsername, setSearchUsername] = useState("adilaben");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = async () => {
    setIsLoading(true);
    setErrorMsg("");
    setActiveTabIndex(0);
    await fetchAllData(
      searchUsername.trim(),
      setUserData,
      setIsLoading,
      setErrorMsg
    );
  };

  useEffect(() => {
    handleSearch();
  }, [searchUsername]);

  return (
    <>
      <Header
        setSearchUsername={setSearchUsername}
        handleSearch={handleSearch}
      />
      <main className="main" id="main">
        <div className="container">
          <Profile data={userData?.user} isLoading={isLoading} />
          <TabNavigation
            userData={userData}
            setActiveTabIndex={setActiveTabIndex}
            setUsername={setSearchUsername}
            activeTabIndex={activeTabIndex}
            isLoading={isLoading}
          />
        </div>
      </main>
      {errorMsg && <Error text={errorMsg} />}
      <Footer />
    </>
  );
}

export default App;
