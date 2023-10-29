const https = require("https");
const locationModel = require("../model/locationModel");
const mailItemModel = require("../model/mailItemModel");
const routeModel = require("../model/routeModel");
const christofides = require("../utils/algorithms/christofides");

const createRoutes = async (req, res) => {
  //mark all as tobe delivered
  try {
    await mailItemModel.markMailItemsAsToBeDelivered();

    let po = req.query.po;
    console.log(po)
    if (!po) {
      throw new Error("Post Office ID not provided");
    }

    let postmen = await locationModel.getPostmen(po);

    let poLocation = await locationModel.getPostOfficeLocation(po);

    let mailItems = await mailItemModel.getMailItesmForPostman(postmen);

    let classifiedMailItems = classifyByPostman(mailItems);
    // console.log(classifiedMailItems)
    let classifiedOrderedMailItems = {};

    for (let region in classifiedMailItems) {
      // if (region === "rg-1") {
      //   continue;
      // }
      let addresses = classifiedMailItems[region];
      addresses.unshift({ address: poLocation, id: "po" });

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
    await routeModel.addRouteToDatabase(classifiedOrderedMailItems);
    
    res.json({ message: "Successful", status: true, desc: "Route added succesfully" });
  } catch (err) {
    console.log(err);
    res.json({ message: "Error", status: false , desc: err.message});
  }
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

const classifyByPostman = (mailItems) => {
  let classifiedMailItems = {};
  // classify by region
  for (let i = 0; i < mailItems.length; i++) {
    let postman = mailItems[i].assigned_postman;
    if (!classifiedMailItems[postman]) {
      classifiedMailItems[postman] = [];
    }
    classifiedMailItems[postman].push({
      id: mailItems[i].id,
      address: mailItems[i].receiver_address.Location,
    });
  }
  return classifiedMailItems;
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
