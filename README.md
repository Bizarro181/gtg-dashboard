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
// -- 8/14/19
// Editing a score works without increasing the games played
// -- 8/19/19
// Make edited scores reflect across dashboards
// Fix "bug" about scores not working - stupid css issue
// -- 8/20/19
// Feature: Update actions for starting a game to include a "Lock teams" state
// Feature: Look into drag and drop libraries
// -- 9/21/19
// Feature: drag and drop - assign teams, lock teams, start round
// -- 9/22/19
// Fix: unreadying a team should not wipe their score from the board
// Feature: An errored game is now no longer active
// Feature: A game can now be toggled between active and inactive
// -- 9/27/19
// Fix: get routes in line with the games' routes
// Fix-ish: test out new routes on fake-game
// Feature: A game that is stopped, or errored will now release the team and mark the game as "completed"

3:50 - 6:00


Cant "ready" a team if session "ready" is true
Rely on socket.io messaging to communicate scores to leaderboard terminal
The Scoreboard and Instructions Screen need to be open before the dashboard loads
Move settings to action bar and remove menu
Need to sync teams to update scoreboard?

---- Notes from 7/25 meeting:
// endpoints for pause restart and reset, and game start, resume, end game, stop, heartbeat
// NEXT: edit score
// Next: editing a score needs to communicate with the server (need a new listener cant piggyback off of gamecomplete)
// NEXT: look into why running a score initially doesnt work
// NEXT: Actions need to be Rotate Teams, Lock Teams, Start Round
// - Rotate Teams rotates the active teams into active games, during this phase teams can no longer be added to the games, but teams can be re-arranged
// - Lock Teams - locks the teams into the games (teams can no longer be added or re-arranged) and presents the assignments to the instructions view
// - Start Round - Does the same thing as it did before
// drag and drop - assign teams, lock teams, start round
// https://sortablejs.github.io/Vue.Draggable/#/nested-example
// NEXT: unreadying a team should not wipe their score from the board
// Button for "release team" if a game is inactive, errored, or stopped while a team is in it (or do this automatically)
// Game will redirect to dump endpoint - read that.
// pause is also resume
// pause/pause/kill/dump

Releasing a team doesnt make the team ready for the next round?

Use Dump for game statues


Feature: make state for games that are inactive



Game Statuses (should be available from a /status endpoint)
idle - Idle, waiting to recieve order
running - Actively running a game
paused - Paused during a game
ending - Wrapping up the game showing score/end video/etc
error - No reponse from game or any error (for now)

A status of "error" should put the game into a "not ready" state, moving a game from "not ready" to "ready" should check the game's status while doing so

Questions?
 - Should we be able to restart/resume a stopped/reset game (my assumption is no - if no then a reset/stop needs to trigger a resolution of that game so the round can finish) - no
 - if a game is "ending" do we want to be able to pause (my assumption in no, the game is already over) - no


== start-game (from D to G)
```
{"teamId":"7fb7a3d7-f424-375e-b1a9-f58e40a01d23","members":2,"teamName":"itchy plants"}
```

=== game-complete (from G to D)
```
{"teamId": "44d3c629-447b-34ec-82ac-05c051194694","score": 10, "teamName": "Robert" }
```


Dump Logs - games will automatically dump logs directly to the server
 - Maybe in the future dashboard can access logs directly from the server

// Send Frank statuses

Greg: do we need to know in-game stats as they occur (time elapsed, score, etc)

Health Check
server needs enpoint for health check: degreded: and recieve a text message back of the current
