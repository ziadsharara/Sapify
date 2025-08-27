sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/routing/History',
    'sap/ui/core/UIComponent',
    'sap/m/MessageBox',
  ],
  function (Controller, History, UIComponent, MessageBox) {
    'use strict';

    return Controller.extend('sapify.controller.BaseController', {
      /**
       * Convenience method for accessing the router in every controller of the application.
       * @public
       * @returns {sap.ui.core.routing.Router} the router for this component
       */
      getRouter: function () {
        return UIComponent.getRouterFor(this);
      },

      /**
       * Convenience method for getting the view model by name in every controller of the application.
       * @public
       * @param {string} sName the model name
       * @returns {sap.ui.model.Model} the model instance
       */
      getModel: function (sName) {
        return this.getView().getModel(sName);
      },

      /**
       * Convenience method for setting the view model in every controller of the application.
       * @public
       * @param {sap.ui.model.Model} oModel the model instance
       * @param {string} sName the model name
       * @returns {sap.ui.mvc.View} the view instance
       */
      setModel: function (oModel, sName) {
        return this.getView().setModel(oModel, sName);
      },

      /**
       * Convenience method for getting the resource bundle.
       * @public
       * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
       */
      getResourceBundle: function () {
        return this.getOwnerComponent().getModel('i18n').getResourceBundle();
      },

      /**
       * Event handler for navigating back.
       * It there is a history entry we go back in the browser history
       * If not we replace the current entry of the browser history with the master route.
       * @public
       */
      onNavBack: function () {
        var sPreviousHash = History.getInstance().getPreviousHash();

        if (sPreviousHash !== undefined) {
          // eslint-disable-next-line sap-no-history-manipulation
          history.go(-1);
        } else {
          this.getRouter().navTo('home', {}, true);
        }
      },

      /**
       * Event handler for navigating to the login page.
       * @public
       */
      onNavToLogin: function () {
        this.getRouter().navTo('login');
      },

      /**
       * Event handler for navigating to the home page.
       * @public
       */
      onNavToHome: function () {
        this.getRouter().navTo('home');
      },

      /**
       * Convenience method for closing the busy dialog.
       * @public
       */
      closeBusyDialog: function () {
        this._oBusyDialog && this._oBusyDialog.close();
      },

      /**
       * Convenience method for showing an error message.
       * @public
       * @param {string} sMessage the error message
       */
      showErrorMessage: function (sMessage) {
        MessageBox.error(sMessage);
      },

      /**
       * Convenience method for showing a success message.
       * @public
       * @param {string} sMessage the success message
       */
      showSuccessMessage: function (sMessage) {
        MessageBox.success(sMessage);
      },

      /**
       * Convenience method for showing an information message.
       * @public
       * @param {string} sMessage the information message
       */
      showInfoMessage: function (sMessage) {
        MessageBox.information(sMessage);
      },
    });
  }
);
