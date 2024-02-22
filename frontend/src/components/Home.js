import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <header>
        <h1>Welcome to the Library</h1>
      </header>
      <section className="main-content">
        <p>
            Welcome to our online library! Step into a world of knowledge and imagination where every book is a gatewayto new adventures and insights. Whether you're an avid reader, a curious learner, or simply seeking moments of escape, our virtual shelves are brimming with a diverse collection of literary treasures waiting to be discovered. From timeless classics to contemporary bestsellers, our library offers something for everyone. So, grab a cup of coffee, cozy up in your favorite spot, and embark on a journey through the pages of our digital sanctuary. Happy reading!
        </p>
      </section>
      <footer>
        <p>© 2024 Library Management System</p>
      </footer>
    </div>
  );
}

export default Home;
