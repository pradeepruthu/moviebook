import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./experiment4/AuthContext";
import { MoviesProvider } from "./experiment2/MoviesContext";
import { BookingProvider } from "./experiment2/BookingContext";
import AppRoutes from "./experiment3/AppRoutes";
import ErrorBoundary from "./experiment4/ErrorBoundary";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <MoviesProvider>
            <BookingProvider>
              <AppRoutes />
            </BookingProvider>
          </MoviesProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;