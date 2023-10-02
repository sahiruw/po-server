const https = require("https");
const locationModel = require("../model/locationModel");
const mailItemModel = require("../model/mailItemModel");
const routeModel = require("../model/routeModel");

const createRoutes = async (req, res) => {
  //mark all as tobe delivered
  await mailItemModel.markMailItemsAsToBeDelivered();


  let po = req.query.po;
  let regions = await locationModel.getRegions(po);
  let { addresses, addressData } = await locationModel.getAddressesofRegion(
    regions
  );
  let mailItems = await mailItemModel.getMailItemsForRegion(
    addresses,
    addressData
  );

  let classifiedMailItems = {};
  // classify by region
  for (let i = 0; i < mailItems.length; i++) {
    let region = mailItems[i].receiver_address.RegionID;
    if (!classifiedMailItems[region]) {
      classifiedMailItems[region] = [];
    }
    classifiedMailItems[region].push(mailItems[i].id);
  }

  let sts = await routeModel.addRouteToDatabase(classifiedMailItems);

  res.json({ message: "Hello Worldd " + sts });
};

module.exports = createRoutes;
