export function getPuzzles2(game, round) {
    const allRoles = round.get("allRoles");

    const numImages = 1500;
    const bounds = 75;

    for (let team of allRoles) {
      // const {speaker, listener, availableAdvisors, chosenAdvisors} = team;
      const {speaker, listener} = team;

      const speakerPlayer = game.players.find((p) => p.get("nodeId") === speaker);
      const listenerPlayer = game.players.find((p) => p.get("nodeId") === listener);

      let speakerImageHistory = speakerPlayer.get("imageHistory");
      let listenerImageHistory = listenerPlayer.get("imageHistory");
      let combinedImageHistory = multiplyArrays(speakerImageHistory, listenerImageHistory);

      // Find the index of a random image excluding the bounds
      // Pick index b/t 76 and 1500-77. (0-index)
      // If i = 76, then we are left with 76 - 75 = 1 [0,1)
      // If i = 1423, then we are left with 1423 + 75 = 1498 [1498 + 1, 1499]
      const iMid = _.random(bounds+1, numImages-(bounds + 1 + 1));

      let combinedMatrixLeft = _.slice(combinedImageHistory, 0, iMid-bounds);

      let combinedMatrixRight = _.slice(combinedImageHistory, iMid + bounds + 1);


      // Find the index from left matrix by choosing largest value after multiplying by a random number
      let maxLeft = -1;
      let maxLeftIdx = -1;
      let maxRight = -1;
      let maxRightIdx = -1;
      for (let i = 0 ; i < combinedMatrixLeft.length; i++) {
        combinedMatrixLeft[i] = Math.random() * combinedMatrixLeft[i];

        if (combinedMatrixLeft[i] > maxLeft) {
          maxLeft = combinedMatrixLeft[i];
          maxLeftIdx = i;
        }
      }

      // Find the index fro the right matrix
      for (let i = 0; i< combinedMatrixRight.length; i++) {
        combinedMatrixRight[i] = Math.random() * combinedMatrixRight[i];

        if (combinedMatrixRight[i] > maxRight) {
          maxRight = combinedMatrixRight[i];
          maxRightIdx = i + iMid + bounds + 1;
        }
      }

      // Use the indices as the puzzleSet
      const puzzleSet = [maxLeftIdx, iMid, maxRightIdx];


      for (i of puzzleSet) {
        speakerImageHistory[i] = 0.0;
        listenerImageHistory[i] = 0.0;
      }

      speakerPlayer.set("imageHistory", speakerImageHistory);
      listenerPlayer.set("imageHistory", listenerImageHistory);

      const puzzleAnswer = puzzleSet[_.random(puzzleSet.length-1)];


      // Set puzzle and puzzle answer to each pair and each speaker/listener player
      if (speakerPlayer.round.get('puzzleSet')) {
        team.puzzleSet = speakerPlayer.round.get('puzzleSet');
        team.puzzleAnswer = speakerPlayer.round.get('puzzleAnswer');
        listenerPlayer.round.set('puzzleSet', _.shuffle(speakerPlayer.round.get('puzzleSet')));
        listenerPlayer.round.set('puzzleAnswer', speakerPlayer.round.get('puzzleAnswer'));

      } else {
        team.puzzleSet = puzzleSet;
        team.puzzleAnswer = puzzleAnswer;
        speakerPlayer.round.set('puzzleSet', puzzleSet);
        listenerPlayer.round.set('puzzleSet', _.shuffle(puzzleSet));
        speakerPlayer.round.set('puzzleAnswer', puzzleAnswer);
        listenerPlayer.round.set('puzzleAnswer', puzzleAnswer);
      }

    }
    round.set("allRoles", allRoles);
  }