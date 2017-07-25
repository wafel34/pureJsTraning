function IssueTracker() {
    this.issues = [];
}

IssueTracker.prototype = {
    add: function(issue) {
        this.issues.push(issue);
    },
    reterieve: function() {
        var message = "";
        switch (this.issues.length) {
        case 0:
            break;
        case 1:
            message = "Please correct the following issue:\n" + this.issues.join("n");
            break;
        default:
            message = "Please correct the following issues:\n" + this.issues.join("n");
            break;
        }
        return message;
    }
};
/*
var firstPasswordInput = document.getElementById('password1");

btn.onclick = function () {
  var firstPassword = firstPasswordInput.value,
      secondPassowrd = document.getElementById('password2').value;

  var firstInputIssuesTracker = new IssueTracker();
  var secondInputIssuesTracker = new IssueTracker();


  function checkRequirements () {
    if(firstPassword.length<8) {
      firstInputIssuesTracker.add('Password too short');
    }
  }

  if(firstPassword.length > 0){
    checkRequirements();
  } else {
    firstInputIssuesTracker.add('Passwords must match');
  }
  console.log(firstPassword.length);

  var firstInputIssues = firstInputIssuesTracker.reterieve();

  firstPasswordInput.setCustomValidity(firstInputIssues);

};
*/
