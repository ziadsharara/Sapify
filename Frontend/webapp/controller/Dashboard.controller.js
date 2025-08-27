sap.ui.define(
  [
    'sapify/controller/BaseController',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast',
    'sap/viz/ui5/controls/VizFrame',
    'sap/viz/ui5/data/FlattenedDataset',
    'sap/viz/ui5/controls/common/feeds/FeedItem',
    'sap/viz/ui5/format/ChartFormatter',
  ],
  function (
    BaseController,
    JSONModel,
    MessageToast,
    VizFrame,
    FlattenedDataset,
    FeedItem,
    ChartFormatter
  ) {
    'use strict';

    return BaseController.extend('sapify.controller.Dashboard', {
      onInit: function () {
        // Initialize the layout model
        var oLayoutModel = new JSONModel({
          layout: 'TwoColumnsMidExpanded',
        });
        this.setModel(oLayoutModel, 'layout');

        // Initialize dashboard data model
        var oDashboardModel = new JSONModel({
          lowStockProducts: [],
        });
        this.setModel(oDashboardModel, 'dashboard');

        // Initialize formatter helper
        var oFormatterModel = new JSONModel({
          formatDate: this.formatDate,
          formatCurrency: this.formatCurrency,
        });
        this.setModel(oFormatterModel, 'formatter');

        // Initialize charts after view is rendered
        this.getView().attachAfterRendering(this.onAfterRendering, this);
      },

      onStateChange: function (oEvent) {
        var sLayout = oEvent.getParameter('layout');
        this.getModel('layout').setProperty('/layout', sLayout);
      },

      onAfterRendering: function () {
        // Initialize charts
        this._initSalesChart();
        this._initTopProductsChart();
      },

      onNavBack: function () {
        this.getRouter().navTo('home');
      },

      onProductPress: function (oEvent) {
        // Navigate to products view with selected product
        MessageToast.show(
          'Navigate to product functionality to be implemented'
        );
      },

      _initSalesChart: function () {
        // Initialize sales chart
        var oVizFrame = this.byId('salesChart');
        if (oVizFrame) {
          // Sample data for the chart
          var oModel = new JSONModel({
            sales: [
              { month: 'Jan', sales: 12000 },
              { month: 'Feb', sales: 15000 },
              { month: 'Mar', sales: 18000 },
              { month: 'Apr', sales: 14000 },
              { month: 'May', sales: 22000 },
              { month: 'Jun', sales: 25000 },
            ],
          });

          // Set the model to the viz frame
          oVizFrame.setModel(oModel);

          // Create the dataset
          var oDataset = new FlattenedDataset({
            dimensions: [
              {
                name: 'Month',
                value: '{month}',
              },
            ],
            measures: [
              {
                name: 'Sales',
                value: '{sales}',
              },
            ],
            data: {
              path: '/sales',
            },
          });

          oVizFrame.setDataset(oDataset);
          oVizFrame.setVizType('column');

          // Set the viz properties
          oVizFrame.setVizProperties({
            plotArea: {
              colorPalette: ['#27a3cf'],
            },
            title: {
              text: 'Monthly Sales Performance',
            },
            general: {
              background: {
                visible: false,
              },
            },
          });

          // Create and add the feed items
          var feedValueAxis = new FeedItem({
            uid: 'valueAxis',
            type: 'Measure',
            values: ['Sales'],
          });
          var feedCategoryAxis = new FeedItem({
            uid: 'categoryAxis',
            type: 'Dimension',
            values: ['Month'],
          });
          oVizFrame.addFeed(feedValueAxis);
          oVizFrame.addFeed(feedCategoryAxis);
        }
      },

      _initTopProductsChart: function () {
        // Initialize top products chart
        var oVizFrame = this.byId('topProductsChart');
        if (oVizFrame) {
          // Sample data for the chart
          var oModel = new JSONModel({
            products: [
              { product: 'Product A', sales: 35 },
              { product: 'Product B', sales: 25 },
              { product: 'Product C', sales: 20 },
              { product: 'Product D', sales: 15 },
              { product: 'Product E', sales: 5 },
            ],
          });

          // Set the model to the viz frame
          oVizFrame.setModel(oModel);

          // Create the dataset
          var oDataset = new FlattenedDataset({
            dimensions: [
              {
                name: 'Product',
                value: '{product}',
              },
            ],
            measures: [
              {
                name: 'Sales',
                value: '{sales}',
              },
            ],
            data: {
              path: '/products',
            },
          });

          oVizFrame.setDataset(oDataset);
          oVizFrame.setVizType('pie');

          // Set the viz properties
          oVizFrame.setVizProperties({
            title: {
              text: 'Top Selling Products',
            },
            general: {
              background: {
                visible: false,
              },
            },
            plotArea: {
              dataLabel: {
                visible: true,
              },
            },
          });

          // Create and add the feed items
          var feedValueAxis = new FeedItem({
            uid: 'size',
            type: 'Measure',
            values: ['Sales'],
          });
          var feedCategoryAxis = new FeedItem({
            uid: 'color',
            type: 'Dimension',
            values: ['Product'],
          });
          oVizFrame.addFeed(feedValueAxis);
          oVizFrame.addFeed(feedCategoryAxis);
        }
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
    });
  }
);
