/*jslint browser: true*/
/*jslint devel: true */
var React = require('react');

var Board = React.createClass({
  getInitialState() {
	return {
	  notes: []
	}
  },
  componentWillMount() {
	if (this.props.count) {
		var url = 'http://baconipsum.com/api/?type=all-meat&sentences=10'

		fetch(url)
			.then(results => results.json())
			.then(array => array[0])
			.then(text => text.split('. '))
			.then(array => array.forEach(
				sentence => this.add(sentence)
			)).catch(function(err){
				console.log("Didn't connetct to API")
			})
	}
  },
  nextId() {
	  this.uniqueId = this.uniqueId || 0
	  return this.uniqueId++
  },
  add(text) {
	  var notes = [
		  ...this.state.notes,
		  {
			  id: this.nextId(),
			  note: text
		  }
	  ]
	  this.setState({notes})
  },
  update(newText, id) {
	var notes = this.state.notes.map(function(note){
		return (note.id !== id) ? note : {...note, note: newText}
	})
	this.setState({notes})
  },
  remove(id) {
	  var notes = this.state.notes.filter(function(note){
		  return (note.id !== id)
		  this.setState({notes})
	  })
  },
  eachNote(note) {
	  return (
		  <Note key={note.id}
		  id={note.id}
		  onChange={this.update}
		  onRemove={this.remove}>
		  {note.note}</Note>
	  )
  },
  render() {
	return (
	  <div className="board">
		{this.state.notes.map(this.eachNote)}
		<button className="add-note" onClick={() => this.add("New note")}>+</button>
	  </div>
	)
  }
})
