sap.ui.define(
  ['sapify/controller/BaseController', 'sap/ui/model/json/JSONModel'],
  function (BaseController, JSONModel) {
    'use strict';

    return BaseController.extend('sapify.controller.Home', {
      onInit: function () {
        // Initialize the layout model
        var oLayoutModel = new JSONModel({
          layout: 'OneColumn',
        });
        this.setModel(oLayoutModel, 'layout');
      },

      onStateChange: function (oEvent) {
        var sLayout = oEvent.getParameter('layout');
        this.getModel('layout').setProperty('/layout', sLayout);
      },

      onNavToProducts: function () {
        this.getRouter().navTo('products');
      },

      onNavToOrders: function () {
        this.getRouter().navTo('orders');
      },

      onCreateProduct: function () {
        // Navigate to products view and open create dialog
        this.getRouter().navTo('products', {
          query: {
            create: true,
          },
        });
      },

      onCreateOrder: function () {
        // Navigate to orders view and open create dialog
        this.getRouter().navTo('orders', {
          query: {
            create: true,
          },
        });
      },
    });
  }
);
