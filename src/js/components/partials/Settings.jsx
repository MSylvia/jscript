'use strict';

var React    = require('react');
var Addons   = require('react/addons');

var AppStore = require('../../stores/AppStore');
var AppActions = require('../../actions/AppActions');


var Settings = React.createClass({

	getInitialState: function() {
		return {
			editor: this.props.editor,
			settings: this.props.settings
		}
	},

	onChange: function(name, e) {
		var state = {};
		var this_index = null;
		var type = e.target.type;
		var this_value = e.target.value;
		var p_name = 'settings';

		// Init sub object
		var parent = {};
		parent[p_name] = this.state[p_name];
		
		// if type is a checkbox
		if (type == 'checkbox') {
			state[name] = this.state[p_name][name] ? false : true;

		// if type is a single selectbox or a radio
		} else if (type == 'select-one' || type == 'radio') {
			this.state[p_name][name].forEach(function(elem, i) {
				if (elem.value == this_value)
					this_index = i;
			});
			
			var this_select = this.state[p_name][name][this_index].selected;
			state[name] = this.state[p_name][name];
			
			if (this_select == false) {
				this.state[p_name][name].forEach(function(elem, i) {
					state[name][i].selected = this_index == i ? true : false;
				});
			}

		// if type is a multiple select
		} else if (type == 'select-multiple') {
			var dom_value = this.refs[name].getDOMNode();
			
			state[name] = this.state[p_name][name];
			state[name].forEach(function(elem, i) {
				elem.selected = false;
			});
			
			this_value = [].map.call(dom_value, function(elem, i, arr) {
				return elem.selected ? elem.value : null;
			});
			
			this_value.forEach(function(elem, i) {
				var that = elem;
				state[name].forEach(function(elem, j) {
					if (that == elem.value && !elem.selected) {
						elem.selected = true;
					}
				})
			});

		// if type is just text
		} else {
			state[name] = this_value;
		}

		// Render sub object
		parent[p_name][name] = state[name];
		return this.setState(parent);
	},

	singleSelect: function(name) {
		var default_value = null;
		var options = this.state[name].map(function(elem, i) {
			if (elem.selected == true) default_value = elem.value;
			return <option value={elem.value} key={i}>{elem.label}</option>
		}, this);

		return (
			<select 
				name={name}
				value={default_value} 
				onChange={this.onChange.bind(this, name)}>
					{options}
			</select>
		)
	},

	handleSave: function() {
		return AppActions.updateData(this.state);
	},

	handleAddRemove: function(type, e) {
		var state = {};
		// var this_value = this;
		// var this_index = null;
		// var extension = null;
		var this_value = e.target.value;
		var parent = 'settings';

		console.log('this_value', this_value);

		// Init sub object
		var parent_name = {};
		parent_name[parenx] = this.state[parenx];

		switch(type) {
			case 'add':
				console.log('Add library');
				break;
			case 'remove':
				console.log('Remove library');
				break;
		}

		// Render sub object
		parent_name[parenx][name] = state[name];
		return this.setState(parent_name);
	},

	render: function() {
		return (
			<li className="dropdown">
				<a href="javascript:void(0)">
					<i className="fa fa-cog"></i>
					<span>Settings</span>
				</a>
				<ul>
					<li>
						<input 
							type="text" 
							name="title" 
							placeholder="Title" 
							value={this.state.settings.title} 
							onChange={this.onChange.bind(this, 'title')} 
						/>
						<textarea 
							name="description" 
							placeholder="Description" 
							value={this.state.settings.description} 
							onChange={this.onChange.bind(this, 'description')} 
						/>
					</li>

					<li className="sep"></li>
					<li>
						<span className="input-group">
							<input type="text" name="libraries" placeholder="Import Libraries" />
							<a href="javascript:void(0)" onClick={this.handleAddRemove.bind(this, 'add')} className="add">
								<i className="fa fa-plus"></i>
							</a>
						</span>
						<ul id="libraries" className="libraries">
							{ this.state.settings.libraries.map(function(elem, i) {
									return (
										<li key={i}>
											<a href={elem} className="link" target="_blank">{elem}</a> 
											<a href="javascript:void(0)" onClick={this.handleAddRemove.bind(this, 'remove')} className="remove">
												<i className="fa fa-minus"></i>
											</a>
										</li>
									)
							}, this) }
						</ul>
					</li>

					<li className="sep"></li>
					<li>
						<label htmlFor="reset">
							Normalized CSS 
							<input 
								name="reset" 
								type="checkbox" 
								value={this.state.settings.reset} 
								onChange={this.onChange.bind(this, 'reset')} 
								checked={this.state.settings.reset} 
							/>
						</label>
					</li>
					<li>
						<label htmlFor="sass">
							Sass support 
							<input 
								name="sass" 
								type="checkbox" 
								value={this.state.settings.sass} 
								onChange={this.onChange.bind(this, 'sass')} 
								checked={this.state.settings.sass} 
							/>
						</label>
					</li>
					<li>
						<label htmlFor="preview">
							Live preview 
							<input 
								name="preview" 
								type="checkbox" 
								value={this.state.settings.preview} 
								onChange={this.onChange.bind(this, 'preview')} 
								checked={this.state.settings.preview} 
							/>
						</label>
					</li>
				</ul>
			</li>
		);
	}

});

module.exports = Settings;
