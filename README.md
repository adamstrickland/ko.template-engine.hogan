#ko.template-engine.hogan

========================

ko.template-engine.hogan is a template engine for [KnockoutJS](http://knockoutjs.com) that incorporates the [Mustache](https://github.com/janl/mustache.js) template library and [Hogan](https://github.com/twitter/hogan.js), a compiler for Mustache.  

Heavily inspired (poached?) from [Marcin Wtorkowski](https://github.com/WTK)'s Mustache template engine for Knockout, [ko.mustache.js](https://github.com/WTK/ko.mustache.js).

##Um, why?

Basically, Hogan enables you to keep your Mustache templates in plain source files and Hogan compiles them into pure Javascript for speed.  The guys over at some place called "Twitter" created it; for some reason they have a need for speed.  The ramification of this, at least as far as Knockout is concerned, is that the post-compilation templates are no longer referenced by name and loaded from the DOM, as Knockout expects, but rather are added now actual Javascript objects.  Knockout's default templating mechanism gets a little twitchy with that.

##Installation

[Download](https://raw.github.com/adamstrickland/ko.template-engine.hogan/master/dist/ko.template-engine.hogan-0.1.0.min.js) and include the template engine *after* Knockout and *before* your binding code.  The template engine installs itself into Knockout.

##Example

Straight-up Hogan.js

	<html>
		<head>
			<script type="text/javascript" src="knockout-2.1.0.min.js"></script>
			<script type="text/javascript" src="ko.template-engine.hogan-0.1.0.min.js"></script>	
		</head>
		<body>
			<div>
				<h2>The crew of the Heart of Gold</h2>
				<div data-bind="template: { name: templateCallback, foreach: datalist }"></div>
			</div>

			<script type="text/javascript">
				ko.applyBindings({
					var self = this;

					self.datalist = ko.observableArray([
						'Arthur Dent',
						'Trillian',
						'Ford Prefect',
						'Zaphod Beeblebrox',
						'Marvin the Robot'
					]);

					self.templateCallback = function () {
						var _content = "<p>{{.}}</p>";
						return Hogan.parse(Hogan.scan(_content));
					};
				});
			</script>
		</body>
	</html>

##What's going on?

The binding is using a form of Knockout's [template binding](http://knockoutjs.com/documentation/template-binding.html#note_4_dynamically_choosing_which_template_is_used) that invokes a callback in the view model.  Usually this is used to programmatically determine which template to use at run-time.  Rather than return a string indicating the name of the template, we're returning the template object itself.  The template engine invokes `render` on the template object, passing the data provided by the template mechanism.

##Rails

I personally went down this path due to a project using Mustache templates in the context of a Rails application.  Eventually I found the [HoganAssets](https://github.com/leshill/hogan_assets) gem, which nicely incorporates HoganJS into Rails, by precompiling the templates and assigning them to hash keys in a global object.  For detailed information regarding configuration of HoganAssets, please see [https://github.com/leshill/hogan_assets].

Let's say you have a template at `$project_root/app/assets/templates/crewmembers.mustache` that looks like this:

	<p>{{.}}</p>

HoganAssets (properly configured, of course), would compile the template and make it accessible to your javascript code as `HoganTemplates['crewmembers']`.  So now your Knockout view model goes from this:

	self.templateCallback = function () {
		return Hogan.parse(Hogan.scan("<p>{{.}}</p>"));
	};

to this:

	self.templateCallback = function () {
		return HoganTemplates['crewmembers'];
	};

And now you've entered the world of well-organized (and fast!) Javascript templates.  

Viel Spaß
