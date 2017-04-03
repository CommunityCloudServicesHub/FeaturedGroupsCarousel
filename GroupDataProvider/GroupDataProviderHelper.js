({
    doQuery: function(component, offset, pageSize) {
        var self = this;
        var onSuccessCallback = function(response) {
            var groupList = response.getReturnValue();
            if (groupList == null) {
                groupList = [];
            }
            self.fireDataChangeEvent(component, groupList);
        }

        this.executeApex(component, "c.getGroups", {
                "offet": 0,
                "pageSize": component.get("v.pageSize"),
                "filter": component.get("v.filterType"),
                "filterValue": component.get("v.filterValue"),
                "sortOptions": component.get("v.sortOptions")
            },
            onSuccessCallback, null);


    },
    executeApex: function(component, actionName, params, onsuccess, onerror) {
        var action = component.get(actionName);
        if (params != null) {
            action.setParams(params);
        }
        var self = this;
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                if (onsuccess) {
                    onsuccess(response);
                }
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.log(errors);
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        self.error(component, 'ActionError', 'Error executing ' + actionName + ': ' + errors[0].message);
                    } else {

                    }
                } else {
                    self.error(component, 'ActionError', 'Error executing ' + actionName);
                }
                if (onerror) {
                    onerror();
                }
            }
        });
        $A.enqueueAction(action);
    }
})