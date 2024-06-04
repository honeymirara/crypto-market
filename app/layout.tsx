import '../styles/globals.css';
import Header from './components/Header/Header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Crypto Dashboard</title>
      </head>
      <body>
        {/* <header>
          <h1>Crypto Dashboard</h1>
        </header> */}
        <Header/>
        <main>{children}</main>
        <footer>
          <p>© 2024 Crypto Dashboard</p>
        </footer>
      </body>
    </html>
  );
};

export default Layout;

