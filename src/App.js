import React from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import NOCApplication from './Components/NocApplication';
import BookFireDrill from './Components/BookFireDrill';
import Resources from './Components/Resources';
import Contact from '../src/Components/Contact';
import Chatbot from '../src/Components/Chatbot'

const App = () => {
    return (
        <div>
          <Chatbot/>
          <Navbar />
          <Home />
          <NOCApplication />
          <BookFireDrill />
          <Resources />
          <Contact />
        </div>
      );
    }
    
    export default App;
