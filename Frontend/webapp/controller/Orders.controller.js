sap.ui.define(
  [
    'sapify/controller/BaseController',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
  ],
  function (BaseController, JSONModel, MessageBox, MessageToast) {
    'use strict';

    return BaseController.extend('sapify.controller.Orders', {
      onInit: function () {
        // Initialize the layout model
        var oLayoutModel = new JSONModel({
          layout: 'TwoColumnsMidExpanded',
        });
        this.setModel(oLayoutModel, 'layout');

        // Initialize selected order model
        var oSelectedOrderModel = new JSONModel({
          selectedOrder: {},
        });
        this.setModel(oSelectedOrderModel, 'selectedOrder');

        // Initialize formatter helper
        var oFormatterModel = new JSONModel({
          formatDate: this.formatDate,
          formatCurrency: this.formatCurrency,
          formatStatusState: this.formatStatusState,
        });
        this.setModel(oFormatterModel, 'formatter');
      },

      onStateChange: function (oEvent) {
        var sLayout = oEvent.getParameter('layout');
        this.getModel('layout').setProperty('/layout', sLayout);
      },

      onNavBack: function () {
        this.getRouter().navTo('home');
      },

      onAddOrder: function () {
        // Navigate to create order view or open dialog
        MessageToast.show('Add order functionality to be implemented');
      },

      onSearch: function (oEvent) {
        var sQuery = oEvent.getParameter('newValue');
        var oFilter = new sap.ui.model.Filter(
          'customerName',
          sap.ui.model.FilterOperator.Contains,
          sQuery
        );
        var oBinding = this.byId('ordersTable').getBinding('items');
        oBinding.filter([oFilter]);
      },

      onOrderSelect: function (oEvent) {
        var oItem = oEvent.getParameter('listItem');
        var oContext = oItem.getBindingContext();
        var oOrder = oContext.getObject();

        // Set the selected order in the model
        this.getModel('selectedOrder').setProperty('/selectedOrder', oOrder);

        // Update layout to show details
        this.getModel('layout').setProperty('/layout', 'TwoColumnsMidExpanded');
      },

      onEditOrder: function () {
        // Edit order functionality
        MessageToast.show('Edit order functionality to be implemented');
      },

      onDeleteOrder: function () {
        var that = this;
        var oSelectedOrder =
          this.getModel('selectedOrder').getProperty('/selectedOrder');

        if (!oSelectedOrder || !oSelectedOrder._id) {
          MessageToast.show('Please select an order to delete');
          return;
        }

        MessageBox.confirm('Are you sure you want to delete this order?', {
          onClose: function (sAction) {
            if (sAction === 'OK') {
              // Delete order functionality
              MessageToast.show('Delete order functionality to be implemented');
            }
          },
        });
      },

      onStatusChange: function (oEvent) {
        // Update order status functionality
        MessageToast.show(
          'Update order status functionality to be implemented'
        );
      },

      formatDate: function (sDate) {
        if (!sDate) {
          return '';
        }
        var oDate = new Date(sDate);
        return oDate.toLocaleDateString();
      },

      formatCurrency: function (fAmount) {
        if (!fAmount) {
          return '0.00';
        }
        return parseFloat(fAmount).toFixed(2);
      },

      formatStatusState: function (sStatus) {
        switch (sStatus) {
          case 'Pending':
            return 'Warning';
          case 'Processing':
            return 'Information';
          case 'Shipped':
            return 'Success';
          case 'Delivered':
            return 'Success';
          case 'Cancelled':
            return 'Error';
          default:
            return 'None';
        }
      },
    });
  }
);
