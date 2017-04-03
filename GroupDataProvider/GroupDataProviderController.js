({
    provide: function(component, event, helper) {
        component = component.getConcreteComponent();
        helper.doQuery(component);
    }
})