sap.ui.define(
  [
    'sapify/controller/BaseController',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast',
    'sap/m/MessageBox',
  ],
  function (BaseController, JSONModel, MessageToast, MessageBox) {
    'use strict';

    return BaseController.extend('sapify.controller.Login', {
      onInit: function () {
        // Initialize user model
        var oUserModel = new JSONModel({
          email: '',
          password: '',
        });
        this.setModel(oUserModel, 'user');
      },

      onLogin: function () {
        var oUserModel = this.getModel('user');
        var sEmail = oUserModel.getProperty('/email');
        var sPassword = oUserModel.getProperty('/password');

        // Validate input
        if (!sEmail || !sPassword) {
          MessageToast.show('Please enter both email and password');
          return;
        }

        // Login functionality
        // Call backend API to authenticate user
        var oData = {
          email: sEmail,
          password: sPassword,
        };

        // Make AJAX request to backend
        $.ajax({
          url: '/api/auth/login',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(oData),
          success: function (data) {
            // Store token in local storage
            localStorage.setItem('token', data.token);
            
            // Navigate to home page
            this.getRouter().navTo('home');
          }.bind(this),
          error: function (xhr) {
            var errorMessage = 'Login failed';
            if (xhr.responseJSON && xhr.responseJSON.message) {
              errorMessage = xhr.responseJSON.message;
            }
            MessageToast.show(errorMessage);
          },
        });
      },

      onNavToRegister: function () {
        this.getRouter().navTo('register');
      },
    });
  }
);
