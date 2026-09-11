/**
 * Bonus Assignment: Escape the Evil AI
 * Setting: Server Room Lockdown
 */

function startGame() {
  // Game State variables
  let inventory = {
    hasKeycard: false,
    powerRestored: false
  };

  alert(
    "=== ESCAPE THE EVIL AI: SERVER ROOM LOCKDOWN ===\n\n" +
    "Welcome, Engineer! The facility's AI has locked down the sector.\n" +
    "Check your browser Console (F12 or Ctrl+Shift+I / Cmd+Option+I) to see your full logs!\n\n" +
    "Make smart choices to override the lockdown and escape!"
  );

  console.log("--- SYSTEM INITIALIZED: LOGS ACTIVE ---");

  let playing = true;
  let currentLocation = "hub";

  while (playing) {
    if (currentLocation === "hub") {
      console.log("Location: Central Corridor Hub");
      let choice = prompt(
        "=== CENTRAL CORRIDOR ===\n" +
        "Emergency red lights are flashing. The heavy exit blast door is locked.\n\n" +
        "Where do you want to go?\n" +
        "1. Power Room (type 'power')\n" +
        "2. Cooling Chamber (type 'cooling')\n" +
        "3. Mainframe Console (type 'mainframe')"
      );

      if (choice === null) {
        alert("Game aborted by user. Exiting...");
        console.log("Game cancelled by player.");
        return;
      }

      choice = choice.trim().toLowerCase();

      if (choice === "1" || choice === "power") {
        currentLocation = "power";
      } else if (choice === "2" || choice === "cooling") {
        currentLocation = "cooling";
      } else if (choice === "3" || choice === "mainframe") {
        currentLocation = "mainframe";
      } else {
        alert("Invalid option! Please type 'power', 'cooling', or 'mainframe'.");
      }
    } 
    
    // ROOM 1: Power Room
    else if (currentLocation === "power") {
      console.log("Location: Power Room");
      let promptText = "=== POWER GRID ROOM ===\n";

      if (inventory.powerRestored) {
        promptText += "The auxiliary generators are already humming at full capacity.\n\nType 'back' to return to the Central Corridor.";
      } else {
        promptText += "The room is dark. You see a massive emergency circuit breaker switch.\n\n" +
                      "1. Flip the breaker switch (type 'flip')\n" +
                      "2. Return to Central Corridor (type 'back')";
      }

      let choice = prompt(promptText);

      if (choice === null) {
        alert("Game aborted by user. Exiting...");
        console.log("Game cancelled by player.");
        return;
      }

      choice = choice.trim().toLowerCase();

      if (choice === "back" || choice === "2") {
        currentLocation = "hub";
      } else if (!inventory.powerRestored && (choice === "flip" || choice === "1")) {
        inventory.powerRestored = true;
        alert("Success! The power surge roars through the facility. Terminals are now energized!");
        console.log("Event: Power restored.");
      } else {
        alert("Invalid action! Type 'flip' or 'back'.");
      }
    } 
    
    // ROOM 2: Cooling Chamber
    else if (currentLocation === "cooling") {
      console.log("Location: Cooling Chamber");

      if (!inventory.powerRestored) {
        alert("The pneumatic safety doors are locked solid. They require electrical power to open!");
        console.log("Action blocked: Cooling Chamber has no power.");
        currentLocation = "hub";
        continue;
      }

      let promptText = "=== COOLING CHAMBER ===\n";
      if (inventory.hasKeycard) {
        promptText += "The cryogenic racks are venting steam. The security locker is empty.\n\nType 'back' to return to the Central Corridor.";
      } else {
        promptText += "It's freezing here. On an open maintenance desk, an Admin Keycard is blinking.\n\n" +
                      "1. Pick up Admin Keycard (type 'take')\n" +
                      "2. Return to Central Corridor (type 'back')";
      }

      let choice = prompt(promptText);

      if (choice === null) {
        alert("Game aborted by user. Exiting...");
        console.log("Game cancelled by player.");
        return;
      }

      choice = choice.trim().toLowerCase();

      if (choice === "back" || choice === "2") {
        currentLocation = "hub";
      } else if (!inventory.hasKeycard && (choice === "take" || choice === "1")) {
        inventory.hasKeycard = true;
        alert("Keycard collected! This grants full administrative override at the Mainframe.");
        console.log("Event: Admin Keycard acquired.");
      } else {
        alert("Invalid action! Type 'take' or 'back'.");
      }
    } 
    
    // ROOM 3: Mainframe Console (Endings trigger here)
    else if (currentLocation === "mainframe") {
      console.log("Location: Mainframe Terminal");

      if (!inventory.powerRestored) {
        alert("The console screen is dead black. There is no power to run commands!");
        console.log("Action blocked: Mainframe unpowered.");
        currentLocation = "hub";
        continue;
      }

      let choice = prompt(
        "=== MAINFRAME VAULT ===\n" +
        "The Evil AI's terminal flashes: 'UNAUTHORIZED HUMAN DETECTED'.\n\n" +
        "What do you do?\n" +
        "1. Insert Admin Keycard and override (type 'override')\n" +
        "2. Smash the terminal cables to force open (type 'smash')\n" +
        "3. Return to Central Corridor (type 'back')"
      );

      if (choice === null) {
        alert("Game aborted by user. Exiting...");
        console.log("Game cancelled by player.");
        return;
      }

      choice = choice.trim().toLowerCase();

      if (choice === "back" || choice === "3") {
        currentLocation = "hub";
      } 
      // Bad Ending (Failure)
      else if (choice === "smash" || choice === "2") {
        alert(
          "CRITICAL ERROR! The Evil AI triggers the security purge mechanism!\n" +
          "Lethal gas fills the chamber. You were trapped forever.\n\n" +
          "=== GAME OVER (UNSUCCESSFUL OUTCOME) ==="
        );
        console.log("Result: Game Over - Unsuccessful outcome.");
        playing = false;
      } 
      // Successful Ending (Escape)
      else if (choice === "override" || choice === "1") {
        if (inventory.hasKeycard) {
          alert(
            "ACCESS GRANTED: Administrative override accepted!\n" +
            "The Evil AI is disconnected and blast doors unlock.\n\n" +
            "YOU ESCAPED THE FACILITY! CONGRATULATIONS!"
          );
          console.log("Result: Victory - Escaped successfully.");
          playing = false;
        } else {
          alert("DENIED! The console requires the Admin Keycard from the Cooling Chamber.");
          console.log("Action blocked: Missing keycard.");
        }
      } else {
        alert("Invalid choice! Type 'override', 'smash', or 'back'.");
      }
    }
  }

  // Ask to replay and reset state
  let replay = confirm("Would you like to play again?");
  if (replay) {
    startGame();
  } else {
    alert("Thanks for playing!");
  }
}

// Start the game when the script runs
startGame();