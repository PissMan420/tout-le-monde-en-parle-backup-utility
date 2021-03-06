import fetch from "node-fetch";
import { writeFile, mkdir } from "fs";

let i = 1274;
setInterval(async () => {
  for (let j = 0; j <= 10; j++)
    savePart(++i);
}, 5000);

async function savePart(partIdx: number) {
  {
    let part = await getPart(partIdx)
    if (part)
      writeFile(`./tout-le-monde-en-parle/part_${i}.ts`, part, { encoding: "binary" }, async function (err) { console.log("Downloaded part #", partIdx); });
  }
}

async function getPart(partIdx: number) {
  const response = await fetch(`https://rcavlive-dai.akamaized.net/hls/live/696614/cancbftprem/20210419T043056/master_2500/00053/master_2500_0${partIdx}.ts`);
  const responseData = await response.buffer();
  if (responseData.toString() === "") {
    console.log("Ignoring empty response.")
    return
  }

  return responseData
}