function info(msg) {
  console.log(`[INFO] ${msg}`);
}

function error(msg) {
  console.error(`[ERROR] ${msg}`);
}

module.exports = { info, error };
