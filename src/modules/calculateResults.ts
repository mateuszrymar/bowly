/*
  This module calculates the results in a similar way to how a person would do it:
  1. We get the player data from index.ts.
  2. We take player's rolls array.
  3. We divide the array into frames.
  4. We check if all frames are valid.
  5. We take these frames, and process them into objects, that have following properties:
    - Array with 1 or 2 rolls in the given frame.
    - Number - frame no.;
    - Boolean isStrike;
    - Boolean isSpare;
    - Number of points that this frame got;
    This object should be created in a constructor and have following methods:
    - processFrame() - private method that is called upon construction,
      this method will fill all other properties;
    - checkIfStrike()
    - checkIfSpare()
    - calculatePoints()
  6. Now we have an array of objects.
  7. To get the point total, we map through frame points.
  8. We bundle all data together into an object that contains:
    - Player name
    - Player result
    - Frames with individual frame results.
  9. We return data from previous step.
*/

export const something = 0;

