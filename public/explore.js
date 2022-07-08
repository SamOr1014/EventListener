window.onload = async () => {
    console.log("Texting1")
    await getUserInfo();
    const isLoggedIN = !!user;
    console.log("Final texting")
}

async function getUserInfo() {
    const resp = await fetch("/account/getUser");
    if (resp.status === 200) {
      const result = await resp.json();
      user = result.user;
    //   console.log(user.ID) ID 
    //   console.log(user.username); email
    }
  }
  


// Login show follower's event and all
// Not login show all

async function loadEvents(isLoggedIN) {

}