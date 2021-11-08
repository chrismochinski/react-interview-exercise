import Header from "@components/Header";
import Home from "@components/Home";

function App() {
  console.log(`
  
  Thank you, Mike & Ash, for giving me the opportunity to 
  tackle this super fun coding challenge! I can't wait to
  (hopefully 😄) connect with you all again.
  
██ █▄█ ▄▀▄ █ █ █▄▀ . █..█ ▄▀▄ █/█
▐▌ █▀█ █▀█ █ █ █▀▄ . .▐▌. ▀▄▀ ▄▄/
  
  `);

  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  );
}

export default App;
