const fsPromises = require('fs/promises');

exports.Json = async (address) => {
  const CONTRACT_NAME = process.env.npm_lifecycle_script.split('-')[1].split('.')[0];
  const NETWORK_NAME = hre.network.name;
  const DEPLOY_ADDRESS = address;
  const FILE = './deployed.json';

  try {
    let jsonString = await fsPromises.readFile(FILE, 'utf-8');
    let data = JSON.parse(jsonString);
    data = {
      ...data,
      [`${CONTRACT_NAME}`]: { ...data[`${CONTRACT_NAME}`], [`${NETWORK_NAME}`]: { address: DEPLOY_ADDRESS } },
    };
    jsonString = JSON.stringify(data, null, 1);
    await fsPromises.writeFile(FILE, jsonString);
  } catch (e) {
    if (e.code === 'ENOENT') {
      const deploy = { [`${CONTRACT_NAME}`]: { [`${NETWORK_NAME}`]: { address: DEPLOY_ADDRESS } } };
      const json = JSON.stringify(deploy, null, 1);
      await fsPromises.writeFile(FILE, json);
    }
  }
};
