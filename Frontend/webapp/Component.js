sap.ui.define(
  [
    'sap/ui/core/UIComponent',
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/odata/v4/ODataModel',
    'sap/ui/thirdparty/jquery',
  ],
  function (UIComponent, JSONModel, ODataModel, jQuery) {
    'use strict';

    return UIComponent.extend('sapify.Component', {
      metadata: {
        manifest: 'json',
      },

      init: function () {
        UIComponent.prototype.init.apply(this, arguments);

        // Set device model
        var oDeviceModel = new JSONModel({
          isTouch: sap.ui.Device.support.touch,
          isNoTouch: !sap.ui.Device.support.touch,
          isPhone: sap.ui.Device.system.phone,
          isNoPhone: !sap.ui.Device.system.phone,
          listMode: sap.ui.Device.system.phone ? 'None' : 'SingleSelectMaster',
          listItemType: sap.ui.Device.system.phone ? 'Active' : 'Inactive',
        });
        oDeviceModel.setDefaultBindingMode('OneWay');
        this.setModel(oDeviceModel, 'device');

        this.getRouter().initialize();
      },
    });
  }
);
