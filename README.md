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
// -- 7/30/19
// Added in some status display menu basics for each game
// -- 8/12/19
// Buttons! and faking more game endpoints and working on game communication
// -- 8/13/19
// Get a base down for the status communcation to games
// Make the buttons and game config a bit prettier, test out statuses

3:50 - 6:00


Cant "ready" a team if session "ready" is true
Rely on socket.io messaging to communicate scores to leaderboard terminal
The Scoreboard and Instructions Screen need to be open before the dashboard loads
Move settings to action bar and remove menu
Need to sync teams to update scoreboard?

---- Notes from 7/25 meeting:
// endpoints for pause restart and reset, and game start, resume, end game, stop, heartbeat
make state for games that are inactive
NEXT: edit score
NEXT: drag and drop - assign teams, lock teams, start round
unreadying a team should not wipe their score from the board
NEXT: Actions need to be Rotate Teams, Lock Teams, Start Round
 - Rotate Teams rotates the active teams into active games, during this phase teams can no longer be added to the games, but teams can be re-arranged
 - Lock Teams - locks the teams into the games (teams can no longer be added or re-arranged) and presents the assignments to the instructions view
 - Start Round - Does the same thing as it did before

Game Statuses (should be available from a /status endpoint)
idle - Idle, waiting to recieve order
running - Actively running a game
paused - Paused during a game
ending - Wrapping up the game showing score/end video/etc
error - No reponse from game or any error (for now)

A status of "error" should put the game into a "not ready" state, moving a game from "not ready" to "ready" should check the game's status while doing so

Questions?
 - Should we be able to restart/resume a stopped/reset game (my assumption is no - if no then a reset/stop needs to trigger a resolution of that game so the round can finish)
 - if a game is "ending" do we want to be able to pause (my assumption in no, the game is already over)


== start-game (from D to G)
```
{"teamId":"7fb7a3d7-f424-375e-b1a9-f58e40a01d23","members":2,"teamName":"itchy plants"}
```

=== game-complete (from G to D)
```
{"teamId": "44d3c629-447b-34ec-82ac-05c051194694","score": 10, "teamName": "Robert" }
```