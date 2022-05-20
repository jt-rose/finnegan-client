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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Register from "./pages/Register";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="full-page">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user" element={<Profile />} />
              <Route path="/user/edit" element={<EditProfile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </main>
        </QueryClientProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
