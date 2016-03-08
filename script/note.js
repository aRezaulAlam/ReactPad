var Alert = ReactBootstrap.Alert;
var Button = ReactBootstrap.Button;
var PanelGroup = ReactBootstrap.PanelGroup;
var Panel = ReactBootstrap.Panel;
var Navbar = ReactBootstrap.Navbar;
var NavbarHeader = ReactBootstrap.Navbar.Header;
var NavbarBrand = ReactBootstrap.Navbar.Brand;
var NavbarItems = ReactBootstrap.Navbar.Items;
var Item = ReactBootstrap.Navbar.Item;
var NavbarDropdown = ReactBootstrap.Navbar.Dropdown;
var DropdownMenu = ReactBootstrap.Navbar.DropdownMenu;
var NavbarToggle = ReactBootstrap.Navbar.Toggle;
var NavbarForm = ReactBootstrap.Navbar.Form;
var NavbarCollapse = ReactBootstrap.Navbar.Collapse;
var Input = ReactBootstrap.Input;
var Grid = ReactBootstrap.Grid;
var Col = ReactBootstrap.Col;
var Row = ReactBootstrap.Row;
var Modal = ReactBootstrap.Modal;
var ButtonInput = ReactBootstrap.ButtonInput;


var NoteForm = React.createClass({

	getInitialState: function() {
    return {title: '', text: ''};
  },
  	handleTitleChange: function(e) {
    this.setState({title: e.target.value});
  },
  	handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  	handleSave: function(e) {
	    e.preventDefault();
	    var title = this.state.title.trim();
	    var text = this.state.text.trim();
	    if (!text || !title) {
	      return;
	    }
    this.props.onNoteSubmit({title: title, text: text});
    this.setState({title: '', text: ''});
  },

	render: function () {
		return (<form className="noteForm" onSubmit={this.handleSave}>
			<Input type="text" label="Title" value={this.state.title} onChange={this.handleTitleChange} placeholder="Enter Title" />
			<Input type="textarea" label="Note"  value={this.state.text} onChange={this.handleTextChange} placeholder="Write note..." />
			<ButtonInput bsStyle="primary" type="submit" value="Save" />
		</form>);
	}
});


var NavigationBar = React.createClass({

	getInitialState() {
    return { show: false };
  },

  	handleNoteSubmit: function (notesData) {
  	this.setState({ show: false});
  	this.props.onNotePass(notesData);

  }
,
  

	render: function () {

		let close = () => this.setState({ show: false});
		
		return (<Navbar >
					<NavbarHeader>
					      <NavbarBrand>
					        <a href="#">ReactPad</a>
					      </NavbarBrand>
					      <NavbarToggle />
					 </NavbarHeader>
					 <NavbarCollapse>
					      <NavbarForm pullLeft>
					      <Input type="text" placeholder="Search"/>
					      {'                '}

							<Button
					          bsStyle="primary"
					          className="btn-space"
					          onClick={() => this.setState({ show: true})}
					        >
					          Add Note
					        </Button>

					        <Modal
					          show={this.state.show}
					          onHide={close}
					          container={this}
					          aria-labelledby="contained-modal-title"
					        >
					          <Modal.Header closeButton>
					            <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
					          </Modal.Header>
					          <Modal.Body>
					               <NoteForm onNoteSubmit={this.handleNoteSubmit}/>
					          </Modal.Body>
					          <Modal.Footer>
					            <Button onClick={close}>Close</Button>
					          </Modal.Footer>
					        </Modal>

					      </NavbarForm>
    				</NavbarCollapse>
    				
	            </Navbar>);
	}
});


var RowNotePanel = React.createClass({

	render: function () {


		return(

			<Panel bsStyle="info" header={this.props.header} eventKey={this.props.eventKey}>{this.props.children}</Panel>
			  
				);			
		}

});




var NotePanelGroup = React.createClass({
  getInitialState: function() {
    return {
      activeKey: '1'
    };
  },

  handleSelect: function(activeKey) {
    this.setState({ activeKey });
  },

  render: function() {


	var notesData = this.props.notes.map(function (note) {
		return(

				<RowNotePanel eventKey={note.id} header={note.title}>{note.text}</RowNotePanel>
     

			);
	});

    return (
      <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
      	
      	 {notesData}   	

      </PanelGroup>
    );
  }
});


var MainContainer = React.createClass({

		loadDataFromServer: function () {
			
			 $.ajax({
			      url: this.props.url,
			      dataType: 'json',
			      cache: false,
			      success: function(data) {
			        this.setState({notes: data});
			      }.bind(this),
			      error: function(xhr, status, err) {
			        console.error(this.props.url, status, err.toString());
			      }.bind(this)
    				});
		},

		getInitialState: function() {
		    return {notes: []};
		  },

		  componentDidMount: function() {
		    this.loadDataFromServer();
		    setInterval(this.loadDataFromServer, 2000);
  		},

  			handlePassingInputNote: function (notesData) {
  				var notesView = this.state.notes;
			   	console.log(notesData);
			   	console.log("Hello World");
			    var newNotes = notesView.concat([notesData]);
			    console.log(newNotes);
			    this.setState({notes: newNotes});
			    $.ajax({
			      url: "http://api.agroho.com/reactpad/react_save.php",
			      dataType: 'json',
			      type: 'POST',
			      data: notesData,
			      success: function(data) {
			        this.setState({notes: data});
			      }.bind(this),
			      error: function(xhr, status, err) {
			        this.setState({notes: notesView});
			        console.error("http://api.agroho.com/reactpad/react_save.php", status, err.toString());
			      }.bind(this)
    });
  			}

  		,

		render: function () {
			return (

				<Grid>
			        <Row className="show-grid">
			      		<Col md={6} mdPush={6}></Col>
			      		<Col md={6} mdPull={6}><NavigationBar onNotePass={this.handlePassingInputNote}/></Col>
			    	</Row>
			    	<Row className="show-grid">
			      		<Col md={6} mdPush={6}></Col>
			      		<Col md={6} mdPull={6}><NotePanelGroup notes={this.state.notes}/></Col>
			    	</Row>
			   </Grid>

				);
		}

});



ReactDOM.render(<MainContainer url="http://api.agroho.com/reactpad/react_note.php" />, document.getElementById('demo'));

