import fetch from "node-fetch";
import { writeFile, mkdir } from "fs";

let i = 1000;
setInterval(async () => {
  downloadPart();
}, 95);

async function downloadPart() {
  {
    let part = await getPart()
    if (part)
      writeFile(`./tout-le-monde-en-parle/part_${i}.ts`, part, { encoding: "binary" }, async function (err) { console.log("Downloaded part #", i); });
  }
}

async function getPart() {
  const response = await fetch(`https://rcavlive-dai.akamaized.net/hls/live/696614/cancbftprem/20210419T043056/master_2500/00053/master_2500_0${++i}.ts`);
  const responseData = await response.buffer();
  if (responseData.toString() === "") {
    console.log("Ignoring empty response.")
    return
  }

  return responseData
}