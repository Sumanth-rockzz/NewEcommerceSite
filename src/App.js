import AppHeader from "./components/AppHeader/AppHeader";
import PageContent from "./components/PageContent/PageContent";
import AppFooter from "./components/AppFooter/AppFooter";
import "./App.css";
function App() {
  return (
    <div className="App">
      <AppHeader />
      <PageContent />
      <AppFooter />
    </div>
  );
}

export default App;
