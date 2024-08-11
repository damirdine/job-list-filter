import heroImg from "./assets/images/bg-header-desktop.svg";
import heroMobileImg from "./assets/images/bg-header-mobile.svg";
import { Header } from "./components/Header";
import { JobContextProvider } from "./hooks/context/JobContext";
import { JobList } from "./components/JobList";

function App() {
  return (
    <>
      <JobContextProvider>
        <Header heroImg={heroImg} heroMobileImg={heroMobileImg} />
        <JobList />
      </JobContextProvider>
    </>
  );
}

export default App;
