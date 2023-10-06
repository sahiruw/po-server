const https = require("https");
const locationModel = require("../model/locationModel");
const mailItemModel = require("../model/mailItemModel");
const routeModel = require("../model/routeModel");
const christofides = require("../utils/algorithms/christofides");

const createRoutes = async (req, res) => {
  //mark all as tobe delivered
  await mailItemModel.markMailItemsAsToBeDelivered();

  let po = req.query.po;
  let regions = await locationModel.getRegions(po);
  let poLocation = await locationModel.getPostOfficeLocation(po);
  
  let { addresses, addressData } = await locationModel.getAddressesofRegion(
    regions
  );

  let mailItems = await mailItemModel.getMailItemsForRegion(
    addresses,
    addressData
  );

  let classifiedMailItems = classifyByRegion(mailItems);
  let classifiedOrderedMailItems = {};

  for (let region in classifiedMailItems) {
    // if (region === "rg-1") {
    //   continue;
    // }
    let addresses = classifiedMailItems[region];
    addresses.unshift({address: poLocation, id: "po"});

    let distanceMatrix = await createDistanceMatrix(addresses);
    // console.log(distanceMatrix);

    let tspPath = christofides(distanceMatrix);

    let orderedMailItems = [];
    for (let i = 0; i < tspPath.length; i++) {
      if (tspPath[i] != 0) {
        orderedMailItems.push(addresses[tspPath[i]].id);
      }
    }
    classifiedOrderedMailItems[region] = orderedMailItems;
  }

  console.log(classifiedOrderedMailItems);
  let sts = await routeModel.addRouteToDatabase(classifiedOrderedMailItems);

  res.json({ message: "Hello Worldd " });
};

const createDistanceMatrix = async (addresses) => {
  let n = addresses.length;
  let distanceMatrix = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < addresses.length; i++) {
    for (let j = i + 1; j < addresses.length; j++) {
      let distance = await locationModel.getDistance(
        addresses[i].address,
        addresses[j].address
      );
      // console.log(distance)
      distanceMatrix[i][j] = distance;
      distanceMatrix[j][i] = distance;
    }
  }

  return distanceMatrix;
};

const classifyByRegion = (mailItems) => {
  let classifiedMailItems = {};
  // classify by region
  for (let i = 0; i < mailItems.length; i++) {
    let region = mailItems[i].receiver_address.RegionID;
    if (!classifiedMailItems[region]) {
      classifiedMailItems[region] = [];
    }
    classifiedMailItems[region].push({
      id: mailItems[i].id,
      address: mailItems[i].receiver_address.Location,
    });
  }
  return classifiedMailItems;
};

module.exports = createRoutes;
