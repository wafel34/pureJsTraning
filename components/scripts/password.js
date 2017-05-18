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
        message = "Please correct the following issue:\n" + this.issues.join('n');
        break;
      default:
        message = "Please correct the following issues:\n" + this.issues.join('n');
        break;
    }
    alert(message);
    return message;
  }
};

var submitButton = document.getElementById('btn');


btn.onclick = function () {
  var firstPassowrd = document.getElementById('password1').value,
      secondPassowrd = document.getElementById('password2').value;

  var firstInputIssuesTracker = new IssueTracker();
  var secondInputIssuesTracker = new IssueTracker();

  console.log(firstPassowrd.value.length);

};
