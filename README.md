<h1>Mod 2 Final Project</h1>
<p>&nbsp For our final Mod 2 project - we build a full stack app using JS, CSS, HTML, and Ruby on Rails.<br>
<br>
<h4>What is Trails?</h4>
<p>Trails is an app to view Hiking Trails in the Colorado Area! We have it set up to list up to 100 of the trails closest to Denver. You can filter these by the name of the hike using the search bar or by difficulty using the nav buttons. Hiking trail difficulty is rated using the same terminology as Ski Slopes (beginner: green, medium: blue, expert:black). You can create a new user following the 'log-in' prompts under the header. After creating a new user, select the user's created username - the username will display under the header on the right. Add a favorite by clicking on the star at the top of each trail info card. To view your favorites - click your username! This will take you to a personalized page with your favorites listed. To delete a hike from your favorites, simply click the "delete" button at the bottom of each hike. Navigate back to home from your page with the "Home" button. </p>

<br>
<h4>Set-Up Instructions</h4>
We accessed an API through REI Hiking Project with an REI member  specific key. In order for this program to work, unfortunately you must be an REI member (or have a friend who's API you can use). Follow <a href="https://www.hikingproject.com/data">This Link</a> to find your API key specific to your REI membership on the Hiking Project Page. You will need to log-in to your REI membership to view. </p>
<ol>
<li>Fork the repo, git clone, and cd into the main directory (mod2project)</li>
<li>Open up your code editor of choice </li>
<li>In your command line - into cd backend </li>
<li>Create a new file .env </li>
<li>In this .env file copy your API key from the Hiking Project Page: <br> REI_API_KEY=your-REI-Hiking-Project-API-key</li>
<li>Then in your terminal(still within the backend directory) run the comands<br>
    rails db:migrate <br>
    rails db:seed <br>
    rails s
</li>
<li>Open a new terminal tab and cd into frontend. Run the command "lite-server" </li>
</ol>
<p>You should now have a new browser window at our home page! Enjoy using trails!</p>

<footer>Contributors: Daemon Self & Lizzy Tong</footer>
