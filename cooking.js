// Setup movie night

// Cook Popcorn
// Pour Drinks
// Start Movie

// We only want to start our movie when cook popcorn and our drinks function returns a promise

// When we use the keyword async we get access to keyword called await
// The await keyword tells any promise based function to be promise to be fulfilled or rejected, not pending
// async and await tell the code to wait till the function returns a promise

async function setupMovieNight() {
  await cookPopcorn();
  await pourDrinks();
  startMovie();
}

function cookPopcorn() {
  return Promise(/*Some Code Here*/);
}
