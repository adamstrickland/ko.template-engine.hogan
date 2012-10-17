ko.hoganTemplateEngine = function () { }

ko.hoganTemplateEngine.prototype = ko.utils.extend(new ko.templateEngine(), {
  makeTemplateSource: function (template) {
    if (typeof template == "object") {
      return template;
    }
    else {
      throw new Error("Unknown template type: " + template);
    }
  },

	renderTemplateSource: function (templateSource, bindingContext, options) {
		var data = bindingContext.$data;
    var htmlResult = templateSource.render(data);
		return ko.utils.parseHtmlFragment(htmlResult);
	},

	allowTemplateRewriting: false,

	version: '0.1.0'
});

ko.setTemplateEngine(new ko.hoganTemplateEngine());