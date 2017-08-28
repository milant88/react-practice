var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var h = require('./helpers');
var History = ReactRouter.History;

/*
    App
 */


var App = React.createClass({

    getInitialState : function() {
        return {
            fishes : {},
            order : {}
        }
    },

    addFish : function(fish) {
      var timestamp = (new Date()).getTime();
      //update the state object
      this.state.fishes['fish-' + timestamp] = fish;
      // set the state
      this.setState({ fishes : this.state.fishes });
    },

    loadSamples : function() {
        this.setState({
            fishes : require('./sample-fishes')
        });
    },

    renderFish : function(key) {
      return <Fish key={key} index={key} details={this.state.fishes[key]} />
    },
    render: function() {
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" num="5000"/>
                    <ul className="list-of-fishes">
                        {Object.keys(this.state.fishes).map(this.renderFish)}
                    </ul>
                </div>
                <Order/>
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
            </div>
        );
    }
});

/*
    Fish
    <Fish />
 */

var Fish = React.createClass({
   render : function() {
       var details = this.props.details;
       return (
         <li className="menu-fish">
             <img src={details.image} alt={details.name} />
             <h3 className="fish-name">
                 {details.name}
                 <span className="price">{h.formatPrice(details.price)}</span>
             </h3>
             <p>{details.desc}</p>
         </li>
       );
   }
});

/*
    Add Fish Form
    <AddFishForm />
 */

var AddFishForm = React.createClass({

    createFish : function(event) {
        //1. Stop the form from submitting
        event.preventDefault();
        //2. Take the data from the form and create and object
        var fish = {
            name : this.refs.name.value,
            price : this.refs.price.value,
            status : this.refs.status.value,
            desc : this.refs.desc.value,
            image : this.refs.image.value
        }

        console.log(fish);

        //3. Add the fish to the App State


    },

   render : function() {
       return (
         <form className="fish-edit" onSubmit={this.createFish}>
             <input type="text" ref="name" placeholder="Fish Name"/>
             <input type="text" ref="price" placeholder="Fish Price"/>
             <select ref="status">
                 <option value="available">Fresh!</option>
                 <option value="unavailable"></option>
             </select>
             <textarea type="text" ref="desc" placeholder="Desc"></textarea>
             <input type="text" ref="image" placeholder="URL to Image" />
             <button type="submit">+ Add Item</button>
         </form>
       );
   }
});

/*
    Header
    <Header/>
 */

var Header = React.createClass({
   render : function() {
       console.log(this.props)

       return (
           <header className="top">
               <h1>Catch
                   <span className="ofThe">
                       <span className="of">of</span>
                       <span className="the">the</span>
                   </span>
                   Day</h1>
               <h3 className="tagline"><span>{this.props.tagline}</span></h3>
           </header>
       );
   }
});

/*
 Order
 <Order/>
 */

var Order = React.createClass({
    render : function() {
        return (
            <p>Order</p>
        );
    }
});

/*
 Inventory
 <Inventory/>
 */

var Inventory = React.createClass({
    render : function() {
        return (
            <div>
                <p>Inventory</p>

                <AddFishForm addFish={this.props} />
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        );
    }
});

/*
    StorePicker
    <StorePicker/>
 */

var StorePicker = React.createClass({

    mixins : [History],

    goToStore : function(event) {
        event.preventDefault();
        //get the data from input
        var storeId = this.refs.storeId.value;
        this.history.pushState(null, '/store/' + storeId);
        // transition from <StorePicker/> to <App/>
    },

   render : function() {

       var name = 'wes';

       return (
           <form className="store-selector" onSubmit={this.goToStore}>
               <h2>Please Enter A Store {name}</h2>
               <input type="text" ref="storeId" defaultValue={h.getFunName()} required/>
                   <input type="Submit" />
           </form>
       );
   }
});

/*
    Not Found
 */

var NotFound = React.createClass({
   render : function() {
       return <h1>Not Found!</h1>
   }
});

/*
    Routes
 */

var routes = (
    <Router history={createBrowserHistory()}>
        <Route path="/" component={StorePicker} />
        <Route path="/store/:storeId" component={App} />
        <Route path="*" component={NotFound} />
    </Router>
)


ReactDOM.render( routes , document.querySelector('#main'));