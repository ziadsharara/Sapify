sap.ui.define(
  [
    'sapify/controller/BaseController',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
  ],
  function (BaseController, JSONModel, MessageBox, MessageToast) {
    'use strict';

    return BaseController.extend('sapify.controller.Products', {
      onInit: function () {
        // Initialize the layout model
        var oLayoutModel = new JSONModel({
          layout: 'TwoColumnsMidExpanded',
        });
        this.setModel(oLayoutModel, 'layout');

        // Initialize selected product model
        var oSelectedProductModel = new JSONModel({
          selectedProduct: {},
        });
        this.setModel(oSelectedProductModel, 'selectedProduct');
      },

      onStateChange: function (oEvent) {
        var sLayout = oEvent.getParameter('layout');
        this.getModel('layout').setProperty('/layout', sLayout);
      },

      onNavBack: function () {
        this.getRouter().navTo('home');
      },

      onAddProduct: function () {
        // Navigate to create product view or open dialog
        MessageToast.show('Add product functionality to be implemented');
      },

      onSearch: function (oEvent) {
        var sQuery = oEvent.getParameter('newValue');
        var oFilter = new sap.ui.model.Filter(
          'name',
          sap.ui.model.FilterOperator.Contains,
          sQuery
        );
        var oBinding = this.byId('productsTable').getBinding('items');
        oBinding.filter([oFilter]);
      },

      onProductSelect: function (oEvent) {
        var oItem = oEvent.getParameter('listItem');
        var oContext = oItem.getBindingContext();
        var oProduct = oContext.getObject();

        // Set the selected product in the model
        this.getModel('selectedProduct').setProperty(
          '/selectedProduct',
          oProduct
        );

        // Update layout to show details
        this.getModel('layout').setProperty('/layout', 'TwoColumnsMidExpanded');
      },

      onEditProduct: function () {
        // Edit product functionality
        MessageToast.show('Edit product functionality to be implemented');
      },

      onDeleteProduct: function () {
        var that = this;
        var oSelectedProduct =
          this.getModel('selectedProduct').getProperty('/selectedProduct');

        if (!oSelectedProduct || !oSelectedProduct._id) {
          MessageToast.show('Please select a product to delete');
          return;
        }

        MessageBox.confirm('Are you sure you want to delete this product?', {
          onClose: function (sAction) {
            if (sAction === 'OK') {
              // Delete product functionality
              MessageToast.show(
                'Delete product functionality to be implemented'
              );
            }
          },
        });
      },
    });
  }
);
