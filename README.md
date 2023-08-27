<h1 align="center">📚 Book Search App<br><p>https://main.d1k1bsy344lgng.amplifyapp.com/ </p></h1>

<p align="center">
  A dynamic book search application that allows users to effortlessly find and explore books. Crafted using Next.js and TailwindCSS, backed by a powerful server to provide seamless book data.
</p>

<p align="center">
  <img src="https://i.imgur.com/CRT3XYj.png" alt="Book Search App Screenshot" width="600px">
</p>

<h2 align="center">🌟 Features</h2>

<ul>
  <li>🔍 <b>Book Search</b>: Enter a title, author, or keyword to discover books.</li>
  <li>🔄 <b>Infinite Scrolling</b>: Experience endless scrolling with more books loaded as you navigate.</li>
  <li>📖 <b>Detailed View</b>: Dive deep into a book's details with a scroll bar in each book card.</li>
  <li>📱 <b>Responsive Design</b>: Fully optimized for mobile, tablet, and desktop.</li>
  <li>🌀 <b>Animated Search Icon</b>: A search icon with smooth animations creates a whimsical user experience.</li>
</ul>

<h2 align="center">🚀 Getting Started</h2>

<h3>Prerequisites</h3>

<ul>
  <li>Node.js (v14 or newer)</li>
  <li>npm (v6 or newer)</li>
</ul>

<h3>Installation & Setup</h3>

<p>
1. <b>Clone the Repository</b>:<br>
<code>git clone https://github.com/myrat207/book-search-app.git</code>
</p>

<p>
2. <b>Navigate to the Project Directory</b>:<br>
<code>cd book-search-app</code>
</p>

<p>
3. <b>Setup the Client (Frontend)</b>:
<ul>
  <li>Navigate to the client directory: <code>cd client</code></li>
  <li>Install required dependencies for the client: <code>npm install</code></li>
</ul>
</p>

<p>
4. <b>Setup the Server (Backend)</b>:
<ul>
<li>Navigate to the api-helpers directory in the client folder: <code>cd api-helpers</code> (Assuming you're in the client directory)</li>
  <li>Install required dependencies for the server: <code>npm install</code></li>
</ul>
</p>

<p>
5. <b>Run the Development Server for the Server</b>:<br>
While inside the <code>api-helpers</code> directory:<br>
<code>npm run dev</code><br>
Ensure the server starts correctly. By default, it might run on <a href="http://localhost:8000">http://localhost:8000</a> or a port you've specified.
</p>


<p>
6. <b>Run the Development Server for the Client</b>:<br>
While inside the <code>client</code> directory:<br>
<code>npm run dev</code><br>
Open your browser and visit <a href="http://localhost:3000">http://localhost:3000</a>
</p>


<h2 align="center">📡 API Endpoints</h2>

<p>Our backend serves the application with essential data through the endpoint:</p>

<code>http://127.0.0.1:8000/books/search/:query</code>
