sap.ui.define(
  [
    'sapify/controller/BaseController',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast',
  ],
  function (BaseController, JSONModel, MessageToast) {
    'use strict';

    return BaseController.extend('sapify.controller.Register', {
      onInit: function () {
        // Initialize user model
        var oUserModel = new JSONModel({
          username: '',
          email: '',
          password: '',
          role: 'Employee',
        });
        this.setModel(oUserModel, 'user');

        // Initialize current user role model
        var oCurrentUserModel = new JSONModel({
          userRole: 'Employee', // Default role
        });
        this.setModel(oCurrentUserModel, 'currentUser');
      },

      onRegister: function () {
        var oUserModel = this.getModel('user');
        var sUsername = oUserModel.getProperty('/username');
        var sEmail = oUserModel.getProperty('/email');
        var sPassword = oUserModel.getProperty('/password');
        var sRole = oUserModel.getProperty('/role');

        // Validate input
        if (!sUsername || !sEmail || !sPassword) {
          MessageToast.show('Please fill in all required fields');
          return;
        }

        // Registration functionality
        MessageToast.show('Registration functionality to be implemented');
      },

      onNavBack: function () {
        this.getRouter().navTo('login');
      },
    });
  }
);
