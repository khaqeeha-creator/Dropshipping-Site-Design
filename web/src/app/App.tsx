import { ThemeProvider } from "./components/ThemeProvider";
import { SmoothScroll } from "./components/SmoothScroll";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { Products } from "./components/Products";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import { ClickRipple } from "./components/ClickRipple";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <CartProvider>
        <SmoothScroll>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <ScrollProgress />
            <ClickRipple />
            <Header />
            <Hero />
            <Stats />
            <Products />
            <Footer />
          </div>
        </SmoothScroll>
        <Toaster position="top-center" richColors />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;