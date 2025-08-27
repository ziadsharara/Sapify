sap.ui.define(
  ['sapify/controller/BaseController', 'sap/ui/model/json/JSONModel'],
  function (BaseController, JSONModel) {
    'use strict';

    return BaseController.extend('sapify.controller.App', {
      onInit: function () {
        // Apply content density mode to root view
        this.getView().addStyleClass(
          this.getOwnerComponent().getContentDensityClass()
        );
      },
    });
  }
);
