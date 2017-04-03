({
	doInit : function(component, event, helper) {
		// Load Carousel Type Metadata
		helper.loadSliderTemplates(component);
		var slideOptions = {'aspectRatio': component.get("v.aspectRatio")};
		console.log('In init of content carousel');
		console.log(slideOptions);
		component.set("v.slideOptions", slideOptions);
	}
})