# acarters-final

Some notes for grading:
All of the code I wrote is in final-react-app/src.

My code, including my game, was implemented using React. My hosted site, super-ultra-snake.web.app, is running from a build of this React app.

I implemented two 3rd Party APIs, snoowrap, an implementation of the Reddit API, and newscatcher, an API to access news articles. 
Both of these are accessed and used in webpageComponent, although their data is primarily rendered through props in homeComponent and loggedInHomeComponent.

My database and authorization is managed through firebase. This database is created in webpageComponent, 
but I pass methods to allow for reading and writing to it into other components.
