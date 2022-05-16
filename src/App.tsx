import "./App.css";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Search from "./pages/Search";
import Stats from "./pages/Stats";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="full-page">
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<Profile />} />
            <Route path="/user/edit" element={<EditProfile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </main>
      </QueryClientProvider>
    </div>
  );
}

export default App;
