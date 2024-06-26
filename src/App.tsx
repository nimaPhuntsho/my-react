import Products from "./components/Products";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import ReactQuery from "./components/ReactQuery";
const queryClient = new QueryClient();
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/quiz" element={<Quiz />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/query" element={<ReactQuery />}></Route>
      </Routes>
    </div>
  );
}

export default App;
