Dashboard: localhost:8080
Socket Server: localhost:3030
Fake Game: localhost:2021

On Load
 - Get Games - these are constant

"Start Session"
 - Add teams in side panel

"Unready"ing a team removes them from "next" and "current"
Teams can be removed entirely only when not ready
Can unready games
Bug: switching back to dashboard from games settings clears the teams (it's loading from remote again)
// Express server for ws waiting and endpoints for teams next/prev
// Express server for scores?
Express server ws for receiving scores?
// node-persist for persisting data
// Remove team
"Reset all"
Timer between games to know how much time has passed



Next:
// Show Team/Next current as team name
// Cant "Next Round" until there is at least one ready team
// Cant "Start Round" until next round (how?)
// Cant "ready" a team if there would be more ready teams than rooms
// Get dashboard up on firebase hosting
// Get scoreboard working
// Get scores to show in order
// Get next display working
// Send teams and rooms data to (local) remote
// --- 7/20/19
// BUG: Un-readying and team and hitting next doesnt let you start the next round, also the team should move out of the rotation
// BUG: Removing teams actually wasnt working
// BUG: Black hole game complete calls when the round isnt running (needed to do this at the socket server level because this event gets emitted to all screens)
// --- 7/22/19
// Add clear button to reset teams, running state, etc, figure out why teams werent resetting on leaderboard
// --- 7/24/19
// Need to capture and send number of members on a team
// Create a express server to fake communication to the machines
// Need to store IP for each game in settings and use that to tell the game to start
// BUG: Deleting games doesnt work since now the ID is not the Firebase ID


Cant "ready" a team if session "ready" is true
Rely on socket.io messaging to communicate scores to leaderboard terminal
The Scoreboard and Instructions Screen need to be open before the dashboard loads
Move settings to action bar and remove menu
Need to sync teams to update scoreboard?


