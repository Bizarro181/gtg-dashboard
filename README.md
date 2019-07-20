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

Cant "ready" a team if session "ready" is true
Rely on socket.io messaging to communicate scores to leaderboard terminal
The Scoreboard and Instructions Screen need to be open before the dashboard loads
Move settings to action bar and remove menu